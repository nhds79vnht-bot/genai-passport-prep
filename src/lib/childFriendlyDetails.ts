import type { Question } from './types'

/**
 * Human-authored, child-friendly explanations, separate from the audited bank.
 * Always validate by prompt and correct CHOICE TEXT, not option index:
 * the quiz shuffles answer options during each session.
 */
export type ChildFriendlyDetail = {
  reason: string
  example: string
  choiceReasons: Record<string, string>
}

type ChildFriendlyGuide = ChildFriendlyDetail & {
  prompt: string
  correctChoices: readonly string[]
}

const guides: Record<string, ChildFriendlyGuide> = {
  q074: {
    prompt: 'ハルシネーションの説明として正しいのはどれですか。',
    correctChoices: ['もっともらしい誤情報を生成する現象'],
    reason: '正解は「もっともらしい誤情報を生成する現象」です。ハルシネーションとは、AIが本当ではないことを、本当らしい文章で答えてしまう現象です。自然な文章でも内容が正しいとは限りません。本の名前・数字・出典などは元の資料で確かめます。',
    example: 'AIに「このテーマの参考書を教えて」と聞くと、実際には存在しない本の題名や著者名を答えることがあります。図書館の検索や出版社の情報で、本当にある本か確認しましょう。',
    choiceReasons: {
      '学習データの誤りを検出して自動修正する工程': 'これは「間違いを発見して修正する働き」の説明です。ハルシネーションは、間違いを直すことではなく、AIが間違った内容を作ってしまうことです。',
      'モデルの確率分布を調整するサンプリング方式': 'これは「AIが次に出す言葉をどう選ぶか」という設定に関する説明です。ハルシネーションという現象そのものの意味ではありません。',
      'もっともらしい誤情報を生成する現象': 'これが正解です。AIが事実と違う情報を、本当らしく作ってしまうことをハルシネーションといいます。',
      '外部の一次資料と出力を必ず一致させる検証機能': 'これは「資料と照合して正しさを確かめる」という対策に近い説明です。AIの回答が資料と必ず一致する、という保証はありません。',
    },
  },
}

export function getChildFriendlyDetail(
  question: Pick<Question, 'id' | 'prompt' | 'answers' | 'choices'>,
): ChildFriendlyDetail | null {
  const guide = guides[question.id]
  if (!guide || guide.prompt !== question.prompt) return null
  const correctChoices = question.answers.map((index) => question.choices[index]).sort()
  const expectedChoices = [...guide.correctChoices].sort()
  if (correctChoices.length !== expectedChoices.length ||
    correctChoices.some((value, index) => value !== expectedChoices[index])) return null
  if (question.choices.some((choice) => !Object.prototype.hasOwnProperty.call(guide.choiceReasons, choice))) return null
  return { reason: guide.reason, example: guide.example, choiceReasons: guide.choiceReasons }
}
