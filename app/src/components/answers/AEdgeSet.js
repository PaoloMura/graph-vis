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

  const handleReset = () => {
    for (let [source, target] of answer) {
      triggerGraphAction(
        'highlightEdge',
        { v1: source, v2: target, highlight: false },
        0
      )
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

  const equalNestedSets = (xs, ys) => {
    if (xs.size !== ys.size) return false
    for (let x of xs) {
      for (let y of ys) {
        if (equalSets(x, y)) return true
      }
    }
    return false
  }

  const answerInSolutions = () => {
    const ans = new Set(answer.map(edge => new Set(edge)))
    for (let solution of question.solutions) {
      const sol = new Set(solution.map(edge => new Set(edge)))
      if (equalNestedSets(sol, ans)) {
        return true
      }
    }
    return false
  }

  const onSubmit = () => {
    // Determine whether the answer is correct
    if (question.settings.feedback) getSolution()
    else if (answerInSolutions()) setCorrect(true)
    setSubmitted(true)
  }

  const onNextPress = () => {
    if (!submitted) onNext(answer, 'unanswered')
    else if (correct) onNext(answer, 'correct')
    else onNext(answer, 'incorrect')
  }

  useEffect(() => {
    const edgeInAnswer = (edge, graphKey) => {
      const [u, v] = edge
      for (let [x, y] of answer) {
        if (question.graphs[graphKey].directed) {
          if (u === x && v === y) return true
        } else {
          if ((u === x && v === y) || (u === y && v === x)) return true
        }
      }
      return false
    }

    const edgeInArray = (edge, array) => {
      const [u, v] = edge
      for (let [x, y] of array) {
        if (u === x && v === y) return true
      }
      return false
    }

    const eqEdges = (e, f) => {
      return (e[0] === f[0] && e[1] === f[1])
    }

    const edgesDifferent = (e, f, graphKey) => {
      if (question.graphs[graphKey].directed) {
        return !eqEdges(e, [f[0], f[1]])
      } else {
        return (!eqEdges(e, [f[0], f[1]])) && (!eqEdges(e, [f[1], f[0]]))
      }
    }

    function handleTapEdge (event) {
      const source = event.detail.source
      const target = event.detail.target

      if (edgeInAnswer([source, target], event.detail.graphKey)) {
        setAnswer(answer.filter((e) => edgesDifferent(e, [source, target], event.detail.graphKey)))
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

    function handleBoxEnd (event) {
      const edges = event.detail.edges
      const numInAnswer = edges.reduce((acc, e) => {
        return edgeInAnswer(e, event.detail.graphKey) ? acc + 1 : acc
      }, 0)
      if (numInAnswer === edges.length) {
        // Un-highlight all and remove them from answer
        for (let e of edges) {
          triggerGraphAction(
            'highlightEdge',
            { v1: e[0], v2: e[1], highlight: false },
            event.detail.graphKey
          )
        }
        setAnswer(answer.filter(e => !edgeInArray(e, edges)))
      } else {
        // Highlight and add all missing to answer
        const missing = edges.filter(e => !edgeInAnswer(e, event.detail.graphKey))
        if (question.settings.selection_limit === -1 ||
          answer.length + missing.length <= question.settings.selection_limit) {
          for (let m of missing) {
            triggerGraphAction(
              'highlightEdge',
              { v1: m[0], v2: m[1], highlight: true },
              event.detail.graphKey
            )
          }
          setAnswer(answer.concat(missing))
        }
      }
    }

    document.addEventListener('tap_edge', handleTapEdge)
    document.addEventListener('box_end', handleBoxEnd)

    return () => {
      document.removeEventListener('tap_edge', handleTapEdge)
      document.removeEventListener('box_end', handleBoxEnd)
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
          <li>Click and drag to select/unselect multiple edges.</li>
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
          <Button variant="secondary" onClick={handleReset}>Reset</Button>
          <br/>
          <br/>
          <Button variant="primary" onClick={onSubmit}>Submit</Button>
        </Form>
      </div>
    )
  }
}