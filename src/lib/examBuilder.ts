import { CHAPTERS, MOCK_QUESTION_COUNT, STUDY_QUESTION_COUNT, WEAK_DRILL_COUNT } from './chapters'
import { shuffle } from './scoring'
import type { Chapter, Question } from './types'
import { questionBank } from '../data/questionBank'

const PER_CHAPTER_MOCK = MOCK_QUESTION_COUNT / CHAPTERS.length

export function getQuestionsByChapter(chapter: Chapter): Question[] {
  return questionBank.filter((q) => q.chapter === chapter)
}

export function buildStudySet(chapter: Chapter): Question[] {
  return shuffle(getQuestionsByChapter(chapter)).slice(0, STUDY_QUESTION_COUNT)
}

export function buildMockExam(): Question[] {
  const picked = CHAPTERS.flatMap((chapter) =>
    shuffle(getQuestionsByChapter(chapter)).slice(0, PER_CHAPTER_MOCK),
  )
  return shuffle(picked).slice(0, MOCK_QUESTION_COUNT)
}

export function buildWeakDrill(stats: Record<string, { wrong: number; seen: number }>): Question[] {
  const wrongIds = Object.entries(stats)
    .filter(([, value]) => value.wrong > 0)
    .sort((a, b) => {
      const scoreA = a[1].wrong * 10 + a[1].seen
      const scoreB = b[1].wrong * 10 + b[1].seen
      return scoreB - scoreA
    })
    .map(([id]) => id)

  const byId = new Map(questionBank.map((q) => [q.id, q]))
  const fromStats = wrongIds
    .map((id) => byId.get(id))
    .filter((q): q is Question => Boolean(q))

  if (fromStats.length >= WEAK_DRILL_COUNT) {
    return shuffle(fromStats).slice(0, WEAK_DRILL_COUNT)
  }

  const fallback = shuffle(questionBank).slice(0, WEAK_DRILL_COUNT - fromStats.length)
  return shuffle([...fromStats, ...fallback])
}

export function chapterStats(
  stats: Record<string, { chapter: Chapter; wrong: number; seen: number }>,
): Array<{ chapter: Chapter; wrong: number; seen: number; rate: number }> {
  return CHAPTERS.map((chapter) => {
    const rows = Object.values(stats).filter((row) => row.chapter === chapter)
    const seen = rows.reduce((sum, row) => sum + row.seen, 0)
    const wrong = rows.reduce((sum, row) => sum + row.wrong, 0)
    const rate = seen === 0 ? 0 : Math.round((wrong / seen) * 1000) / 10
    return { chapter, seen, wrong, rate }
  })
}

export const questionCount = questionBank.length
export const chapterQuestionCount = Object.fromEntries(
  CHAPTERS.map((chapter) => [chapter, getQuestionsByChapter(chapter).length]),
) as Record<Chapter, number>
