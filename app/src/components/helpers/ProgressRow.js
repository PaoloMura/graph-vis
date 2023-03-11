import React, { useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Question from './Question'

export default function ProgressRow ({ topicName, clickable, questions }) {
  // TODO: use question status to highlight each question tab as you progress

  const setInitialAnswers = () => new Array(questions.length).fill({ answer: null, status: 'unanswered' })

  const [selected, setSelected] = useState(0)
  const [progress, setProgress] = useState(setInitialAnswers)

  const onSelect = (k) => {
    if (clickable) {
      setSelected(k)
    }
  }

  const setCurrentProgress = (answer, status) => {
    setProgress(progress.map((item, index) => {
      return index === selected ? { answer: answer, status: status } : item
    }))
  }

  const nextQuestion = () => {
    if (selected + 1 < progress.length) {
      setSelected(selected + 1)
    }
  }

  console.log('progress row')

  return (
    <div>
      <h1>Topic: {topicName}</h1>
      <Tabs justify activeKey={selected} onSelect={onSelect}>
        {progress.map((item, index) => (
            <Tab
              key={index}
              eventKey={index}
              title={'Question ' + (index + 1)}
              disabled={!clickable}
              mountOnEnter
              unmountOnExit
            >
              <br/>
              <Question
                question={questions[index]}
                questionNumber={index + 1}
                progress={progress}
                setProgress={setCurrentProgress}
                nextQuestion={nextQuestion}
              />
            </Tab>
          )
        )}
      </Tabs>
    </div>
  )
}