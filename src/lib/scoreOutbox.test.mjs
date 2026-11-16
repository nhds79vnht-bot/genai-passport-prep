import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { acknowledgeScoreCandidate, enqueueScoreCandidate, loadScoreOutbox } from './scoreOutbox.ts'

const candidate = {
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
    assert.deepEqual(enqueueScoreCandidate(candidate, storage), true)
    assert.deepEqual(loadScoreOutbox(storage), [candidate])
    assert.deepEqual(acknowledgeScoreCandidate(candidate.attemptId, storage), true)
    assert.deepEqual(loadScoreOutbox(storage), [])
  })

  it('rejects unscoped attempts and malformed identifiers', () => {
    const storage = memoryStorage()
    assert.deepEqual(enqueueScoreCandidate({ ...candidate, learnerId: undefined }, storage), false)
    assert.deepEqual(enqueueScoreCandidate({ ...candidate, attemptId: 'invalid' }, storage), false)
    assert.deepEqual(loadScoreOutbox(storage), [])
  })

  it('rejects oversized answers and mock exams with fewer than 60 questions', () => {
    const storage = memoryStorage()
    assert.deepEqual(enqueueScoreCandidate({ ...candidate, answers: { q1: [0, 1, 2, 3, 4] } }, storage), false)
    assert.deepEqual(enqueueScoreCandidate({ ...candidate, mode: 'mock' }, storage), false)
    assert.deepEqual(loadScoreOutbox(storage), [])
  })

  it('keeps an existing attempt and rejects conflicting payloads with the same ID', () => {
    const storage = memoryStorage()
    assert.deepEqual(enqueueScoreCandidate(candidate, storage), true)
    assert.deepEqual(enqueueScoreCandidate(candidate, storage), true)
    assert.deepEqual(enqueueScoreCandidate({ ...candidate, answers: { q1: [2] } }, storage), false)
    assert.deepEqual(loadScoreOutbox(storage), [candidate])
  })

  it('does not discard a pending score when the outbox reaches capacity', () => {
    const storage = memoryStorage()
    for (let i = 0; i < 50; i++) {
      const attemptId = '123e4567-e89b-42d3-a456-' + String(i).padStart(12, '0')
      assert.deepEqual(enqueueScoreCandidate({ ...candidate, attemptId }, storage), true)
    }
    assert.deepEqual(enqueueScoreCandidate(candidate, storage), false)
    const pending = loadScoreOutbox(storage)
    assert.deepEqual(pending.length, 50)
    assert.deepEqual(pending.some((row) => row.attemptId === '123e4567-e89b-42d3-a456-000000000000'), true)
  })

  it('does not acknowledge an unknown attempt by deleting a different attempt', () => {
    const storage = memoryStorage()
    enqueueScoreCandidate(candidate, storage)
    assert.deepEqual(acknowledgeScoreCandidate('123e4567-e89b-42d3-a456-426614174099', storage), false)
    assert.deepEqual(loadScoreOutbox(storage), [candidate])
  })
})
