import React from 'react'
import Graph from './Graph'
import './App.css'

function App () {

  let settings = {
    weighted: true,
    directed: true,
    loops: true
  }

  let controls = {
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
    },
    numericKeypress: 'appendNumber'
  }

  return (
    <div className={'Graph-area'}>
      <h1>React-Cytoscape Test</h1>
      <Graph settings={settings} controls={controls}></Graph>
      <h2>Controls:</h2>
      <ul>
        <li>Left click the background to create a vertex</li>
        <li>Left click a vertex/edge to select it</li>
        <li>Right click the background to deselect everything</li>
        <li>Press backspace to delete a selected vertex/edge</li>
        <li>
          To create an edge:
          <ol>
            <li>Select a vertex to be the source</li>
            <li>Right click another vertex to be the target</li>
          </ol>
        </li>
        <li>Click and drag the background/an edge to pan</li>
        <li>Scroll to zoom</li>
      </ul>
    </div>
  )
}

export default App
