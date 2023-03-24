import React, { useEffect } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import cytoscape from 'cytoscape'
import '../../App.css'
import cyStyle from '../../cy-style.json'
import cola from 'cytoscape-cola'
import { triggerGraphEvent } from '../utilities/graph-events'
import layouts from '../../data/layouts.json'
import { setLabelPos, setLabelPosBipartite, setLabelPosCircle } from '../utilities/label-positioning'

cytoscape.use(cola)

function Graph ({ myKey, settings, user_settings, data }) {
  let layout = null
  let cy = null

  // Set graph style for directed and weighted graphs.
  let edgeClasses = []
  if (data.elements.edges.length > 0 && 'weight' in data.elements.edges[0].data) {
    edgeClasses.push('weighted')
  }
  if (data.directed) edgeClasses.push('directed')
  edgeClasses = edgeClasses.join(' ')

  // Set the graph layout
  const bipartitePosition = (node) => {
    return { 'col': node.data('bipartite') }
  }

  let layoutOptions
  if (user_settings.layout === 'bipartite') {
    layoutOptions = {
      ...layouts[user_settings.layout],
      position: bipartitePosition
    }
  } else {
    layoutOptions = layouts[user_settings.layout]
  }

  function updateLayout () {
    if (layout != null) layout.stop()
    layout = cy.layout(layoutOptions)
    layout.start()
  }

  function initialiseLabels () {
    const n_nodes = cy.nodes().length
    for (let node of cy.nodes()) {
      // Add a label to the node
      const label = user_settings.node_prefix + node.data('id')
      node.data('label', label)
      if (user_settings['label_style'] === 'math') {
        node.addClass('styled-label')
      }
      // Position the node according to the graph layout
      switch (user_settings.layout) {
        case 'circle':
          setLabelPosCircle(node, n_nodes)
          break
        case 'bipartite':
          setLabelPosBipartite(node)
          break
        default:
          setLabelPos(node)
      }
    }
  }

  // Initial graph setup.
  function initialise (data) {
    cy.remove(cy.nodes())
    cy.json(data)
    cy.autoungrabify(settings.autoungrabify)
    cy.userPanningEnabled(settings['panning'])
    cy.boxSelectionEnabled(settings['boxSelection'])
    // settings.selectifyNodes ? cy.nodes().selectify() : cy.nodes().unselectify()
    const edges = cy.edges()
    if (edges !== undefined) {
      settings['selectifyEdges'] ? edges.selectify() : edges.unselectify()
    }
    updateLayout()
    initialiseLabels()
    for (let edge of cy.edges()) {
      edge.addClass(edgeClasses)
    }
  }

  // Events and listeners (graph manipulation).
  useEffect(() => {
    // Trigger graph events
    cy.on('tap', (event) => {
      if (event.target === cy) {
        const params = {
          'x': event.position.x,
          'y': event.position.y
        }
        triggerGraphEvent('tap_bg', params, myKey)
      }
    })

    cy.on('tap', 'node', (event) => {
      const params = { 'vertex': event.target.id() }
      triggerGraphEvent('tap_node', params, myKey)
    })

    cy.on('tap', 'edge', (event) => {
      const params = {
        'source': parseInt(event.target._private.data.source),
        'target': parseInt(event.target._private.data.target)
      }
      triggerGraphEvent('tap_edge', params, myKey)
    })

    cy.on('cxttap', (event) => {
      if (event.target === cy) {
        const params = {
          'x': event.position.x,
          'y': event.position.y
        }
        triggerGraphEvent('cxttap_bg', params, myKey)
      }
    })

    cy.on('cxttap', 'node', (event) => {
      const params = { 'vertex': event.target.id() }
      triggerGraphEvent('cxttap_node', params, myKey)
    })

    cy.on('cxttap', 'edge', (event) => {
      const params = {
        'source': parseInt(event.target._private.data.source),
        'target': parseInt(event.target._private.data.target)
      }
      triggerGraphEvent('cxttap_edge', params, myKey)
    })

    function highlightVertex (event) {
      if (event.detail.graphKey !== myKey) return
      let vertex = cy.nodes('[id = "' + event.detail.vertex + '"]')[0]
      if (event.detail.highlight) vertex.addClass('highlight')
      else vertex.removeClass('highlight')
    }

    function highlightEdge (event) {
      if (event.detail.graphKey !== myKey) return
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
  }, [cy, data.directed, myKey, settings])

  return (
    <>
      <CytoscapeComponent
        id={'cy'}
        layout={layoutOptions}
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
