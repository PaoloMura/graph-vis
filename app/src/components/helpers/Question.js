import React, { useState } from 'react'
import Graph from './Graph'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Output from './Output'

function Question ({ question, questionNumber, setState }) {
  const setInitialAnswer = () => {
    switch (question.type) {
      case 'QSelectPath':
        return []
      default:
        return []
    }
  }

  const [answer, setAnswer] = useState(setInitialAnswer)
  let inputAnswer = false
  let controls
  let settings

  function noop (actions, event) {
    // pass
  }

  function SelectVertex (actions, event) {
    let vertex = event.target.id()
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

  const qSelectPathControls = {
    'tap_bg': noop,
    'tap_node': SelectVertex,
    'tap_edge': noop,
    'cxttap_bg': noop,
    'cxttap_node': noop,
    'cxttap_edge': noop,
    'keypress': noop
  }

  const qSelectPathSettings = {
    'autoungrabify': true,
    'selectifyNodes': true,
    'selectifyEdges': false,
    'panning': false,
    'boxSelection': false,
    'weighted': false,
    'directed': false,
    'loops': false
  }

  switch (question.type) {
    case 'QSelectPath':
      controls = qSelectPathControls
      settings = qSelectPathSettings
      inputAnswer = false
      break
    default:
      controls = qSelectPathControls
      settings = qSelectPathSettings
      inputAnswer = false
  }

  const submitAnswer = () => {
    setState({
      value: answer,
      status: question.solutions.includes(answer) ? 'correct' : 'incorrect'
    })
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs={9}>
            <Graph
              settings={settings}
              controls={controls}
              data={question.graph}
            />
          </Col>
          <Col>
            <Output
              number={questionNumber}
              message={question.description}
              answer={answer}
              editable={inputAnswer}
              onSubmit={submitAnswer}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Question