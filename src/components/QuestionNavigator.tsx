type Props = {
  total: number
  currentIndex: number
  answers: Record<string, number[]>
  questionIds: string[]
  onJump: (index: number) => void
  showUnansweredOnly: boolean
  onToggleUnanswered: () => void
}

export function QuestionNavigator({
  total,
  currentIndex,
  answers,
  questionIds,
  onJump,
  showUnansweredOnly,
  onToggleUnanswered,
}: Props) {
  const indices = Array.from({ length: total }, (_, index) => index).filter((index) => {
    if (!showUnansweredOnly) return true
    const id = questionIds[index]
    return (answers[id] ?? []).length === 0
  })

  return (
    <section className="card navigator-card">
      <div className="navigator-head">
        <strong>問題ジャンプ</strong>
        <button type="button" className="link-button" onClick={onToggleUnanswered}>
          {showUnansweredOnly ? '全問表示' : '未回答のみ'}
        </button>
      </div>
      <div className="question-grid">
        {indices.map((index) => {
          const id = questionIds[index]
          const answered = (answers[id] ?? []).length > 0
          const active = index === currentIndex
          return (
            <button
              key={id}
              type="button"
              className={[
                'q-chip',
                active ? 'active' : '',
                answered ? 'answered' : 'unanswered',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onJump(index)}
            >
              {index + 1}
            </button>
          )
        })}
      </div>
    </section>
  )
}
