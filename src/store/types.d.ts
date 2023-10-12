export interface Question {
  id: number
  question: string
  answers: string[]
  correctAnswer: number
  userSelectedAnswer?: undefined
  isCorrectUserAnswer?: boolean

}
