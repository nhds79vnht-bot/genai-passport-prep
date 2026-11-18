import type { Chapter, QuestionStats, SessionResult } from './types'

const RESULTS_KEY = 'genai-passport-prep:results'
const STATS_KEY = 'genai-passport-prep:stats'

// Preserve saved local results when chapters are renamed for the 2027 syllabus.
const LEGACY_CHAPTERS: Record<string, Chapter> = {
  '第3章 生成AIの技術': '第3章 AIエージェント',
  '第4章 法律と倫理': '第4章 生成AIのリスク予防・AI倫理・ガバナンス',
  '第5章 活用実務': '第5章 生成AIの実践と活用事例',
}

function migrateChapter(chapter: Chapter | undefined): Chapter | undefined {
  return chapter ? LEGACY_CHAPTERS[chapter] ?? chapter : undefined
}

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
  return Array.isArray(parsed) ? parsed.map((result) => ({
    ...result,
    chapter: migrateChapter(result.chapter),
  })) : []
}

export function saveResults(results: SessionResult[], scope?: string | null): void {
  localStorage.setItem(scope ? `${RESULTS_KEY}:${scope}` : RESULTS_KEY, JSON.stringify(results))
}

export function loadStats(scope?: string | null): QuestionStats {
  const parsed = readJson<QuestionStats>(scope ? `${STATS_KEY}:${scope}` : STATS_KEY, {})
  if (!parsed || typeof parsed !== 'object') return {}
  return Object.fromEntries(Object.entries(parsed).map(([id, record]) => {
    const chapter = migrateChapter(record?.chapter)
    return [id, chapter ? { ...record, chapter } : record]
  })) as QuestionStats
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
