import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

export default function ATextInput ({ question, onNext }) {
  const [answer, setAnswer] = useState([])
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
    let ans = answer.toString()
    if (question.settings.feedback) getSolution()
    else {
      for (let sol of question.solutions) {
        if (sol.toString() === ans) {
          setCorrect(true)
          break
        }
      }
    }
    setSubmitted(true)
  }

  const onNextPress = () => {
    if (!submittted) onNext(answer, 'unanswered')
    else if (correct) onNext(answer, 'correct')
    else onNext(answer, 'incorrect')
  }

  const handleChangeAnswer = (event) => {
    setAnswer(event.target.value)
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
          <Form.Control
            value={answer}
            onChange={handleChangeAnswer}
          />
          <br/>
          <Button variant="primary" onClick={onSubmit}>Submit</Button>
        </Form>
      </div>
    )
  }
}