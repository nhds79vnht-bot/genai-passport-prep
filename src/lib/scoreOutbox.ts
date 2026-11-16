import type { ScoreSubmissionCandidate } from './scoreSync'

const KEY = 'genai-passport-prep:score-outbox-v1'
const MAX_PENDING = 50

/** Local-only pending attempts. Never sends results to an unverified endpoint. */
export function loadScoreOutbox(storage: Pick<Storage, 'getItem'> = localStorage): ScoreSubmissionCandidate[] {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isCandidate).slice(0, MAX_PENDING)
  } catch { return [] }
}

function isCandidate(value: unknown): value is ScoreSubmissionCandidate {
  if (!value || typeof value !== 'object') return false
  const row = value as Partial<ScoreSubmissionCandidate>
  return typeof row.attemptId === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(row.attemptId) &&
    typeof row.learnerId === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(row.learnerId) &&
    (row.mode === 'quiz' || row.mode === 'mock') &&
    typeof row.completedAt === 'string' && Number.isFinite(Date.parse(row.completedAt)) &&
    Array.isArray(row.questionIds) && row.questionIds.length > 0 && row.questionIds.length <= 60 &&
    (row.mode !== 'mock' || row.questionIds.length === 60) &&
    row.questionIds.every((id) => typeof id === 'string' && id.length > 0) &&
    new Set(row.questionIds).size === row.questionIds.length &&
    !!row.answers && typeof row.answers === 'object' && !Array.isArray(row.answers) &&
    Object.keys(row.answers).every((id) => row.questionIds?.includes(id)) &&
    Object.values(row.answers).every((answer) => Array.isArray(answer) && answer.length <= 4 &&
      answer.every((index) => Number.isInteger(index) && index >= 0 && index < 4) &&
      new Set(answer).size === answer.length)
}

export function enqueueScoreCandidate(
  candidate: ScoreSubmissionCandidate,
  storage: Pick<Storage, 'getItem' | 'setItem'> = localStorage,
): boolean {
  if (!isCandidate(candidate)) return false
  try {
    const pending = loadScoreOutbox(storage)
    // Never treat a conflicting attempt ID as a successful enqueue.
    const existing = pending.find((row) => row.attemptId === candidate.attemptId)
    if (existing) return JSON.stringify(existing) === JSON.stringify(candidate)
    // Never silently evict an unacknowledged score, including another child's.
    if (pending.length >= MAX_PENDING) return false
    storage.setItem(KEY, JSON.stringify([candidate, ...pending]))
    return true
  } catch { return false }
}

/** Removes only a server-acknowledged attempt; keeps failed attempts for retry. */
export function acknowledgeScoreCandidate(
  attemptId: string,
  storage: Pick<Storage, 'getItem' | 'setItem'> = localStorage,
): boolean {
  if (!attemptId) return false
  try {
    const pending = loadScoreOutbox(storage)
    if (!pending.some((row) => row.attemptId === attemptId)) return false
    storage.setItem(KEY, JSON.stringify(pending.filter((row) => row.attemptId !== attemptId)))
    return true
  } catch { return false }
}
