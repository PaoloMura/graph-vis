/*
A graph event is an event that is triggered by the graph, usually in response to user input (e.g. selecting a vertex).
A graph action is an event that the graph listens and responds to (e.g. highlight a given vertex).

Supported Graph Events:
tap_node (vertex: int)
tap_edge (source: int, target: int)

Supported Graph Actions:
highlightVertex (vertex: int, highlight: bool)
highlightEdge (v1: int, v2: int, highlight: bool)
 */

export function triggerGraphEvent (name, value) {
  const newEvent = new CustomEvent(name, { detail: value })
  document.dispatchEvent(newEvent)
}

export function triggerGraphAction (name, value) {
  const newEvent = new CustomEvent(name, { detail: value })
  document.dispatchEvent(newEvent)
}