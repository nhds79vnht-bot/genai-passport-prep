import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ensurePassportProductionBaseline,
  passportLiveMarkerKey,
  PASSPORT_LIVE_BASELINE,
} from './productionBaseline.ts'

function mockStorage() {
  const data = new Map()
  return {
    data,
    getItem: (k) => data.get(k) ?? null,
    setItem: (k,v) => data.set(k,v),
    removeItem: (k) => data.delete(k),
  }
}

test('adult release wipes passport test records and leaves other applications untouched', () => {
  const storage = mockStorage()
  const keys = [
    'genai-passport-prep:progress-v1',
    'genai-passport-prep:results',
    'genai-passport-prep:stats',
    'genai-passport-prep:wrong-review-v1',
    'genai-passport-prep:score-outbox-v1',
  ]
  keys.forEach(key => storage.setItem(key,'TEST'))
  storage.setItem('kuro-sensei:family-pin','KEEP')
  assert.deepEqual(ensurePassportProductionBaseline(null,storage), {ok:true,initialized:true})
  keys.forEach(key => assert.equal(storage.getItem(key),null))
  assert.equal(storage.getItem('kuro-sensei:family-pin'),'KEEP')
  assert.equal(storage.getItem(passportLiveMarkerKey(null)),PASSPORT_LIVE_BASELINE)
})

test('once production starts a second visit never deletes real user learning', () => {
  const storage = mockStorage()
  assert.equal(ensurePassportProductionBaseline(null,storage).ok,true)
  storage.setItem('genai-passport-prep:results','REAL')
  assert.deepEqual(ensurePassportProductionBaseline(null,storage),{ok:true,initialized:false})
  assert.equal(storage.getItem('genai-passport-prep:results'),'REAL')
})

test('embedded learner cleanup preserves other learner and outbox entries', () => {
  const storage=mockStorage()
  storage.setItem('genai-passport-prep:results:child-1','TEST')
  storage.setItem('genai-passport-prep:results:child-2','SIBLING')
  storage.setItem('genai-passport-prep:score-outbox-v1',JSON.stringify([
    {learnerId:'child-1',attemptId:'test'},
    {learnerId:'child-2',attemptId:'keep'},
  ]))
  assert.equal(ensurePassportProductionBaseline('child-1',storage).ok,true)
  assert.equal(storage.getItem('genai-passport-prep:results:child-1'),null)
  assert.equal(storage.getItem('genai-passport-prep:results:child-2'),'SIBLING')
  assert.deepEqual(JSON.parse(storage.getItem('genai-passport-prep:score-outbox-v1')),
    [{learnerId:'child-2',attemptId:'keep'}])
})

test('storage errors block a clean release instead of falsely succeeding', () => {
  const storage=mockStorage()
  const blocked={...storage,removeItem:()=>{throw new Error('denied')}}
  assert.equal(ensurePassportProductionBaseline(null,blocked).ok,false)
  assert.equal(storage.getItem(passportLiveMarkerKey(null)),null)
})
