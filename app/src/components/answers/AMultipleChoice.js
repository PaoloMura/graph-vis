import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { getSolution } from '../utilities/http'
import Description from '../helpers/Description'

export default function AMultipleChoice ({ question, progress, onSubmit, onNext }) {
  const [answer, setAnswer] = useState(() => {
    if (progress['answer'] !== undefined) return progress['answer']
    else return question['solutions'].map((txt, _) => [txt, false])
  })

  useEffect(() => {
    if (progress['answer'] !== undefined) setAnswer(progress['answer'])
    else setAnswer(question['solutions'].map((txt, _) => [txt, false]))
  }, [progress, question])

  const handleSubmit = () => {
    // Determine whether the answer is correct
    if (question.settings.feedback) {
      getSolution(question, answer, onSubmit)
    } else {
      for (let i = 0; i < question['solutions'].length; i++) {
        if (question['solutions'][i][1] !== answer[i][1]) {
          onSubmit(answer, 'incorrect', '')
          return
        }
      }
      onSubmit(answer, 'correct', '')
    }
  }

  const handleChangeAnswer = (event, key) => {
    setAnswer(answer.map((ans, idx) => {
      if (question.settings.single_selection) {
        return idx === key ? [ans[0], !ans[1]] : [ans[0], false]
      } else {
        return idx === key ? [ans[0], !ans[1]] : [ans[0], ans[1]]
      }
    }))
  }

  if (progress['status'] === 'unanswered') return (
    <div>
      <Description
        description={question['description']}
      />
      <Form>
        {
          answer.map((ans, idx) => {
            return (
              <Form.Check
                key={ans[0]}
                type={question.settings.single_selection ? 'radio' : 'checkbox'}
                label={ans[0]}
                checked={ans[1]}
                onChange={(e) => handleChangeAnswer(e, idx)}
              />
            )
          })
        }
        <br/>
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  )

  else return (
    <div>
      <Description description={question.description}/>
      <Form>
        {
          answer.map(ans => {
            return (
              <Form.Check
                key={ans[0]}
                disabled
                readOnly
                type={question['settings']['single_selection'] ? 'radio' : 'checkbox'}
                label={ans[0]}
                checked={ans[1]}
              />
            )
          })
        }
        <p>
          {progress['status'] === 'correct' ? 'Correct!' : 'Incorrect.'}
        </p>
        <br/>
        {progress['feedback']}
        <br/>
        <Button variant="primary" onClick={onNext}>Next</Button>
      </Form>
    </div>
  )
}