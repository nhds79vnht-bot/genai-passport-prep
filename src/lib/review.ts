import type { Question } from './types'

function choiceLabel(index: number): string {
  return ['A', 'B', 'C', 'D'][index] ?? String(index + 1)
}

export function formatSelectedChoices(question: Question, selected: number[]): string {
  if (selected.length === 0) return '未回答'
  return selected
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
  switch (question.chapter) {
    case '第1章 AIの基礎':
      return 'まず用語の定義を1行で言えるようにし、学習方式や評価指標の違いを対比で覚えると定着しやすいです。'
    case '第2章 生成AI':
      return '主要モデル名・プロンプト技法・ハルシネーション対策をセットで覚えると、実務問題にも対応しやすくなります。'
    case '第3章 生成AIの技術':
      return 'RAG、ベクトルDB、AIエージェント、MCPは役割の違いで整理すると混ざりにくくなります。'
    case '第4章 法律と倫理':
      return '法律名を丸暗記するより、何を守るためのルールかを「個人情報・著作権・説明責任」で分類すると覚えやすいです。'
    case '第5章 活用実務':
      return '導入目的、KPI、ルール整備、検証、継続改善の流れで覚えると現場問題に強くなります。'
  }
}

export function buildReviewSummary(question: Question, selected: number[]): string {
  if (selected.length === 0) {
    return 'この問題は未回答でした。迷ったときほど、章の基本用語と選択肢の違いを見比べると復習効率が上がります。'
  }

  if (question.answers.length > 1) {
    return '複数選択問題は「正しいものを選ぶ」だけでなく、「誤りの選択肢を外せるか」が重要です。各選択肢を1つずつ判定する意識で解くと安定します。'
  }

  return '正解選択肢の根拠を1つ言語化し、他の選択肢がなぜ違うかも合わせて確認すると、本番で似た問題に強くなります。'
}
