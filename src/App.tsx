import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { QuestionNavigator } from './components/QuestionNavigator'
import { ReviewCard } from './components/ReviewCard'
import {
  APP_NAME,
  CHAPTERS,
  MOCK_SECONDS,
  SYLLABUS_NOTE,
} from './lib/chapters'
import {
  activeQuestionBank,
  buildWeakDrill,
  chapterQuestionCount,
  chapterStats,
  questionCount,
} from './lib/examBuilder'
import { scoreAnswers } from './lib/scoring'
import { createScoreSubmissionCandidate } from './lib/scoreSync'
import { enqueueScoreCandidate, loadScoreOutbox, acknowledgeScoreCandidate } from './lib/scoreOutbox'
import {
  loadResults,
  loadStats,
  saveResults,
  saveStats,
  updateStatsAfterSession,
} from './lib/storage'
import type { Chapter, Question, SessionResult, StudyMode, View } from './lib/types'
import { questionBank } from './data/questionBank'
import { buildBalancedMock, buildDailySet, emptyProgress, randomizeChoices, recordAnswer } from './lib/studyEngine'
import type { LearnerProgress } from './lib/studyEngine'

const chapterById = Object.fromEntries(activeQuestionBank.map((q) => [q.id, q.chapter])) as Record<
  string,
  Chapter
>

function modeLabel(mode: StudyMode, chapter?: Chapter): string {
  if (mode === 'mock') return '60問模試'
  if (mode === 'weak') return '苦手分野ドリル'
  return `章別 (${chapter ?? ''})`
}

export default function App() {
  const completionGuard = useRef(false)
  const [view, setView] = useState<View>('home')
  const learnerScope = (() => {
    const params = new URLSearchParams(window.location.search)
    const learnerId = params.get('learnerId')
    return window.parent !== window && learnerId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(learnerId) ? learnerId : null
  })()
  const progressKey = learnerScope ? `genai-passport-prep:progress-v1:${learnerScope}` : 'genai-passport-prep:progress-v1'
  const [progress, setProgress] = useState<LearnerProgress>(() => {
    try {
      const raw = localStorage.getItem(progressKey)
      const parsed = raw ? JSON.parse(raw) as LearnerProgress : emptyProgress()
      return parsed?.version === 1 && parsed.items && typeof parsed.items === 'object' ? parsed : emptyProgress()
    } catch { return emptyProgress() }
  })
  const [mode, setMode] = useState<StudyMode>('study')
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(CHAPTERS[0])
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, number[]>>({})
  const [secondsLeft, setSecondsLeft] = useState(MOCK_SECONDS)
  const [mockDeadline, setMockDeadline] = useState<number | null>(null)
  const [results, setResults] = useState<SessionResult[]>(() => loadResults(learnerScope))
  const [stats, setStats] = useState(() => loadStats(learnerScope))
  const [latestResult, setLatestResult] = useState<SessionResult | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showUnansweredOnly, setShowUnansweredOnly] = useState(false)
  const [resultFilter, setResultFilter] = useState<'wrong' | 'all'>('wrong')

  useEffect(() => {
    try { localStorage.setItem(progressKey, JSON.stringify(progress)) } catch { /* storage unavailable */ }
  }, [progress, progressKey])

  useEffect(() => {
    saveResults(results, learnerScope)
  }, [results, learnerScope])

  // Embedded in the signed-in くろ先生 app: submit answers through the parent frame.
  // Standalone use remains local-only; no credentials or claimed scores cross frames.
  useEffect(() => {
    if (window.parent === window) return
    const params = new URLSearchParams(window.location.search)
    const parentOrigin = params.get('parentOrigin')
    const learnerId = params.get('learnerId')
    if (!learnerId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(learnerId) || !parentOrigin || !/^https:\/\/[^/]+$/.test(parentOrigin)) return
    const send = () => {
      for (const candidate of loadScoreOutbox().filter((row) => row.learnerId === learnerId)) {
        window.parent.postMessage({ type: 'kuro-passport-attempt-v1', candidate }, parentOrigin)
      }
    }
    const onMessage = (event: MessageEvent) => {
      if (event.source !== window.parent || event.origin !== parentOrigin) return
      const message = event.data
      if (!message || message.type !== 'kuro-passport-ack-v1' || typeof message.attemptId !== 'string') return
      if (message.ok === true && loadScoreOutbox().some((row) => row.attemptId === message.attemptId && row.learnerId === learnerId)) acknowledgeScoreCandidate(message.attemptId)
    }
    window.addEventListener('message', onMessage)
    send()
    const interval = window.setInterval(send, 15000)
    return () => { window.removeEventListener('message', onMessage); window.clearInterval(interval) }
  }, [])

  useEffect(() => {
    saveStats(stats, learnerScope)
  }, [stats, learnerScope])

  const finishExam = useCallback(() => {
    if (questions.length === 0 || completionGuard.current) return
    completionGuard.current = true
    const { score, wrongQuestionIds } = scoreAnswers(questions, answers)
    const total = questions.length
    const percentage = Math.round((score / total) * 1000) / 10
    const result: SessionResult = {
      id: crypto.randomUUID(),
      mode,
      chapter: mode === 'study' ? selectedChapter : undefined,
      score,
      total,
      percentage,
      answers,
      wrongQuestionIds,
      completedAt: new Date().toISOString(),
    }
    // Persist a locally validated attempt for future authenticated server-side scoring.
    // The authenticated parent frame submits this candidate for independent server scoring.
    const candidate = createScoreSubmissionCandidate(result, questions)
    if (candidate) {
      const scopedLearnerId = new URLSearchParams(window.location.search).get('learnerId')
      const parentOrigin = new URLSearchParams(window.location.search).get('parentOrigin')
      // Standalone results stay local; never queue an unscoped attempt for another child.
      if (window.parent !== window && scopedLearnerId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(scopedLearnerId) &&
          parentOrigin && /^https:\/\/[^/]+$/.test(parentOrigin)) {
        candidate.learnerId = scopedLearnerId
        // Never bypass outbox validation or send a conflicting attempt ID.
        if (enqueueScoreCandidate(candidate)) {
          window.parent.postMessage({ type: 'kuro-passport-attempt-v1', candidate }, parentOrigin)
        }
      }
    }
    setLatestResult(result)
    setResults((prev) => [result, ...prev].slice(0, 50))
    setProgress((prev) => questions.reduce((state, q) => recordAnswer(state, q.id, !wrongQuestionIds.includes(q.id)), prev))
    setStats((prev) =>
      updateStatsAfterSession(
        prev,
        questions.map((q) => q.id),
        wrongQuestionIds,
        chapterById,
      ),
    )
    setResultFilter('wrong')
    setView('result')
  }, [answers, mode, questions, selectedChapter])

  useEffect(() => {
    if (view !== 'exam' || mode !== 'mock' || mockDeadline === null) return
    const updateCountdown = () => {
      const remaining = Math.max(0, Math.ceil((mockDeadline - Date.now()) / 1000))
      setSecondsLeft(remaining)
      if (remaining === 0) finishExam()
    }
    updateCountdown()
    const timerId = window.setInterval(updateCountdown, 250)
    return () => window.clearInterval(timerId)
  }, [view, mode, mockDeadline, finishExam])

  const answeredCount = useMemo(
    () => questions.filter((q) => (answers[q.id] ?? []).length > 0).length,
    [answers, questions],
  )

  const weakCount = useMemo(
    () => Object.values(stats).filter((row) => row.wrong > 0).length,
    [stats],
  )

  const statsByChapter = useMemo(() => chapterStats(stats), [stats])
  const questionIds = useMemo(() => questions.map((q) => q.id), [questions])

  // Embedded scoring accepts only canonical q001-q300 IDs; standalone study can use the full bank.
  const scoredQuestionBank = learnerScope ? questionBank : activeQuestionBank

  function startDaily() {
    completionGuard.current = false
    setMode('study')
    setSelectedChapter(CHAPTERS[0])
    setQuestions(buildDailySet(scoredQuestionBank, progress, 10).map(randomizeChoices))
    setAnswers({})
    setCurrentIndex(0)
    setShowUnansweredOnly(false)
    setView('exam')
  }

  function startStudy(chapter: Chapter) {
    completionGuard.current = false
    setMode('study')
    setSelectedChapter(chapter)
    setQuestions(buildDailySet(scoredQuestionBank, progress, 10, new Date(), chapter).map(randomizeChoices))
    setAnswers({})
    setCurrentIndex(0)
    setShowUnansweredOnly(false)
    setView('exam')
  }

  function startMock() {
    completionGuard.current = false
    setMode('mock')
    setQuestions(buildBalancedMock(scoredQuestionBank, CHAPTERS))
    setAnswers({})
    setSecondsLeft(MOCK_SECONDS)
    setMockDeadline(Date.now() + MOCK_SECONDS * 1000)
    setCurrentIndex(0)
    setShowUnansweredOnly(false)
    setView('exam')
  }

  function startWeakDrill() {
    completionGuard.current = false
    setMode('weak')
    setQuestions(buildWeakDrill(stats).map(randomizeChoices))
    setAnswers({})
    setCurrentIndex(0)
    setShowUnansweredOnly(false)
    setView('exam')
  }

  function toggleChoice(questionId: string, choiceIndex: number) {
    const target = questions.find((q) => q.id === questionId)
    if (!target) return
    const isMulti = target.answers.length > 1
    const current = answers[questionId] ?? []

    if (!isMulti) {
      setAnswers((prev) => ({ ...prev, [questionId]: [choiceIndex] }))
      return
    }

    const exists = current.includes(choiceIndex)
    const next = exists
      ? current.filter((value) => value !== choiceIndex)
      : [...current, choiceIndex].sort((a, b) => a - b)
    setAnswers((prev) => ({ ...prev, [questionId]: next }))
  }

  function resetToHome() {
    setQuestions([])
    setAnswers({})
    setLatestResult(null)
    setCurrentIndex(0)
    setView('home')
  }

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')
  const currentQuestion = questions[currentIndex]
  const currentSelected = currentQuestion ? answers[currentQuestion.id] ?? [] : []
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < questions.length - 1

  if (view === 'home') {
    return (
      <main className="container">
        <header className="card hero">
          <h1>{APP_NAME}</h1>
          <p>{SYLLABUS_NOTE}</p>
          <p className="hint">登録問題数: {questionCount}問（章あたり{chapterQuestionCount[CHAPTERS[0]]}問）</p>
          <p className="hint">スマホ向け：1問ずつ表示・下部ボタン操作・採点後に詳細解説</p>
          {learnerScope && <p className="hint">連携学習ではサーバー採点対応の基本300問から出題します。追加問題は単独版で学習できます。</p>}
        </header>

        <section className="card">
          <h2>今日の学習（10問）</h2>
          <p className="hint">復習期限の問題を優先し、残りは未学習問題から出題します。</p>
          <button type="button" className="primary" onClick={startDaily}>今日の学習を始める</button>
          <p className="hint">学習済み {Object.keys(progress.items).length}問 / 復習待ち {Object.values(progress.items).filter((item) => Date.parse(item.dueAt) <= Date.now()).length}問</p>
        </section>

        <section className="card">
          <h2>章別学習（10問）</h2>
          <div className="chapter-grid">
            {CHAPTERS.map((chapter) => (
              <button key={chapter} type="button" className="primary" onClick={() => startStudy(chapter)}>
                {chapter}
                <span className="sub">{chapterQuestionCount[chapter]}問収録</span>
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>60問模試（60分）</h2>
          <button type="button" className="primary" onClick={startMock}>
            模試を開始する
          </button>
          <p className="hint">各章12問ずつランダム抽出。選択肢も毎回入れ替わります。60分の制限時間。80%はアプリ独自の学習目標で、公式の合格基準ではありません。</p>
        </section>

        <section className="card">
          <h2>苦手分野ドリル（15問）</h2>
          <button type="button" className="primary" onClick={startWeakDrill} disabled={weakCount === 0}>
            {weakCount === 0 ? 'まず1回以上演習してください' : `苦手問題から再挑戦（${weakCount}問登録）`}
          </button>
        </section>

        <section className="card">
          <h2>章別ミス率</h2>
          {statsByChapter.every((row) => row.seen === 0) ? (
            <p>まだ統計がありません。</p>
          ) : (
            <ul className="result-list">
              {statsByChapter.map((row) => (
                <li key={row.chapter}>
                  <strong>{row.chapter}</strong>
                  <span>
                    ミス {row.wrong}/{row.seen}（{row.rate}%）
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <h2>最近の成績</h2>
          {results.length === 0 ? (
            <p>まだ受験履歴がありません。</p>
          ) : (
            <ul className="result-list">
              {results.slice(0, 8).map((result) => (
                <li key={result.id}>
                  <strong>{modeLabel(result.mode, result.chapter)}</strong>
                  <span>
                    {result.score}/{result.total} ({result.percentage}%)
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    )
  }

  if (view === 'result' && latestResult) {
    const passLine = latestResult.mode === 'mock' ? 80 : 70
    const isRecommended = latestResult.percentage >= passLine
    const reviewQuestions = questions
      .filter((q) =>
        resultFilter === 'all' ? true : latestResult.wrongQuestionIds.includes(q.id),
      )
      .sort((a, b) => {
        const aWrong = latestResult.wrongQuestionIds.includes(a.id) ? 0 : 1
        const bWrong = latestResult.wrongQuestionIds.includes(b.id) ? 0 : 1
        return aWrong - bWrong
      })

    return (
      <main className="container">
        <section className="card">
          <h2>結果 — {modeLabel(latestResult.mode, latestResult.chapter)}</h2>
          <p className="score">
            {latestResult.score} / {latestResult.total} 問（{latestResult.percentage}%）
          </p>
          <p>{isRecommended ? 'アプリの学習目標に到達しました（合格判定ではありません）。' : '復習後に再チャレンジしましょう。'}</p>
          <div className="result-actions">
            <button type="button" className="primary" onClick={resetToHome}>
              ホームへ戻る
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => setResultFilter((prev) => (prev === 'wrong' ? 'all' : 'wrong'))}
            >
              {resultFilter === 'wrong' ? '全問解説を見る' : '間違いのみ表示'}
            </button>
          </div>
        </section>

        <section className="card">
          <h2>{resultFilter === 'wrong' ? '間違えた問題の解説' : '全問解説'}（{reviewQuestions.length}問）</h2>
          <p className="hint">参考書を開かなくても、正解理由・誤答理由・見返し章・ひっかけポイントを確認できます。</p>
          <div className="review-list">
            {reviewQuestions.map((q) => (
              <ReviewCard
                key={q.id}
                question={q}
                selected={latestResult.answers[q.id] ?? []}
              />
            ))}
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="container exam-view">
      <section className="card exam-header">
        <h2>{modeLabel(mode, selectedChapter)}</h2>
        <div className="toolbar">
          <span>
            {answeredCount} / {questions.length} 問
          </span>
          {mode === 'mock' && <span className="timer">残り {mm}:{ss}</span>}
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${questions.length === 0 ? 0 : ((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </section>

      <QuestionNavigator
        total={questions.length}
        currentIndex={currentIndex}
        answers={answers}
        questionIds={questionIds}
        onJump={setCurrentIndex}
        showUnansweredOnly={showUnansweredOnly}
        onToggleUnanswered={() => setShowUnansweredOnly((prev) => !prev)}
      />

      {currentQuestion && (
        <section key={currentQuestion.id} className="card question-card">
          <div className="question-meta">
            <span className="badge">Q{currentIndex + 1}</span>
            <span className="hint">
              {currentQuestion.chapter} / {currentQuestion.topic} /{' '}
              {currentQuestion.answers.length > 1 ? '複数選択' : '単一選択'}
            </span>
          </div>
          <h3 className="question-title">{currentQuestion.prompt}</h3>
          <div className="choices">
            {currentQuestion.choices.map((choice, choiceIndex) => {
              const active = currentSelected.includes(choiceIndex)
              return (
                <button
                  key={`${currentQuestion.id}-${choiceIndex}`}
                  type="button"
                  className={active ? 'choice active' : 'choice'}
                  onClick={() => toggleChoice(currentQuestion.id, choiceIndex)}
                >
                  <span className="choice-marker">{String.fromCharCode(65 + choiceIndex)}</span>
                  <span>{choice}</span>
                </button>
              )
            })}
          </div>
          {currentSelected.length > 0 && (
            <p className="hint answered-note">選択済み（採点ボタンで解説を確認できます）</p>
          )}
        </section>
      )}

      <section className="sticky-actions">
        <button type="button" className="secondary nav-button" onClick={() => setCurrentIndex((prev) => prev - 1)} disabled={!canGoPrev}>
          戻る
        </button>
        <button type="button" className="secondary nav-button" onClick={() => setCurrentIndex((prev) => prev + 1)} disabled={!canGoNext}>
          次へ
        </button>
        <button type="button" className="primary finish-button" onClick={finishExam}>
          採点
        </button>
      </section>

      <section className="card mobile-exit">
        <button type="button" className="secondary full-width" onClick={resetToHome}>
          中断してホームへ戻る
        </button>
      </section>
    </main>
  )
}
