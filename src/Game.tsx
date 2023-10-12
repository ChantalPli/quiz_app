import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './store/types'
import { Footer } from './Footer'

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  const getBackgroundColor = (index: number) => {
    const { userSelectedAnswer, correctAnswer } = info
    // user didn't select anything
    if (userSelectedAnswer == null) return 'transparent'
    // if use gave incorrect answer
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    // if this is the correct answer
    if (index === correctAnswer) return 'green'
    // if this is what the user selected but it's wrong
    if (index === userSelectedAnswer) return 'red'
    // if none of the above
    return 'transparent'
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'center', marginTop: 6 }}>
      <Typography variant='h5'>
        {info.question}
      </Typography>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ backgroundColor: getBackgroundColor(index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIos />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />

      <Footer />
    </>
  )
}
