import React, { useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Question from './Question'

export default function ProgressRow ({ clickable, questions }) {
  // TODO: use question status to highlight each question tab as you progress
  const variants = {
    undefined: 'bg-secondary',
    answered: 'bg-primary',
    correct: 'bg-success',
    incorrect: 'bg-danger'
  }

  const setInitialAnswers = () => new Array(questions.length).fill(undefined)

  const [selected, setSelected] = useState(0)
  const [answers, setAnswers] = useState(setInitialAnswers)

  const onSelect = (k) => {
    if (clickable) {
      setSelected(k)
    }
  }

  return (
    <Tabs justify activeKey={selected} onSelect={onSelect}>
      {answers.map((item, index) => {
        let variant = item === undefined ? variants.undefined : variants[item.status]
        return (
          <Tab
            key={index}
            eventKey={index}
            title={'Question ' + (index + 1)}
            disabled={!clickable}
          >
            <br/>
            <Question
              question={questions[index]}
              questionNumber={index + 1}
              state={item}
            />
          </Tab>
        )
      })}
    </Tabs>
  )
}