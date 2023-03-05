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
  // let editingEdge = null
  let layout = null
  let cy = null

  let actions = {
    'createNode': createNode,
    'createEdge': createEdge,
    'unselect': unselect,
    'remove': remove,
    'highlightVertex': highlightVertex,
    'highlightEdge': highlightEdge
  }

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

  // HELPER FUNCTIONS

  function nextVertexLabel () {
    // Sort the existing vertex labels in order
    let vertices = cy.$('node')
      .map(x => parseInt(x.id()))
      .sort((a, b) => a - b)
    // Find the smallest available integer >= 0
    let prev = -1
    for (let v of vertices) {
      if (v === prev + 1) prev = v
      else break
    }
    return prev + 1
  }

  function addEdge (v1, v2) {
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

  function updateLayout () {
    if (layout != null) layout.stop()
    layout = cy.layout(layoutOptions)
    layout.start()
  }

  function isPositional (event) {
    return ['tap', 'cxttap'].includes(event.type)
  }

  // INITIALISATION

  function initialise (data, fromFile) {
    cy.remove(cy.nodes())
    if (fromFile) {
      cy.json(data)
      cy.autoungrabify(settings.autoungrabify)
      cy.userPanningEnabled(settings.panning)
      cy.boxSelectionEnabled(settings.boxSelection)
      // settings.selectifyNodes ? cy.nodes().selectify() : cy.nodes().unselectify()
      settings.selectifyEdges ? cy.edges().selectify() : cy.edges().unselectify()
    } else {
      cy.add([
        { data: { id: '0' } },
        { data: { id: '1' } },
        {
          data: {
            id: '01',
            source: '0',
            target: '1',
            weight: '5'
          },
          classes: edgeClasses
        }
      ])
    }
    updateLayout()
  }

  // ACTIONS

  function createNode (event) {
    let label = nextVertexLabel()
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
    // settings.selectifyNodes ? cy.nodes().selectify() : cy.nodes().unselectify()
    updateLayout()
  }

  function unselect (event) {
    let elems = cy.$(':selected')
    for (let elem of elems) {
      elem.unselect()
    }
  }

  function createEdge (event) {
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
      if (!(cy.$(`[source = "${v1}"][target = "${v2}"]`).length)) addEdge(v1, v2)
    } else {
      if (!(cy.$(`[source = "${v1}"][target = "${v2}"], [source = "${v2}"][target = "${v1}"]`).length)) {
        addEdge(v1, v2)
      }
    }

    // Set whether the edges are selectable
    settings.selectifyEdges ? cy.edges().selectify() : cy.edges().unselectify()
  }

  function remove (event) {
    let selected = cy.$(':selected')
    if (selected[0] != null) cy.remove(selected[0])
  }

  function highlightVertex (vid, highlight) {
    let vertex = cy.nodes('[id = "' + vid + '"]')[0]
    if (highlight) vertex.addClass('highlight')
    else vertex.removeClass('highlight')
  }

  function highlightEdge (v1, v2, highlight) {
    let edge
    if (settings.directed) {
      edge = cy.edges('[source = "' + v1 + '"][target = "' + v2 + '"]')[0]
    } else {
      edge = cy.edges('[source = "' + v1 + '"][target = "' + v2 + '"], [source = "' + v2 + '"][target = "' + v1 + '"]')[0]
    }
    if (!(edge === undefined)) {
      if (highlight) edge.addClass('highlight')
      else edge.removeClass('highlight')
    }
  }

  // TODO: finish adding support for editing weights
  // function editWeight (event) {
  //   if (!settings.weighted) return
  //   if (editingEdge === null) {
  //     let selected = cy.$('edge:selected')
  //     if (selected[0] != null) editingEdge = selected[0]
  //   } else if (editingEdge.data('weight') === '') {
  //     editingEdge.data('weight', '0')
  //   }
  // }
  //
  // function appendNumber (event) {
  //   if (editingEdge != null) {
  //     let value = editingEdge.data('weight')
  //     if (value === '0') editingEdge.data('weight', event.key)
  //     else editingEdge.data('weight', value + event.key)
  //   }
  // }

  // LISTENERS

  function setListeners () {
    // Left-click on the background
    cy.on('tap', (event) => { if (event.target === cy) props.controls['tap_bg'](actions, event) })

    // Left-click on a node
    cy.on('tap', 'node', (event) => { props.controls['tap_node'](actions, event) })

    // Left-click on an edge
    cy.on('tap', 'edge', (event) => { props.controls['tap_edge'](actions, event) })

    // Right-click on the background
    cy.on('cxttap', (event) => { if (event.target === cy) props.controls['cxttap_bg'](event) })

    // Right-click on a node
    cy.on('cxttap', 'node', (event) => { props.controls['cxttap_node'](actions, event) })

    // Right-click on an edge
    cy.on('cxttap', 'edge', (event) => { props.controls['cxttap_edge'](actions, event) })

    // Handle key presses
    // TODO: I think I can fix this double problem by turning it into an effect that only gets called on mount
    // TODO: It should return a function that removes the event listener.
    const handleKeyDown = (event) => {
      props.controls['keypress'](actions, event)
    }
    document.addEventListener('keydown', handleKeyDown, true)
  }

  return (
    <>
      <CytoscapeComponent
        id={'cy'}
        // elements={elements}
        layout={initialLayoutOptions}
        stylesheet={cyStyle}
        cy={(c) => {
          cy = c
          initialise(props.data, true)
          setListeners()
        }}
      />
    </>
  )
}

export default Graph
