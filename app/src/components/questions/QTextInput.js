import React, { useRef } from 'react'
import Col from 'react-bootstrap/Col'
import Graph from '../helpers/Graph'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ATextInput from '../answers/ATextInput'

export default function QTextInput ({ question, onNext }) {

  const settings = useRef({
    'autoungrabify': true,
    'selectifyNodes': false,
    'selectifyEdges': false,
    'panning': false,
    'boxSelection': false,
    'weighted': false,
    'directed': false,
    'loops': false
  })

  return (
    <div>
      <Container>
        <Row>
          <Col xs={9}>
            <Graph
              settings={settings.current}
              data={question.graph}
            />
          </Col>
          <Col>
            <ATextInput
              question={question}
              onNext={onNext}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}