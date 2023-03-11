export default function updateAnswer (value) {
  const newEvent = new CustomEvent('updateAnswer', { detail: value })
  document.dispatchEvent(newEvent)
}