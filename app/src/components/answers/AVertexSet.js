import React, { useEffect, useState } from 'react'
import { triggerGraphAction } from '../utilities/graph-events'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

export default function AVertexSet ({ question, onNext }) {
  const [answer, setAnswer] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleReset = () => {
    for (let vertex of answer) {
      triggerGraphAction('highlightVertex', { vertex: vertex, highlight: false }, 0)
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

  const equalSets = (xs, ys) => {
    return xs.size === ys.size && [...xs].every((x) => ys.has(x))
  }

  const onSubmit = () => {
    // Determine whether the answer is correct
    const ans = new Set(answer)
    if (question.settings.feedback) getSolution()
    else {
      for (let solution of question.solutions) {
        const sol = new Set(solution)
        if (equalSets(sol, ans)) {
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
    function handleTapNode (event) {
      const vertex = event.detail.vertex
      if (answer.includes(vertex)) {
        setAnswer(answer.filter(v => v !== vertex))
        triggerGraphAction('highlightVertex', { vertex: vertex, highlight: false }, event.detail.graphKey)
      } else {
        const limit = question.settings.selection_limit
        if (limit === -1 || answer.length < limit) {
          setAnswer([...answer, vertex])
          triggerGraphAction('highlightVertex', { vertex: vertex, highlight: true }, event.detail.graphKey)
        }
      }
    }

    function handleBoxEnd (event) {
      const nodes = event.detail.nodes
      const numInAnswer = nodes.reduce((acc, n) => answer.includes(n) ? acc + 1 : acc, 0)
      if (numInAnswer === nodes.length) {
        // Un-highlight all and remove them from answer
        for (let n of nodes) {
          triggerGraphAction('highlightVertex', { vertex: n, highlight: false }, event.detail.graphKey)
        }
        setAnswer(answer.filter(a => !nodes.includes(a)))
      } else {
        // Highlight and add all missing to answer
        const missing = nodes.filter(n => !answer.includes(n))
        if (answer.length + missing.length <= question.settings.selection_limit) {
          for (let n of nodes) {
            triggerGraphAction('highlightVertex', { vertex: n, highlight: true }, event.detail.graphKey)
          }
          setAnswer(answer.concat(missing))
        }
      }
    }

    document.addEventListener('tap_node', handleTapNode)
    document.addEventListener('box_end', handleBoxEnd)

    return () => {
      document.removeEventListener('tap_node', handleTapNode)
      document.removeEventListener('box_end', handleBoxEnd)
    }
  }, [answer, question.settings.selection_limit])

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
          <li>Click on a vertex to select/unselect it.</li>
          <li>Click and drag to select/unselect multiple vertices.</li>
          {
            question.settings.selection_limit !== -1 &&
            <li>You can select at most {question.settings.selection_limit} vertices</li>
          }
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