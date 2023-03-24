import React, { useEffect, useState } from 'react'
import { triggerGraphAction } from '../utilities/graph-events'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

export default function ASelectPath ({ question, onNext }) {
  const [answer, setAnswer] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [feedback, setFeedback] = useState('')

  const getEdge = (u, v) => {
    if (question.graphs[0].directed) return [u, v]
    else if (question.graphs[0].elements.edges.find(e => e[0] === u && e[1] === v)) return [u, v]
    else return [v, u]
  }

  const handleReset = () => {
    let prev = undefined
    for (let vertex of answer) {
      triggerGraphAction('highlightVertex', { vertex: vertex, highlight: false }, 0)
      if (prev !== undefined) {
        const [u, v] = getEdge(prev, vertex)
        triggerGraphAction('highlightEdge', { v1: u, v2: v, highlight: false }, 0)
      }
      prev = vertex
    }
    setAnswer([])
  }

  const getSolution = () => {
    axios({
      method: 'POST',
      url: '/api/feedback/' + question.file + '/' + question.class,
      data: {
        answer: answer,
        graphs: question.graphs
      }
    }).then((response) => {
      const res = response.data
      setCorrect(res.result)
      setFeedback(res.feedback)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.headers)
      }
    })
  }

  const onSubmit = () => {
    // Determine whether the answer is correct
    let ans = answer.toString()
    if (question.settings.feedback) getSolution()
    else {
      for (let sol of question.solutions) {
        if (sol.toString() === ans) {
          setCorrect(true)
          break
        }
      }
    }
    setSubmitted(true)
  }

  const onNextPress = () => {
    if (!submitted) onNext(answer, 'unanswered')
    else if (correct) onNext(answer, 'correct')
    else onNext(answer, 'incorrect')
  }

  useEffect(() => {
    function addNode (value, graphKey) {
      setAnswer([...answer, value])
      if (answer.length > 0) {
        // Un-highlight the previous vertex
        triggerGraphAction('highlightVertex', { vertex: answer.at(-1), highlight: false }, graphKey)
        // Highlight the edge
        const params = {
          v1: answer.at(-1),
          v2: value,
          highlight: true
        }
        triggerGraphAction('highlightEdge', params, graphKey)
      }
      // Highlight this vertex
      triggerGraphAction('highlightVertex', { vertex: value, highlight: true }, graphKey)
    }

    function popNode (graphKey) {
      if (answer.length === 0) return
      // Un-highlight the current vertex
      triggerGraphAction('highlightVertex', { vertex: answer.at(-1), highlight: false }, graphKey)
      if (answer.length > 1) {
        // Highlight the previously selected vertex
        triggerGraphAction('highlightVertex', { vertex: answer.at(-2), highlight: true }, graphKey)
        // Un-highlight the current edge if it does not appear anywhere else in the answer
        let v1 = answer.at(-2)
        let v2 = answer.at(-1)
        let checkAdjacent = (val, idx) => {
          return val === v1 && idx < answer.length - 2 && answer.at(idx + 1) === v2
        }
        if (answer.find(checkAdjacent) === undefined) {
          triggerGraphAction('highlightEdge', { v1: v1, v2: v2, highlight: false }, graphKey)
        }
      }
      setAnswer(answer.slice(0, -1))
    }

    function areAdjacent (v1, v2, graphKey) {
      for (let edge of question.graphs[graphKey].elements.edges) {
        let [w1, w2] = [parseInt(edge.data.source), parseInt(edge.data.target)]
        if (question.graphs[graphKey].directed) {
          if (v1 === w1 && v2 === w2) return true
        } else {
          if ((v1 === w1 && v2 === w2) || (v1 === w2 && v2 === w1)) return true
        }
      }
      return false
    }

    // Returns true if the given edge is unvisited
    function isUnvisited (v1, v2, graphKey) {
      if (answer.length < 2) return true
      for (let i = 0; i < answer.length - 1; i++) {
        if (question.graphs[graphKey].directed) {
          if (v1 === answer[i] && v2 === answer[i + 1]) return false
        } else {
          if (
            (v1 === answer[i] && v2 === answer[i + 1]) ||
            (v2 === answer[i] && v1 === answer[i + 1])
          ) return false
        }
      }
      return true
    }

    function handleTapNode (event) {
      let vertex = event.detail.vertex
      // If clicking on the latest vertex or its predecessor, remove it
      if (answer.length > 0 && answer.at(-1) === vertex) popNode(event.detail.graphKey)
        // else if (answer.length > 1 && answer.at(-2) === vertex) popNode()
      // Only add a vertex if adjacent to the previous and the edge is unvisited
      else if (answer.length === 0) addNode(vertex, event.detail.graphKey)
      else if (areAdjacent(answer.at(-1), vertex, event.detail.graphKey) &&
        isUnvisited(answer.at(-1), vertex, event.detail.graphKey)) {
        addNode(vertex, event.detail.graphKey)
      }
    }

    function handleTapEdge (event) {
      let [v1, v2] = [event.detail.source, event.detail.target]
      if (answer.length > 1 &&
        (
          (v1 === answer.at(-2) && v2 === answer.at(-1)) ||
          (v2 === answer.at(-2) && v1 === answer.at(-1))
        )
      ) popNode(event.detail.graphKey)
    }

    function handleKeyDown (event) {
      // TODO: add support for selecting entire graphs in order to use keydown events properly
      if (event.key === 'Backspace') popNode(0)
    }

    document.addEventListener('tap_node', handleTapNode)
    document.addEventListener('tap_edge', handleTapEdge)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('tap_node', handleTapNode)
      document.removeEventListener('tap_edge', handleTapEdge)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [answer, question.graphs])

  if (submitted) {
    return (
      <div>
        {correct ? 'Correct!' : 'Incorrect'}
        <br/>
        {feedback}
        <br/>
        <Button variant={'primary'} onClick={onNextPress}>Next</Button>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Description</h3>
        <p>{question.description}</p>
        <br/>
        <h3>Controls</h3>
        <ul>
          <li>Click on a vertex to select it.</li>
          <li>Click on the last visited vertex/edge to remove it.</li>
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
          <Button variant="secondary" onClick={handleReset}>Reset</Button>
          <br/>
          <br/>
          <Button variant="primary" onClick={onSubmit}>Submit</Button>
        </Form>
      </div>
    )
  }
}