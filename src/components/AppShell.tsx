import { useState, type ReactNode } from 'react'
import { getDailyBackground } from '../lib/dailyBackground'

type Props = {
  children: ReactNode
}

export function AppShell({ children }: Props) {
  const bg = getDailyBackground()
  const [peek, setPeek] = useState(false)

  return (
    <div className={peek ? 'app-shell peek' : 'app-shell'}>
      <div
        className="app-bg"
        style={{ backgroundImage: `url("${bg.url}")` }}
        aria-hidden
      />
      <div className="app-bg-overlay" aria-hidden />
      <div className="app-content">
        <button
          type="button"
          className="daily-bg-badge"
          title={peek ? '学習画面に戻る' : '背景を大きく見る'}
          aria-pressed={peek}
          onClick={() => setPeek((prev) => !prev)}
        >
          <span className="daily-bg-dot" />
          {peek ? 'CLOSE · 学習に戻る' : `TODAY · ${bg.label}`}
        </button>
        {children}
      </div>
    </div>
  )
}
