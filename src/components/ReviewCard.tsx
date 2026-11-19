import { useState } from 'react'
import type { Question } from '../lib/types'
import { getChildFriendlyTerms } from '../lib/childFriendlyExplanation'
import { formatCorrectChoices, formatSelectedChoices } from '../lib/review'
import { isCorrect } from '../lib/scoring'

type Props = {
  question: Question
  // null: old history did not save the original order of shuffled options.
  selected: number[] | null
  showHeader?: boolean
}

const letters = ['A', 'B', 'C', 'D']

export function ReviewCard({ question, selected, showHeader = true }: Props) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const correct = selected !== null && isCorrect(question, selected)
  const terms = getChildFriendlyTerms(question)
  const choiceDetails = question.choices.map((choice, index) => ({
    index,
    choice,
    label: letters[index] ?? String(index + 1),
    isAnswer: question.answers.includes(index),
    note: question.choiceNotes[index] || (question.answers.includes(index) ? question.explanation : ''),
  }))
  const selectedText = selected === null ? '当時の回答は保存されていません' : formatSelectedChoices(question, selected)
  const researchText = [
    '生成AIパスポートの問題です。小学6年生〜高校生にも分かるように、言葉の意味・具体例・正解の理由・各誤答が違う理由を説明してください。正答は変更せず、根拠がなければ不明と言ってください。',
    `【章・分野】${question.chapter} / ${question.topic}`,
    `【問題】${question.prompt}`,
    `【選択肢】\n${question.choices.map((choice, index) => `${letters[index]}. ${choice}`).join('\n')}`,
    `【自分の回答】${selectedText}`,
    `【正解】${formatCorrectChoices(question)}`,
    `【問題集の理由】${question.explanation}`,
    terms.length ? `【用語メモ】\n${terms.map((item) => `${item.term}：${item.meaning} 例：${item.example}`).join('\n')}` : '',
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
        <>
          <div className="review-status">{selected === null ? '以前の間違い' : correct ? '正解' : '不正解・復習しよう'}</div>
          <h3>{question.prompt}</h3>
          <p className="hint">{question.chapter} / {question.topic}</p>
        </>
      )}

      <section className="review-answer-panel review-answer-user" aria-label="自分の回答">
        <h4>自分が選んだ答え</h4>
        {selected === null
          ? <p>過去の選択肢の並びは保存されていません。以下は現在の問題データの正解です。</p>
          : <p>{selectedText}</p>}
      </section>

      <section className="review-answer-panel review-answer-correct" aria-label="正解">
        <h4>正解はこれ！</h4>
        <p>{formatCorrectChoices(question)}</p>
      </section>

      <section className="review-explanation-panel" aria-label="正解の理由">
        <h4>どうしてこの答えになるの？</h4>
        <p className="review-explanation-text">{question.explanation}</p>
      </section>

      {terms.length > 0 && (
        <section className="review-easy-terms" aria-label="専門用語の解説">
          <h4>ことばのミニ辞典</h4>
          <dl>
            {terms.map((item) => (
              <div className="review-term" key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.meaning}</dd>
                <dd className="review-term-example"><strong>例えば：</strong> {item.example}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {question.examTrap && (
        <section className="review-learning-tip" aria-label="解き方のポイント">
          <h4>覚えておきたいポイント</h4>
          <p>{question.examTrap}</p>
        </section>
      )}

      <details className="review-choices">
        <summary>ほかの選択肢も確認する</summary>
        <p className="review-choice-intro">正解と比べながら、どこが違うか確かめてみよう。</p>
        <ol>
          {choiceDetails.map((item) => (
            <li key={item.index} className={item.isAnswer ? 'review-choice-right' : 'review-choice-not-right'}>
              <p><strong>{item.label}. {item.isAnswer ? '正解' : 'ちがう答え'}</strong>　{item.choice}</p>
              <p className="review-choice-note">{item.note || '上の正解理由と条件を比べてみよう。'}</p>
            </li>
          ))}
        </ol>
      </details>

      <div className="review-gemini-actions">
        <button type="button" className="secondary" onClick={() => void copyReview()}>説明をコピー</button>
        <button type="button" className="secondary" onClick={openGemini}>Geminiで聞く</button>
      </div>
      {copyStatus === 'copied' && <p className="review-copy-feedback" role="status">コピーしました。Geminiに貼り付けてください。</p>}
      {copyStatus === 'error' && (
        <div className="review-copy-feedback" role="status">
          <p>自動コピーできませんでした。次の文章を長押ししてコピーしてください。</p>
          <textarea className="review-copy-fallback" aria-label="コピー用の説明" readOnly value={researchText} />
        </div>
      )}
    </article>
  )
}
