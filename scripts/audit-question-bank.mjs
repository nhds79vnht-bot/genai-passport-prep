import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const source = readFileSync(new URL('../src/data/questionBank.ts', import.meta.url), 'utf8')
const starts = [...source.matchAll(/\bid: 'q\d+'/g)].map((match) => match.index)
const blocks = starts.map((start, index) => source.slice(start, starts[index + 1] ?? source.length))
const counts = new Map()
const positions = [0, 0, 0, 0]
const ids = new Set()
const prompts = new Set()
let multi = 0

for (const block of blocks) {
  const id = block.match(/\bid: '([^']+)'/)?.[1]
  const chapter = block.match(/\bchapter: '([^']+)'/)?.[1]
  const prompt = block.match(/\bprompt: '([^']+)'/)?.[1]
  const answersText = block.match(/\banswers: \[([\s\S]*?)\]/)?.[1]
  const choicesText = block.match(/\bchoices: \[([\s\S]*?)\]/)?.[1]
  const notesText = block.match(/\bchoiceNotes: \[([\s\S]*?)\]/)?.[1]
  assert.ok(id && chapter && prompt && answersText && choicesText && notesText, 'Required field missing')
  assert.ok(!ids.has(id), `Duplicate id: ${id}`)
  assert.ok(!prompts.has(prompt), `Duplicate prompt: ${id}`)
  ids.add(id)
  prompts.add(prompt)
  counts.set(chapter, (counts.get(chapter) ?? 0) + 1)
  const answers = answersText.split(',').map((s) => s.trim()).filter(Boolean).map(Number)
  const choices = [...choicesText.matchAll(/^\s*'((?:\\'|[^'])*)'/gm)]
  const notes = [...notesText.matchAll(/^\s*'((?:\\'|[^'])*)'/gm)]
  assert.equal(choices.length, 4, `Expected four choices: ${id}`)
  assert.equal(notes.length, 4, `Expected four choice explanations: ${id}`)
  assert.equal(new Set(answers).size, answers.length, `Duplicate answer index: ${id}`)
  assert.ok(answers.length > 0 && answers.every((n) => Number.isInteger(n) && n >= 0 && n < choices.length), `Invalid answer: ${id}`)
  if (answers.length > 1) multi++
  for (const index of answers) positions[index]++
}
assert.equal(blocks.length, 300, 'Question bank size changed unexpectedly')
assert.equal(counts.size, 5, 'Expected five chapters')
for (const count of counts.values()) assert.equal(count, 60, 'Expected 60 questions per chapter')
console.log(JSON.stringify({ questions: blocks.length, chapters: Object.fromEntries(counts), multipleChoice: multi, correctChoicePositions: { A: positions[0], B: positions[1], C: positions[2], D: positions[3] }, warning: 'Answer positions in the source bank are biased; runtime choice shuffling is required.' }, null, 2))
