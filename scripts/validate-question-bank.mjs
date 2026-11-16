import { readFileSync } from 'node:fs'
import ts from 'typescript'

const path = 'src/data/questionBank.ts'
const source = ts.createSourceFile(path, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true)
const problems = []
const counts = new Map()
const ids = new Set()
const normalizedPrompts = new Map()
let total = 0

function value(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(value)
  return undefined
}
function fields(node) {
  const out = {}
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue
    const key = prop.name.getText(source).replace(/^['"]|['"]$/g, '')
    out[key] = value(prop.initializer)
  }
  return out
}
function walk(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(source) === 'questionBank' && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
    for (const element of node.initializer.elements) {
      if (!ts.isObjectLiteralExpression(element)) continue
      const q = fields(element)
      total++
      counts.set(q.chapter, (counts.get(q.chapter) ?? 0) + 1)
      if (ids.has(q.id)) problems.push(`重複ID: ${q.id}`)
      ids.add(q.id)
      if (!q.prompt || !q.explanation || !q.topic) problems.push(`必須項目不足: ${q.id}`)
      if (!Array.isArray(q.choices) || q.choices.length !== 4 || new Set(q.choices).size !== 4) problems.push(`選択肢異常: ${q.id}`)
      if (!Array.isArray(q.answers) || q.answers.length === 0 || q.answers.some(a => !Number.isInteger(a) || a < 0 || a >= (q.choices?.length ?? 0))) problems.push(`正答異常: ${q.id}`)
      if (!Array.isArray(q.choiceNotes) || q.choiceNotes.length !== q.choices?.length) problems.push(`解説数異常: ${q.id}`)
      const key = String(q.prompt ?? '').replace(/[\s、。？！?！]/g, '').toLowerCase()
      if (normalizedPrompts.has(key)) problems.push(`設問文重複: ${normalizedPrompts.get(key)} / ${q.id}`)
      else normalizedPrompts.set(key, q.id)
      if (/復習問題として適切な学習法|シラバスのキーワードを整理/.test(q.prompt ?? '')) problems.push(`汎用水増し設問: ${q.id}`)
    }
  }
  ts.forEachChild(node, walk)
}
walk(source)
const report = { total, chapterCounts: Object.fromEntries(counts), problemCount: problems.length, examples: problems.slice(0, 60), note: '形式・完全一致重複・汎用設問の機械監査。事実正確性とシラバス適合性は別途人手監査が必要。' }
console.log(JSON.stringify(report, null, 2))
if (problems.length) process.exitCode = 1
