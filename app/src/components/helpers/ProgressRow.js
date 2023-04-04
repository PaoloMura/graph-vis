import React, { useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Question from './Question'
import FinishedModal from '../modals/FinishedModal'

export default function ProgressRow ({ topicName, settings, questions }) {
  // TODO: use question status to highlight each question tab as you progress

  const setInitialAnswers = () => new Array(questions.length).fill(
    {
      answer: undefined,
      status: 'unanswered'
    })

  const [selected, setSelected] = useState(0)
  const [progress, setProgress] = useState(setInitialAnswers)
  const [showFinished, setShowFinished] = useState(false)

  const onSelect = (k) => {
    if (!settings['linear']) {
      setSelected(parseInt(k))
    }
  }

  const handleSubmit = (answer, status, feedback) => {
    setProgress(progress.map((item, index) => {
      return index === selected ? { answer: answer, status: status, feedback: feedback } : item
    }))
    if (settings['feedback'] === 'each') return
    if (selected + 1 < progress.length) {
      setSelected(selected + 1)
    } else {
      setShowFinished(true)
    }
  }

  const handleNext = () => {
    if (selected + 1 < progress.length) {
      setSelected(selected + 1)
    } else {
      setShowFinished(true)
    }
  }

  return (
    <div>
      <h1>Topic: {topicName}</h1>
      <Tabs justify activeKey={selected} onSelect={onSelect}>
        {progress.map((item, index) => (
            <Tab
              key={index}
              eventKey={index}
              title={'Question ' + (index + 1)}
              disabled={settings['linear']}
              mountOnEnter
              unmountOnExit
            >
              <br/>
              <Question
                question={questions[index]}
                progress={progress[index]}
                onSubmit={handleSubmit}
                onNext={handleNext}
              />
            </Tab>
          )
        )}
      </Tabs>
      {
        showFinished &&
        <FinishedModal
          showModal={showFinished}
          progress={progress}
        />
      }
    </div>
  )
}