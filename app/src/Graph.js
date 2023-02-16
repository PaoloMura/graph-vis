import React from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import cytoscape from 'cytoscape'
import './App.css'
import cyStyle from './cy-style.json'
import cola from 'cytoscape-cola'

cytoscape.use(cola)

function Graph (props) {
  // Local variables
  let settings = props.settings
  let controls = props.controls
  let editingEdge = null
  let layout = null

  let edgeClasses = []
  if (settings.weighted) edgeClasses.push('weighted')
  if (settings.directed) edgeClasses.push('directed')
  edgeClasses = edgeClasses.join(' ')

  // Cytoscape parameters
  const initialLayoutOptions = {
    name: 'cola',
    animate: true,
    infinite: true,
    edgeLength: 100,
    centerGraph: true,
    randomize: true
  }
  const layoutOptions = {
    name: 'cola',
    animate: true,
    infinite: true,
    edgeLength: 100,
    centerGraph: false,
  }
  const elements = [
    { data: { id: 'v1' } },
    { data: { id: 'v2' } },
    {
      data: {
        id: 'e12',
        source: 'v1',
        target: 'v2',
        weight: '5'
      },
      classes: edgeClasses
    }
  ]

  // HELPER FUNCTIONS

  function nextVertexLabel (cy) {
    // Sort the existing vertex labels in order
    let vertices = cy.$('node')
      .map(x => parseInt(x.id().slice(1)))
      .sort((a, b) => a - b)
    // Find the smallest available integer > 0
    let prev = 0
    for (let v of vertices) {
      if (v === prev + 1) prev = v
      else break
    }
    return 'v' + (prev + 1)
  }

  function addEdge (cy, v1, v2) {
    cy.add({
      group: 'edges',
      data: {
        source: v1,
        target: v2,
        weight: '0'
      },
      classes: edgeClasses
    })
    if (layout != null) layout.stop()
    layout = cy.layout(layoutOptions)
    layout.start()
  }

  function updateLayout (cy) {
    if (layout != null) layout.stop()
    layout = cy.layout(layoutOptions)
    layout.start()
  }

  function isPositional (event) {
    return ['tap', 'cxttap'].includes(event.type)
  }

  // ACTIONS

  function noop (cy, event) {
    // Pass
  }

  function createNode (cy, event) {
    let label = nextVertexLabel(cy)
    if (isPositional(event)) {
      cy.add({
        group: 'nodes',
        position: { x: event.position.x, y: event.position.y },
        data: { id: label }
      })
    } else {
      cy.add({
        group: 'nodes',
        data: { id: label }
      })
    }
    updateLayout(cy)
  }

  function unselect (cy, event) {
    let elems = cy.$(':selected')
    for (let elem of elems) {
      elem.unselect()
    }
  }

  function createEdge (cy, event) {
    // Find the previously selected node
    let selected = cy.$('node:selected')
    if (selected.size() === 0) return
    let v1 = selected[0].id()

    // Find the currently selected node
    let v2 = event.target.id()

    // We need to check if loops are allowed
    if (v1 === v2 && !settings.loops) return

    // We need to check that there isn't an existing edge here already
    if (settings.directed) {
      if (!(cy.$(`[source = "${v1}"][target = "${v2}"]`).length)) addEdge(cy, v1, v2)
    } else {
      if (!(cy.$(`[source = "${v1}"][target = "${v2}"], [source = "${v2}"][target = "${v1}"]`).length)) {
        addEdge(cy, v1, v2)
      }
    }
  }

  function remove (cy, event) {
    let selected = cy.$(':selected')
    if (selected[0] != null) cy.remove(selected[0])
  }

  // TODO: finish adding support for editing weights
  function editWeight (cy, event) {
    if (!settings.weighted) return
    if (editingEdge === null) {
      let selected = cy.$('edge:selected')
      if (selected[0] != null) editingEdge = selected[0]
    } else if (editingEdge.data('weight') === '') {
      editingEdge.data('weight', '0')
    }
  }

  function appendNumber (cy, event) {
    if (editingEdge != null) {
      let value = editingEdge.data('weight')
      if (value === '0') editingEdge.data('weight', event.key)
      else editingEdge.data('weight', value + event.key)
    }
  }

  let actions = {
    'noop': noop,
    'createNode': createNode,
    'unselect': unselect,
    'createEdge': createEdge,
    'remove': remove,
    'editWeight': editWeight,
    'appendNumber': appendNumber
  }

  // LISTENERS

  function setListeners (cy) {
    // Left-click on the background
    cy.on('tap', (event) => { if (event.target === cy) actions[controls.tap.background](cy, event) })

    // Left-click on a node
    cy.on('tap', 'node', (event) => { actions[controls.tap.node](cy, event) })

    // Left-click on an edge
    cy.on('tap', 'edge', (event) => { actions[controls.tap.edge](cy, event) })

    // Right-click on the background
    cy.on('cxttap', (event) => { if (event.target === cy) actions[controls.cxttap.background](cy, event) })

    // Right-click on a node
    cy.on('cxttap', 'node', (event) => { actions[controls.cxttap.node](cy, event) })

    // Right-click on an edge
    cy.on('cxttap', 'edge', (event) => { actions[controls.cxttap.edge](cy, event) })

    // Handle key presses
    const handleKeyDown = (e) => {
      if (e.key in controls.keypress) actions[controls.keypress[e.key]](cy, e)
      else if ('0' <= e.key <= '9') actions[controls.numericKeypress](cy, e)
    }
    document.addEventListener('keydown', handleKeyDown, true)
  }

  return (
    <>
      <CytoscapeComponent
        id={'cy'}
        elements={elements}
        layout={initialLayoutOptions}
        stylesheet={cyStyle}
        cy={(cy) => { setListeners(cy) }}
      />
    </>
  )
}

export default Graph
