import React from 'react'
import Question from './Question'
import settings from '../data/settings.json'
import question from '../sample_question.json'
import topic from '../sample_topic.json'

function Student () {
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
    <div className={'GraphArea'}>
      <h1>Topic: {topic.name}</h1>
      <Question
        question={question}
        number={1}
        graphSettings={graphSettings}
        graphControls={graphControls}
      />
      {/*<h2>Settings:</h2>*/}
      {/*<Settings settings={settings}/>*/}
      {/*<h2>Controls:</h2>*/}
      {/*<Controls controls={controls} actions={actions}/>*/}
    </div>
  )
}

export default Student
