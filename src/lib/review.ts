import type { Question } from './types'

function choiceLabel(index: number): string {
  return ['A', 'B', 'C', 'D'][index] ?? String(index + 1)
}

export function formatSelectedChoices(question: Question, selected: number[]): string {
  if (selected.length === 0) return '未回答'
  return [...selected]
    .sort((a, b) => a - b)
    .map((index) => `${choiceLabel(index)}. ${question.choices[index]}`)
    .join(' / ')
}

export function formatCorrectChoices(question: Question): string {
  return question.answers
    .map((index) => `${choiceLabel(index)}. ${question.choices[index]}`)
    .join(' / ')
}

export function buildStudyTip(question: Question): string {
  return question.reviewSection
}

export function buildReviewSummary(question: Question, selected: number[]): string {
  if (selected.length === 0) {
    return '未回答です。まず正解の根拠を読み、次に誤答選択肢の違いを1つずつ確認してください。'
  }
  if (question.answers.length > 1) {
    return '複数選択は「当てはまるものを全部」選ぶ問題です。1つずつ真偽判定してから確定するとミスが減ります。'
  }
  return question.examTrap
}

export function getWrongChoiceNotes(question: Question): Array<{ label: string; text: string }> {
  const answerSet = new Set(question.answers)
  return question.choices
    .map((choice, index) => ({ index, choice }))
    .filter(({ index }) => !answerSet.has(index))
    .map(({ index, choice }) => ({
      label: `${choiceLabel(index)}. ${choice}`,
      text: question.choiceNotes[index] ?? '正解条件と一致しないため不適切です。',
    }))
}

export function getCorrectChoiceNotes(question: Question): Array<{ label: string; text: string }> {
  return question.answers.map((index) => ({
    label: `${choiceLabel(index)}. ${question.choices[index]}`,
    text: question.choiceNotes[index] ?? question.explanation,
  }))
}

export function buildGeminiReviewPrompt(question: Question, selected: number[] | null): string {
  const choices = question.choices.map((choice, index) =>
    `${['A', 'B', 'C', 'D'][index]}. ${choice}`).join('\n')
  const answered = selected === null
    ? '以前の回答は保存されていません'
    : formatSelectedChoices(question, selected)
  return [
    '生成AIパスポートの次の問題を、専門用語の意味と身近な例から分かりやすく解説してください。なぜ正解なのか、他の選択肢が不適切な理由も教えてください。',
    `【分野】${question.chapter} / ${question.topic}`,
    `【問題】\n${question.prompt}`,
    `【選択肢】\n${choices}`,
    `【私の回答】${answered}`,
    `【正解】${formatCorrectChoices(question)}`,
    `【アプリの解説】${question.explanation}`,
  ].join('\n\n')
}
