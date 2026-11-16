import { readFileSync } from 'node:fs'
import ts from 'typescript'

const sources = [
  ['src/data/questionBank.ts', 'questionBank'],
  ['src/data/syllabus2027Questions.ts', 'items'],
  ['src/data/expansion2027Questions.ts', 'rows'],
  ['src/data/advanced2027Questions.ts', 'rows'],
  ['src/data/practice2027Questions.ts', 'rows'],
  ['src/data/applied2027Questions.ts', 'rows'],
]
const problems = []
const warnings = []
const all = []
const chapters = new Map()
const promptIndex = new Map()
const ids = new Set()

function scalar(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(scalar)
  return undefined
}
function fieldObject(node, source) {
  const result = {}
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue
    result[prop.name.getText(source).replace(/^['"]|['"]$/g, '')] = scalar(prop.initializer)
  }
  return result
}
function findArray(source, variable) {
  let result
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(source) === variable && node.initializer) {
      let value = node.initializer
      if (ts.isAsExpression(value)) value = value.expression
      if (ts.isArrayLiteralExpression(value)) result = value
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return result
}
function add(q, origin) {
  const label = `${origin}:${q.id}`
  all.push(q)
  chapters.set(q.chapter, (chapters.get(q.chapter) ?? 0) + 1)
  if (ids.has(q.id)) problems.push(`重複ID: ${label}`)
  ids.add(q.id)
  if (![q.id, q.chapter, q.topic, q.prompt, q.explanation].every(x => typeof x === 'string' && x.trim())) problems.push(`必須項目不足: ${label}`)
  if (!Array.isArray(q.choices) || q.choices.length !== 4 || q.choices.some(x => typeof x !== 'string' || !x.trim()) || new Set(q.choices).size !== 4) problems.push(`選択肢異常: ${label}`)
  if (!Array.isArray(q.answers) || !q.answers.length || new Set(q.answers).size !== q.answers.length || q.answers.some(a => !Number.isInteger(a) || a < 0 || a >= 4)) problems.push(`正答異常: ${label}`)
  if (!Array.isArray(q.choiceNotes) || q.choiceNotes.length !== 4) problems.push(`解説数異常: ${label}`)
  const key = String(q.prompt ?? '').replace(/[\s、。？！?！]/g, '').toLowerCase()
  if (promptIndex.has(key)) problems.push(`設問文重複: ${promptIndex.get(key)} / ${label}`)
  else promptIndex.set(key, label)
  if (/復習問題として適切な学習法|シラバスのキーワードを整理/.test(q.prompt ?? '')) problems.push(`汎用水増し設問: ${label}`)
  if (String(q.explanation ?? '').length < 15) warnings.push(`短い解説: ${label}`)
  if (q.choices?.slice(1).some(x => String(x).length < 6)) warnings.push(`短い誤答選択肢: ${label}`)
  if (q.choiceNotes?.slice(1).some(x => /^誤答：|^不正解：[^。]*$/.test(String(x)))) warnings.push(`理由のない選択肢解説: ${label}`)
}
for (const [path, variable] of sources) {
  const source = ts.createSourceFile(path, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true)
  const array = findArray(source, variable)
  if (!array) { problems.push(`問題配列が見つからない: ${path}`); continue }
  array.elements.forEach((node, index) => {
    if (variable === 'questionBank') {
      if (!ts.isObjectLiteralExpression(node)) { problems.push(`形式異常: ${path} #${index}`); return }
      add(fieldObject(node, source), path)
    } else {
      if (!ts.isArrayLiteralExpression(node)) { problems.push(`行形式異常: ${path} #${index}`); return }
      const row = node.elements.map(scalar)
      if (row.length !== 8 || row.some(x => typeof x !== 'string')) { problems.push(`行項目異常: ${path} #${index}`); return }
      const [chapter, topic, prompt, correct, wrong1, wrong2, wrong3, explanation] = row
      const prefix = path.includes('syllabus') ? 's27' : path.includes('expansion') ? 'ex27' : path.includes('advanced') ? 'adv27' : path.includes('practice') ? 'pr27' : 'ap27'
      add({ id: `${prefix}-${String(index + 1).padStart(3, '0')}`, chapter, topic, prompt, choices: [correct, wrong1, wrong2, wrong3], answers: [0], explanation, choiceNotes: [explanation, `誤答：${wrong1}`, `誤答：${wrong2}`, `誤答：${wrong3}`] }, path)
    }
  })
}
const report = {
  total: all.length,
  chapterCounts: Object.fromEntries(chapters),
  problemCount: problems.length,
  problems: problems.slice(0, 80),
  qualityWarningCount: warnings.length,
  qualityWarnings: warnings.slice(0, 50),
  scope: '全6ファイルの形式・ID・設問文完全一致・選択肢重複を確認。短い解説等は警告であり、意味的重複・正誤の事実検証・ビルド・実機試験は別途必要。',
}
console.log(JSON.stringify(report, null, 2))
if (problems.length) process.exitCode = 1
