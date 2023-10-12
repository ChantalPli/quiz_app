import { Button } from '@mui/material'
import { useQuestionsStore } from './store/questions'

export const Footer = () => {
  const questions = useQuestionsStore(state => state.questions)
  const reset = useQuestionsStore(state => state.reset)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question
    if (userSelectedAnswer == null) unanswered++
    else if (userSelectedAnswer === correctAnswer) correct++
    else incorrect++
  })

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} Correct - ❌ ${incorrect} Incorrect - ❓ ${unanswered} Unanswered`}</strong>

      <div style={{marginTop: '16px'}}>
      <Button onClick={()=> reset()}>
        Reset
      </Button>
      </div>
    </footer>
  )
}
