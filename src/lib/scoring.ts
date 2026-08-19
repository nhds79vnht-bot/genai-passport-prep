import type { Question } from './types'

export function isCorrect(question: Question, selected: number[]): boolean {
  const sortedSelected = [...selected].sort((a, b) => a - b)
  const sortedExpected = [...question.answers].sort((a, b) => a - b)
  return (
    sortedSelected.length === sortedExpected.length &&
    sortedSelected.every((value, index) => value === sortedExpected[index])
  )
}

export function scoreAnswers(
  questions: Question[],
  answers: Record<string, number[]>,
): { score: number; wrongQuestionIds: string[] } {
  let score = 0
  const wrongQuestionIds: string[] = []

  for (const question of questions) {
    const selected = answers[question.id] ?? []
    if (isCorrect(question, selected)) {
      score += 1
    } else {
      wrongQuestionIds.push(question.id)
    }
  }

  return { score, wrongQuestionIds }
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
