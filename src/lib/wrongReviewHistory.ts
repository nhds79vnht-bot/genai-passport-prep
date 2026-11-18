import type { Question, SessionResult } from './types'

// Keep review snapshots separate from the existing results / score-sync payload.
// Old attempts did not persist the randomized choice order; never guess it.
export type WrongReviewRecord = {
  key: string
  completedAt: string
  question: Question
  selected: number[] | null
}

export const WRONG_REVIEW_WINDOW_MS = 48 * 60 * 60 * 1000
export const MAX_WRONG_REVIEWS = 200
const KEY = 'genai-passport-prep:wrong-review-v1'

function storageKey(scope?: string | null): string {
  return scope ? `${KEY}:${scope}` : KEY
}

function isReviewRecord(value: unknown): value is WrongReviewRecord {
  if (!value || typeof value !== 'object') return false
  const entry = value as Partial<WrongReviewRecord>
  const question = entry.question as Partial<Question> | undefined
  return typeof entry.key === 'string' && entry.key.length > 0 &&
    typeof entry.completedAt === 'string' && Number.isFinite(Date.parse(entry.completedAt)) &&
    !!question && typeof question.id === 'string' && question.id.length > 0 &&
    typeof question.chapter === 'string' && typeof question.topic === 'string' &&
    typeof question.prompt === 'string' && typeof question.explanation === 'string' &&
    Array.isArray(question.choices) && question.choices.length === 4 &&
    question.choices.every((choice) => typeof choice === 'string') &&
    Array.isArray(question.answers) && question.answers.length > 0 &&
    question.answers.every((index) => Number.isInteger(index) && index >= 0 && index < 4) &&
    Array.isArray(question.choiceNotes) && question.choiceNotes.length === 4 &&
    (entry.selected === null ||
      (Array.isArray(entry.selected) && entry.selected.every((index) =>
        Number.isInteger(index) && index >= 0 && index < 4)))
}

export function pruneWrongReviews(records: unknown, now = Date.now()): WrongReviewRecord[] {
  if (!Array.isArray(records)) return []
  const firstValid = now - WRONG_REVIEW_WINDOW_MS
  const unique = new Map<string, WrongReviewRecord>()
  for (const row of records) {
    if (!isReviewRecord(row)) continue
    const timestamp = Date.parse(row.completedAt)
    if (timestamp < firstValid || timestamp > now || unique.has(row.key)) continue
    unique.set(row.key, row)
  }
  return [...unique.values()]
    .sort((a, b) => Date.parse(b.completedAt) - Date.parse(a.completedAt))
    .slice(0, MAX_WRONG_REVIEWS)
}

export function makeWrongReviews(
  result: SessionResult,
  shuffledQuestions: readonly Question[],
): WrongReviewRecord[] {
  const wrong = new Set(result.wrongQuestionIds)
  return shuffledQuestions.filter((question) => wrong.has(question.id)).map((question) => ({
    key: `${result.id}:${question.id}`,
    completedAt: result.completedAt,
    question: {
      ...question,
      choices: [...question.choices],
      answers: [...question.answers],
      choiceNotes: [...question.choiceNotes],
    },
    selected: [...(result.answers[question.id] ?? [])],
  }))
}

export function combineRecentWrongReviews(
  saved: readonly WrongReviewRecord[],
  results: readonly SessionResult[],
  bank: readonly Question[],
  now = Date.now(),
): WrongReviewRecord[] {
  const current = pruneWrongReviews(saved, now)
  const existing = new Set(current.map((entry) => entry.key))
  const byId = new Map(bank.map((question) => [question.id, question]))
  const legacy: WrongReviewRecord[] = []
  for (const result of results) {
    const time = Date.parse(result.completedAt)
    if (!Number.isFinite(time) || time < now - WRONG_REVIEW_WINDOW_MS || time > now ||
        !Array.isArray(result.wrongQuestionIds)) continue
    for (const questionId of result.wrongQuestionIds) {
      if (typeof questionId !== 'string') continue
      const key = `${result.id}:${questionId}`
      if (existing.has(key)) continue
      const question = byId.get(questionId)
      if (!question) continue
      existing.add(key)
      // Only the question ID is reliable for old attempts. Display the current
      // question text and correct answer, but never invent the user's choice.
      legacy.push({ key, completedAt: result.completedAt, question, selected: null })
    }
  }
  return pruneWrongReviews([...current, ...legacy], now)
}

export function loadWrongReviews(
  scope?: string | null,
  storage: Pick<Storage, 'getItem'> = localStorage,
  now = Date.now(),
): WrongReviewRecord[] {
  try {
    return pruneWrongReviews(JSON.parse(storage.getItem(storageKey(scope)) ?? '[]'), now)
  } catch { return [] }
}

export function saveWrongReviews(
  records: readonly WrongReviewRecord[],
  scope?: string | null,
  storage: Pick<Storage, 'setItem'> = localStorage,
  now = Date.now(),
): void {
  storage.setItem(storageKey(scope), JSON.stringify(pruneWrongReviews(records, now)))
}
