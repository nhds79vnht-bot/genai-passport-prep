import type { Chapter } from './types'

export const CHAPTERS: Chapter[] = [
  '第1章 AIの基礎',
  '第2章 生成AI',
  '第3章 生成AIの技術',
  '第4章 法律と倫理',
  '第5章 活用実務',
]

export const CHAPTER_SHORT: Record<Chapter, string> = {
  '第1章 AIの基礎': '第1章',
  '第2章 生成AI': '第2章',
  '第3章 生成AIの技術': '第3章',
  '第4章 法律と倫理': '第4章',
  '第5章 活用実務': '第5章',
}

export const MOCK_SECONDS = 60 * 60
export const MOCK_QUESTION_COUNT = 60
export const STUDY_QUESTION_COUNT = 10
export const WEAK_DRILL_COUNT = 15

export const APP_NAME = 'くろ先生 生成AIパスポート対策'
export const SYLLABUS_NOTE = '第4版シラバス（2026年2月試験以降）想定のオリジナル問題'
