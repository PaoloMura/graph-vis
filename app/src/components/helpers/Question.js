import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Graph from './Graph'
import ASelectPath from '../answers/ASelectPath'
import ATextInput from '../answers/ATextInput'
import AVertexSet from '../answers/AVertexSet'
import AMultipleChoice from '../answers/AMultipleChoice'
import settings from '../../data/settings.json'

export default function Question ({ question, onNext }) {

  const answerComponents = {
    'QSelectPath': <ASelectPath question={question} onNext={onNext}/>,
    'QVertexSet': <AVertexSet question={question} onNext={onNext}/>,
    'QTextInput': <ATextInput question={question} onNext={onNext}/>,
    'QMultipleChoice': <AMultipleChoice question={question} onNext={onNext}/>,
  }

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
                      settings={settings[question.type]}
                      data={graph}
                    />
                  </Col>
                ))
              }
            </Row>
          </Col>
          <Col>
            {answerComponents[question.type]}
          </Col>
        </Row>
      </Container>
    </div>
  )
}