/*
Supported Graph Events:
tap_node (vertex: int)

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