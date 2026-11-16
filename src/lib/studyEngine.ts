import type { Chapter, Question } from './types'
import { shuffle } from './scoring'

/** Versioned local learner progress. The source question bank is never mutated. */
export type LearnerProgress = {
  version: 1
  items: Record<string, {
    seen: number
    correct: number
    firstCorrect: boolean
    lastAnsweredAt: string
    dueAt: string
    consecutiveCorrect: number
  }>
}

export const emptyProgress = (): LearnerProgress => ({ version: 1, items: {} })

const DAY = 86_400_000
const dueIntervals = [1, 3, 7, 14, 30]

export function recordAnswer(
  progress: LearnerProgress,
  questionId: string,
  correct: boolean,
  now = new Date(),
): LearnerProgress {
  const prior = progress.items[questionId]
  const consecutiveCorrect = correct ? (prior?.consecutiveCorrect ?? 0) + 1 : 0
  const interval = correct ? dueIntervals[Math.min(consecutiveCorrect - 1, dueIntervals.length - 1)] : 1
  return {
    version: 1,
    items: {
      ...progress.items,
      [questionId]: {
        seen: (prior?.seen ?? 0) + 1,
        correct: (prior?.correct ?? 0) + Number(correct),
        firstCorrect: prior?.firstCorrect ?? correct,
        lastAnsweredAt: now.toISOString(),
        dueAt: new Date(now.getTime() + interval * DAY).toISOString(),
        consecutiveCorrect,
      },
    },
  }
}

/** Prioritize due review, then unseen questions; no duplicate IDs in one set. */
export function buildDailySet(
  bank: readonly Question[],
  progress: LearnerProgress,
  count: number,
  now = new Date(),
  chapter?: Chapter,
): Question[] {
  if (!Number.isInteger(count) || count < 0) throw new Error('Invalid question count')
  const eligible = bank.filter((q) => !chapter || q.chapter === chapter)
  const unique = [...new Map(eligible.map((q) => [q.id, q])).values()]
  const due = shuffle(unique.filter((q) => {
    const state = progress.items[q.id]
    return state && Date.parse(state.dueAt) <= now.getTime()
  })).sort((a, b) => Date.parse(progress.items[a.id].dueAt) - Date.parse(progress.items[b.id].dueAt))
  const unseen = shuffle(unique.filter((q) => !progress.items[q.id]))
  const seenNotDue = shuffle(unique.filter((q) => progress.items[q.id] && Date.parse(progress.items[q.id].dueAt) > now.getTime()))
  return [...due, ...unseen, ...seenNotDue].slice(0, count)
}

/** Fisher-Yates on the options, keeping scoring and explanations in sync. */
export function randomizeChoices(question: Question): Question {
  if (question.choiceNotes.length !== question.choices.length) {
    throw new Error(`Choice explanation mismatch: ${question.id}`)
  }
  const order = shuffle(question.choices.map((_, i) => i))
  return {
    ...question,
    choices: order.map((i) => question.choices[i]),
    choiceNotes: order.map((i) => question.choiceNotes[i]),
    answers: order.flatMap((oldIndex, newIndex) => question.answers.includes(oldIndex) ? [newIndex] : []),
  }
}

/** Fresh mock form: balanced by chapter and without repeating a question ID. */
export function buildBalancedMock(
  bank: readonly Question[],
  chapters: readonly Chapter[],
  total = 60,
): Question[] {
  if (chapters.length === 0 || total % chapters.length !== 0) {
    throw new Error('Mock count must be divisible by chapter count')
  }
  const perChapter = total / chapters.length
  const selected = chapters.flatMap((chapter) => {
    const unique = [...new Map(bank.filter((q) => q.chapter === chapter).map((q) => [q.id, q])).values()]
    if (unique.length < perChapter) throw new Error(`Insufficient questions for ${chapter}`)
    return shuffle(unique).slice(0, perChapter)
  })
  return shuffle(selected).map(randomizeChoices)
}
