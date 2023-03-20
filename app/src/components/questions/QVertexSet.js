import React, { useRef } from 'react'
import Col from 'react-bootstrap/Col'
import Graph from '../helpers/Graph'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import AVertexSet from '../answers/AVertexSet'

export default function QVertexSet ({ question, onNext }) {

  const settings = useRef({
    'autoungrabify': true,
    'selectifyNodes': true,
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
            {
              question.graphs.map((graph, idx) => (
                <Graph
                  key={idx}
                  myKey={idx}
                  settings={settings.current}
                  data={graph}
                />
              ))
            }
          </Col>
          <Col>
            <AVertexSet question={question} onNext={onNext}/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}