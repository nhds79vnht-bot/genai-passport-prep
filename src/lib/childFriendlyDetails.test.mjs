import assert from 'node:assert/strict'
import test from 'node:test'
import { getChildFriendlyDetail } from './childFriendlyDetails.ts'

const q074 = {
  id: 'q074',
  prompt: 'ハルシネーションの説明として正しいのはどれですか。',
  choices: [
    '学習データの誤りを検出して自動修正する工程',
    'モデルの確率分布を調整するサンプリング方式',
    'もっともらしい誤情報を生成する現象',
    '外部の一次資料と出力を必ず一致させる検証機能',
  ],
  answers: [2],
}

test('sample explanation gives a reason and four distinct option notes', () => {
  const detail = getChildFriendlyDetail(q074)
  assert.ok(detail)
  assert.match(detail.reason, /ハルシネーション/)
  assert.equal(Object.keys(detail.choiceReasons).length, 4)
})

test('option explanations stay aligned when the app shuffles choices', () => {
  const indices = [3, 2, 0, 1]
  const shuffled = { ...q074, choices: indices.map((i) => q074.choices[i]), answers: [1] }
  const detail = getChildFriendlyDetail(shuffled)
  assert.ok(detail)
  assert.match(detail.choiceReasons[shuffled.choices[0]], /資料/)
  assert.match(detail.choiceReasons[shuffled.choices[1]], /正解/)
})

test('rejects stale or mismatched question content', () => {
  assert.equal(getChildFriendlyDetail({ ...q074, answers: [0] }), null)
  assert.equal(getChildFriendlyDetail({ ...q074, prompt: '別問題' }), null)
})
