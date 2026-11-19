import { useState } from 'react'
import type { Question } from '../lib/types'
import { getChildFriendlyTerms } from '../lib/childFriendlyExplanation'
import { getChildFriendlyDetail } from '../lib/childFriendlyDetails'
import { formatCorrectChoices, formatSelectedChoices } from '../lib/review'
import { isCorrect } from '../lib/scoring'

type Props = {
  question: Question
  // null = older history lacked the original shuffled answer order.
  selected: number[] | null
  showHeader?: boolean
}

const letters = ['A', 'B', 'C', 'D']

export function ReviewCard({ question, selected, showHeader = true }: Props) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const correct = selected !== null && isCorrect(question, selected)
  const terms = getChildFriendlyTerms(question)
  const detail = getChildFriendlyDetail(question)
  const choices = question.choices.map((choice, index) => ({
    index,
    choice,
    label: letters[index] ?? String(index + 1),
    isAnswer: question.answers.includes(index),
    note: detail?.choiceReasons[choice] ?? question.choiceNotes[index] ??
      (question.answers.includes(index) ? question.explanation : ''),
  }))
  const selectedWrong = selected === null ? [] :
    choices.filter((item) => selected.includes(item.index) && !item.isAnswer)
  const selectedText = selected === null ?
    '以前の回答は保存されていません' : formatSelectedChoices(question, selected)
  const researchText = [
    '生成AIパスポートの問題を、小学生高学年〜高校生にも分かるように、正解と誤答の理由を具体例で解説してください。正答を変えず、根拠不明なら不明と明記してください。',
    `【分野】${question.chapter} / ${question.topic}`,
    `【問題】${question.prompt}`,
    `【選択肢】\n${question.choices.map((choice, index) => `${letters[index]}. ${choice}`).join('\n')}`,
    `【自分の回答】${selectedText}`,
    `【正解】${formatCorrectChoices(question)}`,
    `【正解の理由】${detail?.reason ?? question.explanation}`,
    detail?.example ? `【身近な例】${detail.example}` : '',
    `【誤答の理由】\n${choices.map((item) => `${item.label}: ${item.note}`).join('\n')}`,
    terms.length ? `【用語】\n${terms.map((term) => `${term.term}：${term.meaning} 例：${term.example}`).join('\n')}` : '',
  ].filter(Boolean).join('\n\n')

  async function copyReview() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(researchText)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('error')
    }
  }

  function openGemini() {
    window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer')
  }

  return (
    <article className={`review-item ${correct ? 'review-correct' : 'review-wrong'}`}>
      {showHeader && (
        <header className="review-question-header">
          <div className="review-status">{selected === null ? '以前の間違い' : correct ? '正解' : '不正解・復習しよう'}</div>
          <h3>{question.prompt}</h3>
          <p className="hint">{question.chapter} / {question.topic}</p>
        </header>
      )}
      <div className="review-content-grid">
        <div className="review-answer-column">
          <section className="review-answer-panel review-answer-user" aria-label="自分の答え">
            <h4>自分の答え</h4>
            {selected === null ?
              <p>当時の回答は復元できません。以下は現在の問題データの正解です。</p> :
              <p>{selectedText}</p>}
          </section>
          <section className="review-answer-panel review-answer-correct" aria-label="正解">
            <h4>正解はこれ！</h4>
            <p>{formatCorrectChoices(question)}</p>
          </section>
          <section className="review-explanation-panel" aria-label="正解の理由">
            <h4>どうしてこれが正解なの？</h4>
            <p className="review-explanation-text">{detail?.reason ?? question.explanation}</p>
            {detail?.example && (
              <div className="review-example">
                <strong>身近な例</strong>
                <p>{detail.example}</p>
              </div>
            )}
            {detail && (
              <details className="review-original-explanation">
                <summary>試験向けの元の解説を見る</summary>
                <p>{question.explanation}</p>
              </details>
            )}
          </section>
        </div>
        <div className="review-support-column">
          {selectedWrong.length > 0 && (
            <section className="review-selected-feedback" aria-label="選んだ答えが違う理由">
              <h4>選んだ答えは、なぜ違う？</h4>
              {selectedWrong.map((item) => (
                <p key={item.index}><strong>{item.label}：</strong>{item.note || '正解の説明と比べてみよう。'}</p>
              ))}
            </section>
          )}
          {terms.length > 0 && (
            <section className="review-easy-terms" aria-label="専門用語の意味">
              <h4>ことばのミニ辞典</h4>
              <dl>
                {terms.map((term) => (
                  <div className="review-term" key={term.term}>
                    <dt>{term.term}</dt>
                    <dd>{term.meaning}</dd>
                    <dd className="review-term-example"><strong>たとえば：</strong> {term.example}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          <details className="review-choices">
            <summary>4つの選択肢を1つずつ確認</summary>
            <p className="review-choice-intro">正解・不正解の理由を比べてみよう。</p>
            <ol>
              {choices.map((item) => (
                <li key={item.index} className={item.isAnswer ? 'review-choice-right' : 'review-choice-not-right'}>
                  <p><strong>{item.label}. {item.isAnswer ? '正解' : '不正解'}</strong>　{item.choice}</p>
                  <p className="review-choice-note">{item.note || '正解の理由と条件を比べてみよう。'}</p>
                </li>
              ))}
            </ol>
          </details>
          {question.examTrap && (
            <section className="review-learning-tip">
              <h4>テストで気をつけること</h4>
              <p>{question.examTrap}</p>
            </section>
          )}
        </div>
      </div>
      <div className="review-gemini-actions">
        <button type="button" className="secondary" onClick={() => void copyReview()}>解説をコピー</button>
        <button type="button" className="secondary" onClick={openGemini}>Geminiで質問</button>
      </div>
      {copyStatus === 'copied' && <p className="review-copy-feedback" role="status">コピーしました。Geminiに貼り付けてください。</p>}
      {copyStatus === 'error' && (
        <div className="review-copy-feedback" role="status">
          <p>自動コピーできませんでした。次の文章を長押ししてコピーしてください。</p>
          <textarea className="review-copy-fallback" readOnly aria-label="コピー用の解説" value={researchText} />
        </div>
      )}
    </article>
  )
}
