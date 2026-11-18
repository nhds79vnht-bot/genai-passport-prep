/** Portrait backgrounds — add more files to public/backgrounds/ to extend rotation. */
export const BACKGROUND_FILES = [
  'bg-01-cyberpunk-slum.webp',
  'bg-02-solarpunk-city.webp',
  'bg-03-train-station.webp',
  'bg-04-rice-field.webp',
  'bg-05-suburban-hill.webp',
  'bg-06-robot-forest.webp',
  'bg-07-goldfish-canal.webp',
  'bg-08-coastal-town.webp',
  'bg-09-teahouse-railway.webp',
  'bg-10-glass-underwater.webp',
  'bg-11-overgrown-ruins.webp',
  'bg-12-village-spaceships.webp',
  'bg-13-robot-lagoon.webp',
  'bg-14-neon-alley.webp',
] as const

export type DailyBackground = {
  url: string
  label: string
  dayIndex: number
}

const LABELS: Record<(typeof BACKGROUND_FILES)[number], string> = {
  'bg-01-cyberpunk-slum.webp': 'ネオン・スラム街',
  'bg-02-solarpunk-city.webp': '緑の未来都市',
  'bg-03-train-station.webp': '夏の無人駅',
  'bg-04-rice-field.webp': '田んぼの道',
  'bg-05-suburban-hill.webp': '坂道と入道雲',
  'bg-06-robot-forest.webp': '森のロボ',
  'bg-07-goldfish-canal.webp': '金魚の運河',
  'bg-08-coastal-town.webp': '海辺の商店街',
  'bg-09-teahouse-railway.webp': '線路沿いの茶屋',
  'bg-10-glass-underwater.webp': '水中のガラス街',
  'bg-11-overgrown-ruins.webp': '緑に還る廃墟',
  'bg-12-village-spaceships.webp': '宇宙船の里',
  'bg-13-robot-lagoon.webp': '花咲くラグーン',
  'bg-14-neon-alley.webp': 'ネオン路地',
}

function dayOfYear(date: Date): number {
  const start = Date.UTC(date.getFullYear(), 0, 0)
  const now = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  return Math.floor((now - start) / 86_400_000)
}

export function getDailyBackground(date = new Date()): DailyBackground {
  const index = dayOfYear(date) % BACKGROUND_FILES.length
  const file = BACKGROUND_FILES[index]
  const base = import.meta.env.BASE_URL
  return {
    url: `${base}backgrounds/${file}`,
    label: LABELS[file],
    dayIndex: index,
  }
}
