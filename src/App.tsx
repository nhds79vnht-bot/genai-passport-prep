import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  APP_NAME,
  CHAPTERS,
  MOCK_SECONDS,
  SYLLABUS_NOTE,
} from './lib/chapters'
import {
  buildMockExam,
  buildStudySet,
  buildWeakDrill,
  chapterQuestionCount,
  chapterStats,
  questionCount,
} from './lib/examBuilder'
import { scoreAnswers } from './lib/scoring'
import {
  loadResults,
  loadStats,
  saveResults,
  saveStats,
  updateStatsAfterSession,
} from './lib/storage'
import type { Chapter, Question, SessionResult, StudyMode, View } from './lib/types'
import { questionBank } from './data/questionBank'

const chapterById = Object.fromEntries(questionBank.map((q) => [q.id, q.chapter])) as Record<
  string,
  Chapter
>

function modeLabel(mode: StudyMode, chapter?: Chapter): string {
  if (mode === 'mock') return '60問模試'
  if (mode === 'weak') return '苦手分野ドリル'
  return `章別 (${chapter ?? ''})`
}

export default function App() {
  const [view, setView] = useState<View>('home')
  const [mode, setMode] = useState<StudyMode>('study')
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(CHAPTERS[0])
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, number[]>>({})
  const [secondsLeft, setSecondsLeft] = useState(MOCK_SECONDS)
  const [results, setResults] = useState<SessionResult[]>(() => loadResults())
  const [stats, setStats] = useState(() => loadStats())
  const [latestResult, setLatestResult] = useState<SessionResult | null>(null)

  useEffect(() => {
    saveResults(results)
  }, [results])

  useEffect(() => {
    saveStats(stats)
  }, [stats])

  const finishExam = useCallback(() => {
    if (questions.length === 0) return
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
      wrongQuestionIds,
      completedAt: new Date().toISOString(),
    }
    setLatestResult(result)
    setResults((prev) => [result, ...prev].slice(0, 50))
    setStats((prev) =>
      updateStatsAfterSession(
        prev,
        questions.map((q) => q.id),
        wrongQuestionIds,
        chapterById,
      ),
    )
    setView('result')
  }, [answers, mode, questions, selectedChapter])

  useEffect(() => {
    if (view !== 'exam' || mode !== 'mock') return
    if (secondsLeft <= 0) {
      finishExam()
      return
    }
    const timerId = window.setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000)
    return () => window.clearTimeout(timerId)
  }, [view, mode, secondsLeft, finishExam])

  const answeredCount = useMemo(
    () => questions.filter((q) => (answers[q.id] ?? []).length > 0).length,
    [answers, questions],
  )

  const weakCount = useMemo(
    () => Object.values(stats).filter((row) => row.wrong > 0).length,
    [stats],
  )

  const statsByChapter = useMemo(() => chapterStats(stats), [stats])

  function startStudy(chapter: Chapter) {
    setMode('study')
    setSelectedChapter(chapter)
    setQuestions(buildStudySet(chapter))
    setAnswers({})
    setView('exam')
  }

  function startMock() {
    setMode('mock')
    setQuestions(buildMockExam())
    setAnswers({})
    setSecondsLeft(MOCK_SECONDS)
    setView('exam')
  }

  function startWeakDrill() {
    setMode('weak')
    setQuestions(buildWeakDrill(stats))
    setAnswers({})
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
    setView('home')
  }

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')

  if (view === 'home') {
    return (
      <main className="container">
        <header className="card hero">
          <h1>{APP_NAME}</h1>
          <p>{SYLLABUS_NOTE}</p>
          <p className="hint">登録問題数: {questionCount}問（章あたり{chapterQuestionCount[CHAPTERS[0]]}問）</p>
        </header>

        <section className="card">
          <h2>章別学習（10問）</h2>
          <div className="chapter-grid">
            {CHAPTERS.map((chapter) => (
              <button key={chapter} className="primary" onClick={() => startStudy(chapter)}>
                {chapter}
                <span className="sub">{chapterQuestionCount[chapter]}問収録</span>
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>60問模試（60分）</h2>
          <button className="primary" onClick={startMock}>
            模試を開始する
          </button>
          <p className="hint">各章12問ずつランダム抽出。合格基準は非公表のため80%超を推奨ライン表示。</p>
        </section>

        <section className="card">
          <h2>苦手分野ドリル（15問）</h2>
          <button className="primary" onClick={startWeakDrill} disabled={weakCount === 0}>
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
    const wrongQuestions = latestResult.wrongQuestionIds
      .map((id) => questionBank.find((q) => q.id === id))
      .filter((q): q is Question => Boolean(q))

    return (
      <main className="container">
        <section className="card">
          <h2>結果 — {modeLabel(latestResult.mode, latestResult.chapter)}</h2>
          <p className="score">
            {latestResult.score} / {latestResult.total} 問（{latestResult.percentage}%）
          </p>
          <p>{isRecommended ? '推奨ライン到達です。' : '復習後に再チャレンジしましょう。'}</p>
          <button className="primary" onClick={resetToHome}>
            ホームへ戻る
          </button>
        </section>

        {wrongQuestions.length > 0 && (
          <section className="card">
            <h2>間違えた問題（{wrongQuestions.length}問）</h2>
            <div className="review-list">
              {wrongQuestions.map((q) => (
                <article key={q.id} className="review-item">
                  <h3>{q.prompt}</h3>
                  <p className="hint">{q.chapter} / {q.topic}</p>
                  <p>
                    正解:{' '}
                    {q.answers.map((idx) => q.choices[idx]).join('、')}
                  </p>
                  <p>{q.explanation}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    )
  }

  return (
    <main className="container">
      <section className="card">
        <h2>{modeLabel(mode, selectedChapter)}</h2>
        <div className="toolbar">
          <span>
            {answeredCount} / {questions.length} 問
          </span>
          {mode === 'mock' && <span className="timer">残り {mm}:{ss}</span>}
        </div>
      </section>

      {questions.map((q, idx) => {
        const isMulti = q.answers.length > 1
        const selected = answers[q.id] ?? []
        return (
          <section key={q.id} className="card question-card">
            <h3>
              Q{idx + 1}. {q.prompt}
            </h3>
            <p className="hint">
              {q.chapter} / {q.topic} / {isMulti ? '複数選択' : '単一選択'}
            </p>
            <div className="choices">
              {q.choices.map((choice, choiceIndex) => {
                const active = selected.includes(choiceIndex)
                return (
                  <button
                    key={`${q.id}-${choiceIndex}`}
                    type="button"
                    className={active ? 'choice active' : 'choice'}
                    onClick={() => toggleChoice(q.id, choiceIndex)}
                  >
                    {choice}
                  </button>
                )
              })}
            </div>
          </section>
        )
      })}

      <section className="card actions">
        <button type="button" className="primary" onClick={finishExam}>
          採点する
        </button>
        <button type="button" className="secondary" onClick={resetToHome}>
          中断してホームへ戻る
        </button>
      </section>
    </main>
  )
}
