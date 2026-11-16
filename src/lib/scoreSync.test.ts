import { describe, expect, it } from 'vitest'
import { createScoreSubmissionCandidate } from './scoreSync'
import { enqueueScoreCandidate, loadScoreOutbox } from './scoreOutbox'
import type { Question, SessionResult } from './types'

const question = {
  id: 'q1', chapter: 'AI', question: 'Example', choices: ['A', 'B'], answers: [1],
} as unknown as Question
const result = {
  id: 'attempt-1', mode: 'study', score: 1, total: 1,
  answers: { q1: [1] }, completedAt: '2026-11-16T10:00:00Z',
} as SessionResult

function memoryStorage() {
  const data = new Map<string, string>()
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => { data.set(key, value) },
  }
}

describe('local-only score candidate boundary', () => {
  it('does not accept fabricated client score', () => {
    expect(createScoreSubmissionCandidate({ ...result, score: 0 }, [question])).toBeNull()
  })
  it('does not accept duplicate question IDs', () => {
    expect(createScoreSubmissionCandidate({ ...result, total: 2, score: 2 }, [question, question])).toBeNull()
  })
  it('does not accept invalid choice indexes', () => {
    expect(createScoreSubmissionCandidate({ ...result, answers: { q1: [3] }, score: 0 }, [question])).toBeNull()
  })
  it('excludes weak drills from parent-facing score candidates', () => {
    expect(createScoreSubmissionCandidate({ ...result, mode: 'weak' }, [question])).toBeNull()
  })
  it('maps study to quiz and mock to mock', () => {
    expect(createScoreSubmissionCandidate(result, [question])?.mode).toBe('quiz')
    expect(createScoreSubmissionCandidate({ ...result, mode: 'mock' }, [question])?.mode).toBe('mock')
  })
  it('deduplicates repeated attempts in bounded local queue', () => {
    const storage = memoryStorage()
    const candidate = createScoreSubmissionCandidate(result, [question])!
    expect(enqueueScoreCandidate(candidate, storage)).toBe(true)
    expect(enqueueScoreCandidate(candidate, storage)).toBe(true)
    expect(loadScoreOutbox(storage)).toHaveLength(1)
  })
})
