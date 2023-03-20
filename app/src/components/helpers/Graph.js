import React, { useEffect } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import cytoscape from 'cytoscape'
import '../../App.css'
import cyStyle from '../../cy-style.json'
import cola from 'cytoscape-cola'
import { triggerGraphEvent } from '../utilities/graph-events'

cytoscape.use(cola)

function Graph ({ settings, data }) {
  // Local variables
  // let editingEdge = null
  let layout = null
  let cy = null

  let edgeClasses = []
  console.log(data.elements.edges[0].data)
  if ('weight' in data.elements.edges[0].data) {
    console.log('weighted')
    edgeClasses.push('weighted')
  }
  if (data.directed) edgeClasses.push('directed')
  edgeClasses = edgeClasses.join(' ')

  // Cytoscape parameters
  const initialLayoutOptions = {
    name: 'cola',
    animate: false,
    infinite: false,
    edgeLength: 100,
    centerGraph: true,
    randomize: true,
    padding: 30
  }
  const layoutOptions = {
    name: 'cola',
    animate: false,
    infinite: false,
    edgeLength: 100,
    centerGraph: false,
    padding: 30
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

  function initialise (data) {
    cy.remove(cy.nodes())
    cy.json(data)
    cy.autoungrabify(settings.autoungrabify)
    cy.userPanningEnabled(settings.panning)
    cy.boxSelectionEnabled(settings.boxSelection)
    // settings.selectifyNodes ? cy.nodes().selectify() : cy.nodes().unselectify()
    settings.selectifyEdges ? cy.edges().selectify() : cy.edges().unselectify()
    for (let edge of cy.edges()) {
      edge.addClass(edgeClasses)
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
    if (data.directed) {
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

  useEffect(() => {
    // Trigger graph events
    cy.on('tap', (event) => { if (event.target === cy) triggerGraphEvent('tap_bg', event) })
    cy.on('tap', 'node', (event) => { triggerGraphEvent('tap_node', event.target.id()) })
    cy.on('tap', 'edge', (event) => {
      let params = {
        'source': parseInt(event.target._private.data.source),
        'target': parseInt(event.target._private.data.target)
      }
      triggerGraphEvent('tap_edge', params)
    })
    cy.on('cxttap', (event) => { if (event.target === cy) triggerGraphEvent('cxttap_bg', event) })
    cy.on('cxttap', 'node', (event) => { triggerGraphEvent('cxttap_node', event) })
    cy.on('cxttap', 'edge', (event) => { triggerGraphEvent('cxttap_edge', event) })

    function highlightVertex (event) {
      let vertex = cy.nodes('[id = "' + event.detail.vertex + '"]')[0]
      if (event.detail.highlight) vertex.addClass('highlight')
      else vertex.removeClass('highlight')
    }

    function highlightEdge (event) {
      let edge
      if (data.directed) {
        edge = cy.edges('[source = "' + event.detail.v1 + '"][target = "' + event.detail.v2 + '"]')[0]
      } else {
        edge = cy.edges('[source = "' + event.detail.v1 + '"][target = "' + event.detail.v2 + '"], [source = "' + event.detail.v2 + '"][target = "' + event.detail.v1 + '"]')[0]
      }
      if (!(edge === undefined)) {
        if (event.detail.highlight) edge.addClass('highlight')
        else edge.removeClass('highlight')
      }
    }

    // Subscribe to action events
    document.addEventListener('highlightVertex', highlightVertex)
    document.addEventListener('highlightEdge', highlightEdge)

    return () => {
      // Cleanup is very important
      cy.removeAllListeners()
      document.removeEventListener('highlightVertex', highlightVertex)
      document.removeEventListener('highlightEdge', highlightEdge)
    }
  }, [cy, data.directed, settings])

  return (
    <>
      <CytoscapeComponent
        id={'cy'}
        // elements={elements}
        layout={initialLayoutOptions}
        stylesheet={cyStyle}
        cy={(c) => {
          cy = c
          initialise(data)
          // setListeners()
        }}
      />
    </>
  )
}

export default Graph
