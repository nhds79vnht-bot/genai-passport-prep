import type { Question } from '../lib/types'
import { chapterDisplayName } from '../lib/chapters'
import { formatCorrectChoices, formatSelectedChoices } from '../lib/review'
import { isCorrect } from '../lib/scoring'

type Props = {
  question: Question
  selected: number[]
  showHeader?: boolean
}

export function ReviewCard({ question, selected, showHeader = true }: Props) {
  const correct = isCorrect(question, selected)
  const researchText = `生成AIパスポート試験の次の問題を初学者向けに説明してください。問題：${question.prompt} 選択肢：${question.choices.join(' / ')} 正解：${formatCorrectChoices(question)}`

  function openGemini() {
    // The official Gemini website does not guarantee prompt prefill through a URL.
    // Copy the context when clipboard access is available; always open the official website.
    window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer')
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(researchText).catch(() => {})
    }
  }

  return (
    <article className={`review-item ${correct ? 'review-correct' : 'review-wrong'}`}>
      {showHeader && (
        <>
          <div className="review-status">{correct ? '正解' : '不正解'}</div>
          <h3>{question.prompt}</h3>
          <p className="hint">{chapterDisplayName(question.chapter)} / {question.topic}</p>
        </>
      )}
      <p><strong>あなたの回答:</strong> {formatSelectedChoices(question, selected)}</p>
      <p><strong>正解:</strong> {formatCorrectChoices(question)}</p>
      <p><strong>解説:</strong> {question.explanation}</p>
      <button type="button" className="secondary" onClick={openGemini}>Geminiで詳しく調べる</button>
      <p className="hint">質問文をコピーできた場合は、Geminiに貼り付けてください。</p>
    </article>
  )
}
