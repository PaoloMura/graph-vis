import React from 'react'
import Col from 'react-bootstrap/Col'
import Graph from '../helpers/Graph'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default function QuestionBase ({ question, answerComponent, graphSettings }) {
  return (
    <div>
      <Container>
        <Row>
          <Col xs={9}>
            <Row className="Graph-area">
              {
                question.graphs.map((graph, idx) => (
                  <Col key={idx}>
                    <h2>G{idx + 1}</h2>
                    <Graph
                      myKey={idx}
                      settings={graphSettings.current}
                      data={graph}
                    />
                  </Col>
                ))
              }
            </Row>
          </Col>
          <Col>
            {answerComponent}
          </Col>
        </Row>
      </Container>
    </div>
  )
}