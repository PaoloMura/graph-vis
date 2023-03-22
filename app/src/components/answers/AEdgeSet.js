import React, { useEffect, useState } from 'react'
import { triggerGraphAction } from '../utilities/graph-events'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

export default function AEdgeSet ({ question, onNext }) {
  const [answer, setAnswer] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [feedback, setFeedback] = useState('')

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
    function handleTapEdge (event) {
      const source = parseInt(event.detail.source, 10)
      const target = parseInt(event.detail.target, 10)

      const edgeInAnswer = (u, v) => {
        for (let [x, y] of answer) {
          if (question.graphs[event.detail.graphKey].directed) {
            if (u === x && v === y) return true
          } else {
            if ((u === x && v === y) || (u === y && v === x)) return true
          }
        }
        return false
      }

      const eqEdges = (e, f) => {
        return (e[0] === f[0] && e[1] === f[1])
      }

      const edgesDifferent = (e) => {
        if (question.graphs[event.detail.graphKey].directed) {
          return !eqEdges(e, [source, target])
        } else {
          return (!eqEdges(e, [source, target])) && (!eqEdges(e, [target, source]))
        }
      }

      if (edgeInAnswer(source, target)) {
        setAnswer(answer.filter(edgesDifferent))
        triggerGraphAction(
          'highlightEdge',
          { v1: source, v2: target, highlight: false },
          event.detail.graphKey
        )
      } else {
        const limit = question.settings.selection_limit
        if (limit === -1 || answer.length < limit) {
          setAnswer([...answer, [source, target]])
          triggerGraphAction(
            'highlightEdge',
            { v1: source, v2: target, highlight: true },
            event.detail.graphKey
          )
        }
      }
    }

    document.addEventListener('tap_edge', handleTapEdge)

    return () => {
      document.removeEventListener('tap_edge', handleTapEdge)
    }
  }, [answer, question])

  const answerToString = () => {
    const edges = answer.map(([u, v], _) => `(${u},${v})`)
    return edges.join(',')
  }

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
          <li>Click on an edge to select/unselect it.</li>
          {
            question.settings.selection_limit !== -1 &&
            <li>You can select at most {question.settings.selection_limit} edges</li>
          }
        </ul>
        <br/>
        <Form>
          <Form.Control
            disabled
            readOnly
            value={answerToString()}
          />
          <br/>
          <Button variant="primary" onClick={onSubmit}>Submit</Button>
        </Form>
      </div>
    )
  }
}