import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

export default function AMultipleChoice ({ question, onNext }) {
  const setInitialAnswer = () => {
    return question.solutions.map((txt, _) => [txt, false])
  }

  const [answer, setAnswer] = useState(setInitialAnswer)
  const [submittted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [feedback, setFeedback] = useState('')

  const getSolution = () => {
    axios({
      method: 'POST',
      url: '/api/feedback/' + question.file + '/' + question.class,
      data: {
        answer: answer,
        graph: question.graph
      }
    }).then((response) => {
      const res = response.data
      setCorrect(res.result)
      setFeedback(res.feedback)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.headers)
      }
    })
  }

  const onSubmit = () => {
    // Determine whether the answer is correct
    if (question.settings.feedback) getSolution()
    else {
      for (let i = 0; i < question.solutions.length; i++) {
        if (question.solutions[i][1] !== answer[i][1]) {
          setCorrect(false)
          setSubmitted(true)
          return
        }
      }
    }
    setCorrect(true)
    setSubmitted(true)
  }

  const onNextPress = () => {
    if (!submittted) onNext(answer, 'unanswered')
    else if (correct) onNext(answer, 'correct')
    else onNext(answer, 'incorrect')
  }

  const handleChangeAnswer = (event, key) => {
    setAnswer(answer.map((ans, idx) => {
      return idx === key ? [ans[0], !ans[1]] : [ans[0], ans[1]]
    }))
  }

  if (submittted) {
    return (
      <div>
        {correct ? 'Correct!' : 'Incorrect'}
        <br/>
        {feedback}
        <br/>
        <Button variant={'primary'} onClick={onNextPress}>Next</Button>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Description</h3>
        <p>{question.description}</p>
        <br/>
        <Form>
          {
            answer.map((ans, idx) => {
              return (
                <Form.Check
                  key={ans[0]}
                  type="checkbox"
                  label={ans[0]}
                  checked={ans[1]}
                  onChange={(e) => handleChangeAnswer(e, idx)}
                />
              )
            })
          }
          <br/>
          <Button variant="primary" onClick={onSubmit}>Submit</Button>
        </Form>
      </div>
    )
  }
}