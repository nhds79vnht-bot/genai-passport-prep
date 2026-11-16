import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const source = readFileSync(resolve('src/data/questionBank.ts'), 'utf8')
const additions = readFileSync(resolve('src/data/syllabus2027Questions.ts'), 'utf8')
const generator = readFileSync(resolve('scripts/generate-question-bank.mjs'), 'utf8')
const findings = []

function check(condition, level, code, detail) {
  if (condition) findings.push({ level, code, detail })
}

check(/while\s*\(items\.length\s*<\s*60\)/.test(generator), 'FAIL', 'FILLER_GENERATION', '問題数合わせの自動水増し処理が存在します')
check(/const choices = multi \? \[\.\.\.correct, \.\.\.distractors\] : \[correct\[0\], \.\.\.distractors\]/.test(generator), 'FAIL', 'FIXED_CORRECT_POSITION', '問題生成時の正答が先頭に固定されています（出題時シャッフルは別途実装）')
check(/復習問題として適切な学習法|公式シラバスのキーワードを整理する/.test(generator), 'FAIL', 'VACUOUS_QUESTION', 'シラバス知識を問わない汎用問題が生成元に存在します')
check(/不正解：「\$\{wrong[123]\}」は適切ではありません/.test(additions), 'WARN', 'GENERIC_CHOICE_EXPLANATION', '追加問題の誤答解説が個別の誤りを説明できていません')
check(!/export const questionBank/.test(source), 'WARN', 'BANK_EXPORT', '既存問題バンクのエクスポート構造を確認してください')

console.log(JSON.stringify({ auditVersion: '2026-11-16', findings, verdict: findings.some(f => f.level === 'FAIL') ? 'REBUILD_REQUIRED' : 'MANUAL_REVIEW_REQUIRED', note: '静的検査です。全問の事実正確性・公式シラバス適合性を証明するものではありません。' }, null, 2))
