export type Chapter =
  | '第1章 AIの基礎'
  | '第2章 生成AI'
  | '第3章 AIエージェント'
  | '第4章 生成AIのリスク予防・AI倫理・ガバナンス'
  | '第5章 生成AIの実践と活用事例'

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
