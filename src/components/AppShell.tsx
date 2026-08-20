import type { ReactNode } from 'react'
import { getDailyBackground } from '../lib/dailyBackground'

type Props = {
  children: ReactNode
}

export function AppShell({ children }: Props) {
  const bg = getDailyBackground()

  return (
    <div className="app-shell">
      <div
        className="app-bg"
        style={{ backgroundImage: `url("${bg.url}")` }}
        aria-hidden
      />
      <div className="app-bg-overlay" aria-hidden />
      <div className="app-bg-grid" aria-hidden />
      <div className="app-content">
        <div className="daily-bg-badge" title="今日の背景">
          <span className="daily-bg-dot" />
          TODAY · {bg.label}
        </div>
        {children}
      </div>
    </div>
  )
}
