import type { Chapter } from './types'

export const CHAPTERS: Chapter[] = [
  '第1章 AIの基礎',
  '第2章 生成AI',
  '第3章 AIエージェント',
  '第4章 生成AIのリスク予防・AI倫理・ガバナンス',
  '第5章 生成AIの実践と活用事例',
]

export const CHAPTER_SHORT: Record<Chapter, string> = {
  '第1章 AIの基礎': '第1章',
  '第2章 生成AI': '第2章',
  '第3章 AIエージェント': '第3章',
  '第4章 生成AIのリスク予防・AI倫理・ガバナンス': '第4章',
  '第5章 生成AIの実践と活用事例': '第5章',
}

export const MOCK_SECONDS = 60 * 60
export const MOCK_QUESTION_COUNT = 60
export const STUDY_QUESTION_COUNT = 10
export const WEAK_DRILL_COUNT = 15

export const APP_NAME = 'くろ先生 生成AIパスポート対策'
export const SYLLABUS_NOTE = '2027年2月試験適用シラバス対応・全5章の非公式学習用問題集'
