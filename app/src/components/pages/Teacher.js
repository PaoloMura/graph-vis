import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Table } from 'react-bootstrap'
import TableRow from '../helpers/TableRow'
import BottomRow from '../helpers/BottomRow'

function Teacher ({ token, setToken }) {
  function setInitialContent () {
    return {
      questions: [],
      topics: []
    }
  }

  const [content, setContent] = useState(setInitialContent)

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/teacher/content',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      const res = response.data
      res.access_token && setToken(res.access_token)
      setContent(({
        questions: res.questions,
        topics: res.topics
      }))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }, [token, setToken])

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2>Questions:</h2>
            <Table bordered hover>
              <tbody>
              {content.questions.map((question) => (
                <TableRow key={question} text={question}/>
              ))}
              <BottomRow colSpan={2}/>
              </tbody>
            </Table>
          </Col>
          <Col>
            <h2>Topics:</h2>
            <Table bordered hover>
              <tbody>
              {content.topics.map((topic) => (
                <TableRow key={topic.topic_code} text={topic.name} link={true} share={true}/>
              ))}
              <BottomRow colSpan={3}/>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Teacher