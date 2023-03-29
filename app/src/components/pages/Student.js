import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProgressRow from '../helpers/ProgressRow'
import Header from '../helpers/Header'
import NotFound from '../helpers/NotFound'

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

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/student/topics/' + topic_code,
    }).then((response) => {
      const res = response.data
      setData(res)
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

  return (
    <div>
      <Header btnType="back" backPath="/student/portal"/>
      <div className={'GraphArea'}>
        {
          err ? <NotFound/> :
            <ProgressRow topicName={data['name']} settings={data['settings']} questions={data['questions']}/>
        }
      </div>
    </div>
  )
}

export default Student
