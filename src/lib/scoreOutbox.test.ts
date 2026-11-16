import { describe, expect, it } from 'vitest'
import { acknowledgeScoreCandidate, enqueueScoreCandidate, loadScoreOutbox } from './scoreOutbox'
import type { ScoreSubmissionCandidate } from './scoreSync'

const candidate: ScoreSubmissionCandidate = {
  attemptId: '123e4567-e89b-42d3-a456-426614174000',
  learnerId: '123e4567-e89b-42d3-a456-426614174001',
  mode: 'quiz',
  completedAt: '2026-11-17T00:00:00Z',
  questionIds: ['q1'],
  answers: { q1: [1] },
}

function memoryStorage() {
  const values = new Map<string, string>()
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value) },
  }
}

describe('passport score retry outbox', () => {
  it('queues a valid child attempt and removes it only after acknowledgement', () => {
    const storage = memoryStorage()
    expect(enqueueScoreCandidate(candidate, storage)).toBe(true)
    expect(loadScoreOutbox(storage)).toEqual([candidate])
    expect(acknowledgeScoreCandidate(candidate.attemptId, storage)).toBe(true)
    expect(loadScoreOutbox(storage)).toEqual([])
  })

  it('rejects unscoped attempts and malformed identifiers', () => {
    const storage = memoryStorage()
    expect(enqueueScoreCandidate({ ...candidate, learnerId: undefined }, storage)).toBe(false)
    expect(enqueueScoreCandidate({ ...candidate, attemptId: 'invalid' }, storage)).toBe(false)
    expect(loadScoreOutbox(storage)).toEqual([])
  })

  it('rejects oversized answers and mock exams with fewer than 60 questions', () => {
    const storage = memoryStorage()
    expect(enqueueScoreCandidate({ ...candidate, answers: { q1: [0, 1, 2, 3, 4] } }, storage)).toBe(false)
    expect(enqueueScoreCandidate({ ...candidate, mode: 'mock' }, storage)).toBe(false)
    expect(loadScoreOutbox(storage)).toEqual([])
  })

  it('keeps an existing attempt and rejects conflicting payloads with the same ID', () => {
    const storage = memoryStorage()
    expect(enqueueScoreCandidate(candidate, storage)).toBe(true)
    expect(enqueueScoreCandidate(candidate, storage)).toBe(true)
    expect(enqueueScoreCandidate({ ...candidate, answers: { q1: [2] } }, storage)).toBe(false)
    expect(loadScoreOutbox(storage)).toEqual([candidate])
  })

  it('does not acknowledge an unknown attempt by deleting a different attempt', () => {
    const storage = memoryStorage()
    enqueueScoreCandidate(candidate, storage)
    expect(acknowledgeScoreCandidate('123e4567-e89b-42d3-a456-426614174099', storage)).toBe(true)
    expect(loadScoreOutbox(storage)).toEqual([candidate])
  })
})
