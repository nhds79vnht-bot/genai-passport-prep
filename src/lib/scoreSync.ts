import type { Question, SessionResult } from './types'
import { scoreAnswers } from './scoring'
import { questionBank } from '../data/questionBank'

/**
 * A score submission candidate, NOT an authenticated cloud record.
 * The server must authenticate the learner, independently re-score the
 * original fixed question bank, and reject unknown question IDs.
 */
export type ScoreSubmissionCandidate = {
  attemptId: string
  learnerId?: string
  mode: 'quiz' | 'mock'
  completedAt: string
  questionIds: string[]
  answers: Record<string, number[]>
}

export function createScoreSubmissionCandidate(
  result: SessionResult,
  questions: readonly Question[],
): ScoreSubmissionCandidate | null {
  if (result.mode !== 'study' && result.mode !== 'mock') return null
  if (!result.id || !Number.isFinite(Date.parse(result.completedAt))) return null
  if (questions.length === 0 || new Set(questions.map((q) => q.id)).size !== questions.length) return null
  if (result.total !== questions.length || !Number.isInteger(result.score) || result.score < 0 || result.score > result.total) return null
  const computed = scoreAnswers([...questions], result.answers)
  if (computed.score !== result.score) return null
  const answers: Record<string, number[]> = {}
  const canonical = new Map(questionBank.map((q) => [q.id, q]))
  for (const question of questions) {
    const selected = result.answers[question.id] ?? []
    if (!Array.isArray(selected) || !selected.every((index) => Number.isInteger(index) && index >= 0 && index < question.choices.length) || new Set(selected).size !== selected.length) return null
    const source = canonical.get(question.id)
    if (!source || source.choices.length !== question.choices.length || new Set(source.choices).size !== source.choices.length) return null
    const canonicalIndexes = selected.map((index) => source.choices.indexOf(question.choices[index]))
    if (canonicalIndexes.some((index) => index < 0) || new Set(canonicalIndexes).size !== canonicalIndexes.length) return null
    answers[question.id] = canonicalIndexes.sort((a, b) => a - b)
  }
  return {
    attemptId: result.id,
    mode: result.mode === 'study' ? 'quiz' : 'mock',
    completedAt: result.completedAt,
    questionIds: questions.map((q) => q.id),
    answers,
  }
}
