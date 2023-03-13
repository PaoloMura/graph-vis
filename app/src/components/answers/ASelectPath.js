import React, { useEffect, useState } from 'react'
import { triggerGraphAction } from '../utilities/graph-events'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function ASelectPath ({ question, onNext }) {
  const [answer, setAnswer] = useState([])
  const [submittted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)

  const onSubmit = () => {
    // TODO: change how we process answers depending on the settings
    // Determine whether the answer is correct
    let ans = answer.toString()
    for (let sol of question.solutions) {
      if (sol.toString() === ans) {
        setCorrect(true)
        break
      }
    }
    setSubmitted(true)
  }

  const onNextPress = () => {
    if (!submittted) onNext(answer, 'unanswered')
    else if (correct) onNext(answer, 'correct')
    else onNext(answer, 'incorrect')
  }

  useEffect(() => {
    function selectVertex (event) {
      // Find the selected vertex and update state
      let vertex = parseInt(event.detail, 10)
      setAnswer([...answer, vertex])
      if (answer.length > 0) {
        // Un-highlight the previous vertex
        triggerGraphAction('highlightVertex', { vertex: answer.at(-1), highlight: false })
        // Highlight the edge
        const params = {
          v1: answer.at(-1),
          v2: vertex,
          highlight: true
        }
        triggerGraphAction('highlightEdge', params)
      }
      // Highlight this vertex
      triggerGraphAction('highlightVertex', { vertex: vertex, highlight: true })
    }

    function undo (event) {
      if (event.key === 'Backspace' && answer.length > 0) {
        // Un-highlight the current vertex
        triggerGraphAction('highlightVertex', { vertex: answer.at(-1), highlight: false })
        if (answer.length > 1) {
          // Highlight the previously selected vertex
          triggerGraphAction('highlightVertex', { vertex: answer.at(-2), highlight: true })
          // Un-highlight the current edge if it does not appear anywhere else in the answer
          let v1 = answer.at(-2)
          let v2 = answer.at(-1)
          let checkAdjacent = (val, idx) => {
            return val === v1 && idx < answer.length - 2 && answer.at(idx + 1) === v2
          }
          if (answer.find(checkAdjacent) === undefined) {
            triggerGraphAction('highlightEdge', { v1: v1, v2: v2, highlight: false })
          }
        }
        setAnswer(answer.slice(0, -1))
      }
    }

    document.addEventListener('tap_node', selectVertex)
    document.addEventListener('keydown', undo)

    return () => {
      document.removeEventListener('tap_node', selectVertex)
      document.removeEventListener('keydown', undo)
    }
  }, [answer])

  // TODO: include personalised feedback if verified from server-side
  if (submittted) return (
    <div>
      {correct ? 'Correct!' : 'Incorrect'}
      <br/>
      <Button variant={'primary'} onClick={onNextPress}>Next</Button>
    </div>
  )

  else return (
    <div>
      <h3>Description</h3>
      <p>{question.description}</p>
      <br/>
      <h3>Controls</h3>
      <ul>
        <li>Click on a vertex to select it.</li>
        <li>Press backspace to undo.</li>
      </ul>
      <br/>
      <Form>
        <Form.Control
          disabled
          readOnly
          value={answer.toString()}
        />
        <br/>
        <Button variant="primary" onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  )
}