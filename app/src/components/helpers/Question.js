import React from 'react'
import Graph from '../../Graph'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Output from './Output'
import question from '../../sample_question.json'

function Question (props) {
  // const [test, setTest] = useState([])
  let output
  let controls
  let settings

  function noop (actions, event) {
    // pass
  }

  function SelectVertex (actions, event) {
    let vertex = event.target.id()
    output.push(vertex)
    // setTest(prev => [...prev, vertex])
    // actions['highlightVertex'](vertex, true)
    if (output.length > 1) {
      let v1 = output[output.length - 2]
      let v2 = output[output.length - 1]
      actions['highlightEdge'](v1, v2, true)
    }
  }

  function UnselectVertex (actions, event) {
    if (event.key === 'Backspace') {
      let vertex = output.pop()
      console.log(vertex)
      console.log(output)
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
    'keypress': UnselectVertex
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

  switch (props.question.q_type) {
    case 'QSelectPath':
      output = []
      controls = qSelectPathControls
      settings = qSelectPathSettings
      break
    default:
      output = []
      controls = qSelectPathControls
      settings = qSelectPathSettings
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs={9}>
            <Graph
              settings={settings}
              controls={controls}
              data={props.question.graph}
            />
          </Col>
          <Col>
            <Output
              number={1}
              question={question}
              output={output}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Question