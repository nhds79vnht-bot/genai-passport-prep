export type Chapter =
  | '第1章 AIの基礎'
  | '第2章 生成AI'
  | '第3章 生成AIの技術'
  | '第4章 法律と倫理'
  | '第5章 活用実務'

export type StudyMode = 'study' | 'mock' | 'weak'

export type View = 'home' | 'exam' | 'result'

export type Question = {
  id: string
  chapter: Chapter
  topic: string
  prompt: string
  choices: string[]
  answers: number[]
  explanation: string
  reviewSection: string
  examTrap: string
  choiceNotes: string[]
}

export type SessionResult = {
  id: string
  mode: StudyMode
  chapter?: Chapter
  score: number
  total: number
  percentage: number
  answers: Record<string, number[]>
  wrongQuestionIds: string[]
  completedAt: string
}

export type QuestionStats = Record<
  string,
  {
    chapter: Chapter
    wrong: number
    seen: number
    lastWrongAt?: string
  }
>
