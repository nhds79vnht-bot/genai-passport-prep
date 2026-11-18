import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { buildGeminiReviewPrompt, formatSelectedChoices } from './review.ts'

const question = {
  id: 'q028',
  chapter: '第1章 AIの基礎',
  topic: '過学習',
  prompt: '決定木の過学習について',
  choices: ['誤答A', '正解B', '誤答C', '誤答D'],
  answers: [1],
  explanation: '訓練と検証の差を確認する。',
  reviewSection: '過学習',
  examTrap: '',
  choiceNotes: ['A', 'B', 'C', 'D'],
}

describe('Gemini review copy', () => {
  it('includes the original choices, personal answer, correct answer, and explanation', () => {
    const prompt = buildGeminiReviewPrompt(question, [2])
    assert.match(prompt, /【問題】/)
    assert.match(prompt, /決定木の過学習について/)
    assert.match(prompt, /A\. 誤答A/)
    assert.match(prompt, /B\. 正解B/)
    assert.match(prompt, /【私の回答】C\. 誤答C/)
    assert.match(prompt, /【正解】B\. 正解B/)
    assert.match(prompt, /【アプリの解説】訓練と検証の差を確認する。/)
  })
  it('distinguishes missing legacy answers from unanswered answers', () => {
    assert.match(buildGeminiReviewPrompt(question, null), /以前の回答は保存されていません/)
    assert.match(buildGeminiReviewPrompt(question, []), /【私の回答】未回答/)
  })
  it('formats choices without mutating original selected-index order', () => {
    const selected = [3, 1]
    assert.match(formatSelectedChoices(question, selected), /B\. 正解B \/ D\. 誤答D/)
    assert.deepEqual(selected, [3, 1])
  })
})
