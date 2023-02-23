import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import settings from './data/settings.json'
import sampleGraph from './sample_graph.json'
import question from './sample_question.json'
import topic from './sample_topic.json'
import Graph from './Graph'
import Question from './components/Question'

function App () {
  let graphSettings = {}
  for (let item of settings) {
    graphSettings[item.setting] = item.default === 'true'
  }

  // let graph_controls = {}
  // for (let item of controls) {
  //   if (!(item.type in graph_controls)) {
  //     graph_controls[item.type] = {}
  //   }
  //   graph_controls[item.type][item.trigger] = 'noop'
  // }

  let graphControls = {
    tap: {
      background: 'createNode',
      node: 'noop',
      edge: 'noop'
    },
    cxttap: {
      background: 'unselect',
      node: 'createEdge',
      edge: 'noop'
    },
    keypress: {
      'Backspace': 'remove',
      'Enter': 'editWeight'
    }
  }

  return (
    <div className={'Graph-area'}>
      <h1>Topic: {topic.name}</h1>
      <Container>
        <Row>
          <Col xs={9}>
            <Graph
              settings={graphSettings}
              controls={graphControls}
              data={sampleGraph}
            />
          </Col>
          <Col>
            <Question
              number={1}
              message={question.description}
            />
          </Col>
        </Row>
      </Container>

      {/*<h2>Settings:</h2>*/}
      {/*<Settings settings={settings}/>*/}
      {/*<h2>Controls:</h2>*/}
      {/*<Controls controls={controls} actions={actions}/>*/}
    </div>
  )
}

export default App
