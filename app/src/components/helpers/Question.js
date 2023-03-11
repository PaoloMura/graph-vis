import React, { useEffect, useRef, useState } from 'react'
import Graph from './Graph'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Answer from './Answer'
import Solution from './Solution'

function Question ({ question, questionNumber, progress, setProgress, nextQuestion }) {
  const setInitialAnswer = () => {
    switch (question.type) {
      case 'QSelectPath':
        return []
      default:
        return []
    }
  }

  const [answer, setAnswer] = useState(setInitialAnswer)
  const [inProgress, setInProgress] = useState(true)
  const [explanation, setExplanation] = useState('')

  const qSelectPathControls = useRef({
    'tap_bg': addVertex,
    'tap_node': SelectVertex,
    'tap_edge': noop,
    'cxttap_bg': noop,
    'cxttap_node': noop,
    'cxttap_edge': noop,
    'keypress': noop
  })

  const qSelectPathSettings = useRef({
    'autoungrabify': true,
    'selectifyNodes': true,
    'selectifyEdges': false,
    'panning': false,
    'boxSelection': false,
    'weighted': false,
    'directed': false,
    'loops': false
  })

  const inputAnswer = useRef(false)
  const controls = useRef(qSelectPathControls.current)
  const settings = useRef(qSelectPathSettings.current)

  function noop (actions, event) {
    // pass
  }

  function SelectVertex (actions, event) {
    let vertex = parseInt(event.target.id(), 10)
    setAnswer([...answer, vertex])
    // setTest(prev => [...prev, vertex])
    actions['highlightVertex'](vertex, true)
    if (answer.length > 1) {
      let v1 = answer[answer.length - 2]
      let v2 = answer[answer.length - 1]
      actions['highlightEdge'](v1, v2, true)
    }
  }

  function UnselectVertex (actions, event) {
    if (event.key === 'Backspace') {
      setAnswer(answer.slice(0, -1))
      // TODO: fix the double event problem with key presses
    }
  }

  function addVertex (actions, event) {
    actions['createNode'](event)
  }

  useEffect(() => {
    switch (question.type) {
      case 'QSelectPath':
        controls.current = qSelectPathControls
        settings.current = qSelectPathSettings
        inputAnswer.current = false
        break
      default:
        controls.current = qSelectPathControls
        settings.current = qSelectPathSettings
        inputAnswer.current = false
    }
  })

  const updateAnswer = (event) => setAnswer(event.target.value)

  const submitAnswer = () => {
    // TODO: change how we process answers depending on the settings
    // Determine whether the answer is correct
    let ans = answer.toString()
    let result = 'incorrect'
    for (let sol of question.solutions) {
      if (sol.toString() === ans) {
        result = 'correct'
        break
      }
    }
    // Update your progress status
    setProgress(answer, result)
    // Display the result screen
    setInProgress(false)
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs={9}>
            <Graph
              settings={settings.current}
              controls={controls.current}
              data={question.graph}
            />
          </Col>
          <Col>
            <h2>Question {questionNumber}</h2>
            {
              inProgress &&
              <Answer
                message={question.description}
                answer={answer}
                setAnswer={updateAnswer}
                editable={inputAnswer}
                onSubmit={submitAnswer}
              />
            }
            {
              !inProgress &&
              <Solution
                success={progress[questionNumber - 1].status === 'correct'}
                message={explanation}
                onSubmit={nextQuestion}
              />
            }
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Question