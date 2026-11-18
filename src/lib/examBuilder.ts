import { CHAPTERS, MOCK_QUESTION_COUNT, STUDY_QUESTION_COUNT, WEAK_DRILL_COUNT } from './chapters'
import { shuffle } from './scoring'
import type { Chapter, Question } from './types'
import { questionBank } from '../data/questionBank'
import { syllabus2027Questions } from '../data/syllabus2027Questions'
import { expansion2027Questions } from '../data/expansion2027Questions'
import { advanced2027Questions } from '../data/advanced2027Questions'
import { practice2027Questions } from '../data/practice2027Questions'
import { applied2027Questions } from '../data/applied2027Questions'

export const activeQuestionBank: Question[] = [...questionBank, ...syllabus2027Questions, ...expansion2027Questions, ...advanced2027Questions, ...practice2027Questions, ...applied2027Questions]

const PER_CHAPTER_MOCK = MOCK_QUESTION_COUNT / CHAPTERS.length

// Shuffle choices together with their answer indices and per-choice explanations.
function randomizeChoices(question: Question): Question {
  const indices = shuffle(question.choices.map((_, index) => index))
  return {
    ...question,
    choices: indices.map((index) => question.choices[index]),
    answers: question.answers.map((answer) => indices.indexOf(answer)).sort((a, b) => a - b),
    choiceNotes: indices.map((index) => question.choiceNotes[index]),
  }
}

function prepareSession(questions: Question[]): Question[] {
  return questions.map(randomizeChoices)
}

export function getQuestionsByChapter(chapter: Chapter): Question[] {
  return activeQuestionBank.filter((q) => q.chapter === chapter)
}

export function buildStudySet(chapter: Chapter): Question[] {
  return prepareSession(shuffle(getQuestionsByChapter(chapter)).slice(0, STUDY_QUESTION_COUNT))
}

export function buildMockExam(): Question[] {
  const picked = CHAPTERS.flatMap((chapter) =>
    shuffle(getQuestionsByChapter(chapter)).slice(0, PER_CHAPTER_MOCK),
  )
  return prepareSession(shuffle(picked).slice(0, MOCK_QUESTION_COUNT))
}

export function buildWeakDrill(
  stats: Record<string, { wrong: number; seen: number }>,
  bank: readonly Question[] = activeQuestionBank,
): Question[] {
  const wrongIds = Object.entries(stats)
    .filter(([, value]) => value.wrong > 0)
    .sort((a, b) => {
      const scoreA = a[1].wrong * 10 + a[1].seen
      const scoreB = b[1].wrong * 10 + b[1].seen
      return scoreB - scoreA
    })
    .map(([id]) => id)

  const byId = new Map(bank.map((q) => [q.id, q]))
  const fromStats = wrongIds
    .map((id) => byId.get(id))
    .filter((q): q is Question => Boolean(q))

  if (fromStats.length >= WEAK_DRILL_COUNT) {
    return prepareSession(shuffle(fromStats).slice(0, WEAK_DRILL_COUNT))
  }

  const selectedIds = new Set(fromStats.map((q) => q.id))
  const fallback = shuffle(bank.filter((q) => !selectedIds.has(q.id))).slice(0, WEAK_DRILL_COUNT - fromStats.length)
  return prepareSession(shuffle([...fromStats, ...fallback]))
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

export const questionCount = activeQuestionBank.length
export const chapterQuestionCount = Object.fromEntries(
  CHAPTERS.map((chapter) => [chapter, getQuestionsByChapter(chapter).length]),
) as Record<Chapter, number>
