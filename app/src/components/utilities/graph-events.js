export function triggerGraphEvent (name, event) {
  const newEvent = new CustomEvent(name, { detail: event })
  document.dispatchEvent(newEvent)
}

export function triggerGraphAction (name, value) {
  const newEvent = new CustomEvent(name, { detail: value })
  document.dispatchEvent(newEvent)
}