import React from 'react'
import './App.css'
import settings from './data/settings.json'
import controls from './data/controls.json'
import actions from './data/actions.json'
import Graph from './Graph'
import Settings from './components/Setting'
import Controls from './components/Controls'

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
      <h1>React-Cytoscape Test</h1>
      <Graph settings={graphSettings} controls={graphControls}></Graph>
      <h2>Settings:</h2>
      <Settings settings={settings}/>
      <h2>Controls:</h2>
      <Controls controls={controls} actions={actions}/>
    </div>
  )
}

export default App
