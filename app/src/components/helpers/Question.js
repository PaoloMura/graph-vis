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
import AEdgeSet from '../answers/AEdgeSet'

export default function Question ({ question, progress, onSubmit, onNext }) {

  const answerComponents = {
    'QSelectPath': <ASelectPath question={question} progress={progress} onSubmit={onSubmit} onNext={onNext}/>,
    'QVertexSet': <AVertexSet question={question} progress={progress} onSubmit={onSubmit} onNext={onNext}/>,
    'QTextInput': <ATextInput question={question} progress={progress} onSubmit={onSubmit} onNext={onNext}/>,
    'QMultipleChoice': <AMultipleChoice question={question} progress={progress} onSubmit={onSubmit} onNext={onNext}/>,
    'QEdgeSet': <AEdgeSet question={question} progress={progress} onSubmit={onSubmit} onNext={onNext}/>
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs={7}>
            <Row className="Graph-area">
              {
                question.graphs.map((graph, idx) => (
                  <Col key={idx}>
                    <h2>G{idx + 1}</h2>
                    <Graph
                      myKey={idx}
                      settings={settings[question.type]}
                      user_settings={question.settings}
                      data={graph}
                    />
                  </Col>
                ))
              }
            </Row>
          </Col>
          <Col>
            {answerComponents[question['type']]}
          </Col>
        </Row>
      </Container>
    </div>
  )
}