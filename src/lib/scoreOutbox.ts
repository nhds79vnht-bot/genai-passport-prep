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
  return typeof row.attemptId === 'string' && row.attemptId.length > 0 &&
    (row.mode === 'quiz' || row.mode === 'mock') &&
    typeof row.completedAt === 'string' && Number.isFinite(Date.parse(row.completedAt)) &&
    Array.isArray(row.questionIds) && row.questionIds.length > 0 &&
    row.questionIds.every((id) => typeof id === 'string' && id.length > 0) &&
    new Set(row.questionIds).size === row.questionIds.length &&
    !!row.answers && typeof row.answers === 'object' && !Array.isArray(row.answers)
}

export function enqueueScoreCandidate(
  candidate: ScoreSubmissionCandidate,
  storage: Pick<Storage, 'getItem' | 'setItem'> = localStorage,
): boolean {
  if (!isCandidate(candidate)) return false
  try {
    const pending = loadScoreOutbox(storage)
    if (pending.some((row) => row.attemptId === candidate.attemptId)) return true
    storage.setItem(KEY, JSON.stringify([candidate, ...pending].slice(0, MAX_PENDING)))
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
    storage.setItem(KEY, JSON.stringify(pending.filter((row) => row.attemptId !== attemptId)))
    return true
  } catch { return false }
}
