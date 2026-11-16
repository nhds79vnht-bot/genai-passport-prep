import type { QuestionStats, SessionResult } from './types'

const RESULTS_KEY = 'genai-passport-prep:results'
const STATS_KEY = 'genai-passport-prep:stats'

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function loadResults(scope?: string | null): SessionResult[] {
  const parsed = readJson<SessionResult[]>(scope ? `${RESULTS_KEY}:${scope}` : RESULTS_KEY, [])
  return Array.isArray(parsed) ? parsed : []
}

export function saveResults(results: SessionResult[], scope?: string | null): void {
  localStorage.setItem(scope ? `${RESULTS_KEY}:${scope}` : RESULTS_KEY, JSON.stringify(results))
}

export function loadStats(scope?: string | null): QuestionStats {
  const parsed = readJson<QuestionStats>(scope ? `${STATS_KEY}:${scope}` : STATS_KEY, {})
  return parsed && typeof parsed === 'object' ? parsed : {}
}

export function saveStats(stats: QuestionStats, scope?: string | null): void {
  localStorage.setItem(scope ? `${STATS_KEY}:${scope}` : STATS_KEY, JSON.stringify(stats))
}

export function updateStatsAfterSession(
  stats: QuestionStats,
  questionIds: string[],
  wrongQuestionIds: string[],
  chapterById: Record<string, QuestionStats[string]['chapter']>,
): QuestionStats {
  const next = { ...stats }
  const wrongSet = new Set(wrongQuestionIds)
  const now = new Date().toISOString()

  for (const questionId of questionIds) {
    const chapter = chapterById[questionId]
    if (!chapter) continue
    const current = next[questionId] ?? { chapter, wrong: 0, seen: 0 }
    next[questionId] = {
      chapter,
      seen: current.seen + 1,
      wrong: current.wrong + (wrongSet.has(questionId) ? 1 : 0),
      lastWrongAt: wrongSet.has(questionId) ? now : current.lastWrongAt,
    }
  }

  return next
}
