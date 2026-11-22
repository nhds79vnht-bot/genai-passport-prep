/**
 * Production-only, one-time cleanup of pre-release passport study records.
 * These are ONLY keys owned by the passport app on this origin.
 * The marker prevents deletion of real scores after the first launch.
 * Do not call this in previews or automated tests.
 */
export const PASSPORT_LIVE_BASELINE = '2026-11-21-initial-production-v1'

export function passportLiveMarkerKey(learnerScope: string | null): string {
  return 'genai-passport-prep:live-baseline:' + (learnerScope ?? 'adult')
}

export type PassportBaselineResult =
  | {ok: true; initialized: boolean}
  | {ok: false; reason: string}

export function ensurePassportProductionBaseline(
  learnerScope: string | null,
  storage: Pick<Storage, 'getItem' | 'removeItem' | 'setItem'> = localStorage,
): PassportBaselineResult {
  const marker = passportLiveMarkerKey(learnerScope)
  try {
    if (storage.getItem(marker) === PASSPORT_LIVE_BASELINE) {
      return {ok:true,initialized:false}
    }
  } catch {
    return {ok:false,reason:'ブラウザの保存領域にアクセスできません。'}
  }

  const suffix = learnerScope ? ':' + learnerScope : ''
  const keys = [
    'genai-passport-prep:progress-v1' + suffix,
    'genai-passport-prep:results' + suffix,
    'genai-passport-prep:stats' + suffix,
    'genai-passport-prep:wrong-review-v1' + suffix,
  ]
  const outboxKey = 'genai-passport-prep:score-outbox-v1'
  try {
    for (const key of keys) {
      storage.removeItem(key)
      if (storage.getItem(key) !== null) throw new Error('test key remains')
    }

    // Score outbox is shared by embedded learners. Only discard this learner's
    // old candidates; the standalone adult baseline clears the whole passport
    // outbox, never other applications or family settings.
    if (learnerScope) {
      const raw = storage.getItem(outboxKey)
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw)
        if (!Array.isArray(parsed)) throw new Error('outbox malformed')
        const retained = parsed.filter((entry: unknown) =>
          !entry || typeof entry !== 'object' ||
          (entry as {learnerId?: string}).learnerId !== learnerScope)
        storage.setItem(outboxKey, JSON.stringify(retained))
        if (storage.getItem(outboxKey) !== JSON.stringify(retained)) throw new Error('outbox write failed')
      }
    } else {
      storage.removeItem(outboxKey)
      if (storage.getItem(outboxKey) !== null) throw new Error('outbox remains')
    }

    storage.setItem(marker, PASSPORT_LIVE_BASELINE)
    if (storage.getItem(marker) !== PASSPORT_LIVE_BASELINE) throw new Error('marker not stored')
  } catch {
    return {ok:false,reason:'生成AIパスポートの検証データを完全に初期化できませんでした。保存設定を確認してください。'}
  }
  return {ok:true,initialized:true}
}
