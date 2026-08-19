import type { Question } from '../lib/types'
import {
  buildReviewSummary,
  formatCorrectChoices,
  formatSelectedChoices,
  getCorrectChoiceNotes,
  getWrongChoiceNotes,
} from '../lib/review'
import { isCorrect } from '../lib/scoring'

type Props = {
  question: Question
  selected: number[]
  showHeader?: boolean
}

export function ReviewCard({ question, selected, showHeader = true }: Props) {
  const correct = isCorrect(question, selected)

  return (
    <article className={`review-item ${correct ? 'review-correct' : 'review-wrong'}`}>
      {showHeader && (
        <>
          <div className="review-status">{correct ? '正解' : '不正解'}</div>
          <h3>{question.prompt}</h3>
          <p className="hint">
            {question.chapter} / {question.topic}
          </p>
        </>
      )}
      <p>
        <strong>あなたの回答:</strong> {formatSelectedChoices(question, selected)}
      </p>
      <p>
        <strong>正解:</strong> {formatCorrectChoices(question)}
      </p>
      <p>
        <strong>解説:</strong> {question.explanation}
      </p>
      <div className="note-block">
        <p>
          <strong>正解の理由</strong>
        </p>
        <ul>
          {getCorrectChoiceNotes(question).map((note) => (
            <li key={note.label}>
              <strong>{note.label}</strong> — {note.text}
            </li>
          ))}
        </ul>
      </div>
      {!correct && (
        <div className="note-block">
          <p>
            <strong>誤答の理由</strong>
          </p>
          <ul>
            {getWrongChoiceNotes(question).map((note) => (
              <li key={note.label}>
                <strong>{note.label}</strong> — {note.text}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p>
        <strong>参考書の見返し:</strong> {question.reviewSection}
      </p>
      <p>
        <strong>試験のひっかけ:</strong> {question.examTrap}
      </p>
      <p>
        <strong>復習メモ:</strong> {buildReviewSummary(question, selected)}
      </p>
    </article>
  )
}
