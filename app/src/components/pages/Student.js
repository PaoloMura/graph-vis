import React, { useEffect, useState } from 'react'
import Question from '../helpers/Question'
import settings from '../../data/settings.json'
import question from '../../sample_question.json'
import topic from '../../sample_topic.json'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import ProgressRow from '../helpers/ProgressRow'

function Student () {
  let { topic_code } = useParams()

  const setInitialData = () => {
    return {
      'name': '',
      'description': '',
      'settings': {},
      'questions': []
    }
  }

  const [data, setData] = useState(setInitialData)
  const [err, setErr] = useState(true)
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/student/topics/' + topic_code,
    }).then((response) => {
      const res = response.data
      setData(res)
      setAnswers(new Array(res.questions.length).fill(undefined))
      setErr(false)
    }).catch((error) => {
      if (error.response) {
        setErr(true)
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
    return () => {setData(setInitialData)}
  }, [topic_code])

  let graphSettings = {}
  for (let item of settings) {
    graphSettings[item.setting] = item.default === 'true'
  }

  // let graph_controls = {}
  // for (let item of controls) {
  //   if (!(item.type in graph_controls)) {
  //     graph_controls[item.type] = {}
  //   }
  //   graph_controls[item.type][item.trigger] = 'noop'
  // }

  let graphControls = {
    tap: {
      background: 'createNode',
      node: 'noop',
      edge: 'noop'
    },
    cxttap: {
      background: 'unselect',
      node: 'createEdge',
      edge: 'noop'
    },
    keypress: {
      'Backspace': 'remove',
      'Enter': 'editWeight'
    }
  }

  function Topic () {
    return (
      <>
        <h1>Topic: {topic.name}</h1>
        <ProgressRow items={answers} clickable={!data.settings.linear}/>
        <Question
          question={question}
          number={1}
          graphSettings={graphSettings}
          graphControls={graphControls}
        />
        {/*<h2>Settings:</h2>*/}
        {/*<Settings settings={settings}/>*/}
        {/*<h2>Controls:</h2>*/}
        {/*<Controls controls={controls} actions={actions}/>*/}
      </>
    )
  }

  return (
    <div className={'GraphArea'}>
      <Button variant="secondary" href="/student/portal">Back</Button>
      {err ? <h1>Topic not found :(</h1> : <Topic/>}
    </div>
  )
}

export default Student
