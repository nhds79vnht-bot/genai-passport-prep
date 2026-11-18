import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  combineRecentWrongReviews,
  loadWrongReviews,
  makeWrongReviews,
  pruneWrongReviews,
  saveWrongReviews,
  WRONG_REVIEW_WINDOW_MS,
} from './wrongReviewHistory.ts'

const now = Date.parse('2026-11-18T07:00:00Z')
const question = {
  id: 'q028',
  chapter: '第1章 AIの基礎',
  topic: '過学習',
  prompt: '訓練と検証の差は？',
  choices: ['誤答C', '正答B', '誤答A', '誤答D'],
  answers: [1],
  explanation: '検証結果を重視する。',
  reviewSection: '過学習',
  examTrap: '訓練と検証を区別する',
  choiceNotes: ['誤りC', '正解', '誤りA', '誤りD'],
}
const result = {
  id: 'attempt1',
  mode: 'study',
  chapter: question.chapter,
  score: 0,
  total: 1,
  percentage: 0,
  answers: { q028: [2] },
  wrongQuestionIds: ['q028'],
  completedAt: new Date(now).toISOString(),
}
function memoryStorage() {
  const values = new Map()
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value) },
  }
}
describe('48-hour wrong-answer review history', () => {
  it('preserves the exact randomized choices and the selected option', () => {
    const saved = makeWrongReviews(result, [question])
    assert.deepEqual(saved[0].question.choices, ['誤答C', '正答B', '誤答A', '誤答D'])
    assert.deepEqual(saved[0].selected, [2])
    question.choices[2] = '変更'
    assert.equal(saved[0].question.choices[2], '誤答A')
    question.choices[2] = '誤答A'
  })
  it('does not fabricate choices for older result records', () => {
    const rows = combineRecentWrongReviews([], [result], [question], now)
    assert.equal(rows.length, 1)
    assert.equal(rows[0].selected, null)
    assert.equal(rows[0].question.id, 'q028')
  })
  it('prefers exact snapshots over legacy fallback and deduplicates attempts', () => {
    const exact = makeWrongReviews(result, [question])
    const all = combineRecentWrongReviews([...exact, ...exact], [result], [question], now)
    assert.equal(all.length, 1)
    assert.deepEqual(all[0].selected, [2])
  })
  it('expires records after 48 hours and excludes future timestamps', () => {
    const exact = makeWrongReviews(result, [question])[0]
    const expired = { ...exact, key: 'old', completedAt: new Date(now - WRONG_REVIEW_WINDOW_MS - 1).toISOString() }
    const future = { ...exact, key: 'future', completedAt: new Date(now + 1).toISOString() }
    assert.deepEqual(pruneWrongReviews([expired, future, exact], now), [exact])
  })
  it('stores history separately for each learner scope', () => {
    const storage = memoryStorage()
    const exact = makeWrongReviews(result, [question])
    saveWrongReviews(exact, 'child-1', storage, now)
    assert.deepEqual(loadWrongReviews('child-1', storage, now), exact)
    assert.deepEqual(loadWrongReviews('child-2', storage, now), [])
    assert.deepEqual(loadWrongReviews(undefined, storage, now), [])
  })
})
