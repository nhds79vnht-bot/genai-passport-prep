import { useState } from 'react'
import type { Question } from '../lib/types'
import { chapterDisplayName } from '../lib/chapters'
import { buildGeminiReviewPrompt, formatCorrectChoices, formatSelectedChoices } from '../lib/review'
import { isCorrect } from '../lib/scoring'

type Props = {
  question: Question
  // null means legacy history: old attempts did not store the shuffled choices.
  selected: number[] | null
  showHeader?: boolean
}

export function ReviewCard({ question, selected, showHeader = true }: Props) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const correct = selected !== null && isCorrect(question, selected)
  const researchText = buildGeminiReviewPrompt(question, selected)

  async function copyForGemini() {
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
          <div className="review-status">
            {selected === null ? '以前の間違い' : correct ? '正解' : '不正解'}
          </div>
          <h3>{question.prompt}</h3>
          <p className="hint">{chapterDisplayName(question.chapter)} / {question.topic}</p>
        </>
      )}
      <div className="review-answer-panel review-answer-user">
        <h4>あなたの回答</h4>
        {selected === null ? (
          <p>当時の選択肢の並び順が残っていないため、回答は復元できません。問題文・正解は現在の登録内容です。</p>
        ) : (
          <p>{formatSelectedChoices(question, selected)}</p>
        )}
      </div>
      <div className="review-answer-panel review-answer-correct">
        <h4>正解</h4>
        <p>{formatCorrectChoices(question)}</p>
      </div>
      <div className="review-explanation-panel">
        <h4>解説</h4>
        <p className="review-explanation-text">{question.explanation}</p>
      </div>
      <div className="review-gemini-actions">
        <button type="button" className="secondary" onClick={() => void copyForGemini()}>
          Gemini用にコピー
        </button>
        <button type="button" className="secondary" onClick={openGemini}>
          Geminiを開く
        </button>
      </div>
      {copyStatus === 'copied' && (
        <p className="review-copy-feedback" role="status">コピーしました。Geminiに貼り付けてください。</p>
      )}
      {copyStatus === 'error' && (
        <div className="review-copy-feedback" role="status">
          <p>自動コピーできませんでした。下の文章を長押ししてコピーしてください。</p>
          <textarea className="review-copy-fallback" readOnly value={researchText} aria-label="Geminiに貼り付ける文章" />
        </div>
      )}
    </article>
  )
}
