import React from 'react';
import { useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './App.css';

function App() {
  let my_cy = null;
  let selectedColor = '#c00';

  const elements = [
    { data: { id: 'v1'} },
    { data: { id: 'v2' } },
    { data: { id: 'e12', source: 'v1', target: 'v2' } }
  ];

  const layout = { name: 'grid', rows: 1 };

  const stylesheet = [
    {
      selector: 'node',
      style: {
        'background-color': '#fff',
        'border-style': 'solid',
        'border-width': 2,
        'label': 'data(id)',
        'text-valign': 'center',
        'text-halign': 'center',
      }
    },
    {
      selector: 'node:selected',
      style: {
        'background-color': selectedColor,
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#000',
        'target-arrow-color': '#000',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    },
    {
      selector: 'edge:selected',
      style: {
        'line-color': selectedColor,
        'source-arrow-color': selectedColor,
        'target-arrow-color': selectedColor
      }
    },
  ]

  // This determines the next label for the vertex
  // by finding the smallest available integer > 0
  const nextVertexLabel = (cy) => {
    let vertices = cy.$('node')
        .map(x => parseInt(x.id().slice(1)))
        .sort((a, b) => a - b);
    let prev = 0;
    for (let v of vertices) {
      if (v === prev + 1) prev = v;
      else break;
    }
    return 'v' + (prev + 1);
  }

  const setListeners = (cy) => {
    // Add a new node when tapping on the background
    cy.on('tap', (event) => {
      if (event.target === cy) {
        let x = event.position.x;
        let y = event.position.y;
        let label = nextVertexLabel(cy);
        cy.add({
          group: 'nodes',
          position: { x: x, y: y },
          data: { id: label }
        })
      }
    });

    // Deselect all elements when right-clicking the background
    cy.on('cxttap', (event) => {
      if (event.target === cy) {
        let elems = cy.$(':selected');
        for (let elem of elems) {
          elem.unselect();
        }
      }
    })

    // Add a new edge from the previously selected vertex when double tapping another vertex
    cy.on('cxttap', 'node', (event) => {
      let selected = cy.$('node:selected');
      if (selected.size() === 0) return;
      let v1 = selected[0].id();
      let v2 = event.target.id();
      if (cy.$('[source = "' + v1 + '"][target = "' + v2 + '"]').size() === 0) {
        cy.add({
          group: 'edges',
          data: {
            id: v1 + v2,
            source: v1,
            target: v2
          }
        })
      }
    })
  };

  useEffect(() => {
    // TODO: this seems to get called twice for some reason?
    const handleKeyDown = (e) => {
      // Remove the selected node when the backspace key is pressed
      if (e.key === 'Backspace') {
        let selected = my_cy.$(':selected');
        if (selected[0] != null) my_cy.remove(selected[0]);
      }
      else if (e.key === 'a') {
        let selected = my_cy.$('node:selected');
        if (selected[0] != null) console.log(selected[0].id());
        selected = my_cy.$('edge:selected');
        if (selected[0] != null) console.log(selected[0].id());
      }
    }
    document.addEventListener('keydown', handleKeyDown, true);
  }, [my_cy])

  return (
      <>
          <h1>React-Cytoscape Test</h1>
          <CytoscapeComponent
              id={'cy'}
              elements={elements}
              layout={layout}
              stylesheet={stylesheet}
              cy={(cy) => {
                setListeners(cy);
                my_cy = cy;
              }}
          />
      </>
  )
}

export default App;
