import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Table } from 'react-bootstrap'
import TableRow from '../helpers/TableRow'
import BottomRow from '../helpers/BottomRow'
import DeleteModal from '../helpers/DeleteModal'

function Teacher ({ token, setToken }) {
  function setInitialContent () {
    return {
      questions: [],
      topics: []
    }
  }

  const [content, setContent] = useState(setInitialContent)
  const [delFile, setDelFile] = useState('')
  const [delTopic, setDelTopic] = useState('')

  const handleOpenDelFile = (item) => setDelFile(item)
  const handleCloseDelFile = () => setDelFile('')
  const handleDelFile = () => {
    // Delete the file from the server
    axios({
      method: 'DELETE',
      url: '/api/teacher/questions/' + delFile,
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      // Update the access token if necessary
      const res = response.data
      res.access_token && setToken(res.access_token)
      // Remove the file from our local list
      setContent({
        ...content,
        questions: content.questions.filter(q => q !== delFile)
      })
      setDelFile('')
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }

  const handleOpenDelTopic = (item) => setDelTopic(item)
  const handleCloseDelTopic = () => setDelTopic('')
  const handleDelTopic = () => {
    // Delete the topic from the server
    axios({
      method: 'DELETE',
      url: '/api/teacher/topics/' + delTopic,
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      // Update the access token if necessary
      const res = response.data
      res.access_token && setToken(res.access_token)
      // Remove the topic from our local list
      setContent({
        ...content,
        topics: content.topics.filter(t => t.topic_code !== delTopic)
      })
      setDelTopic('')
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }

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
                <TableRow
                  key={question}
                  text={question}
                  myKey={question}
                  onDelete={handleOpenDelFile}
                />
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
                <TableRow
                  key={topic.topic_code}
                  text={topic.name}
                  link={true}
                  myKey={topic.topic_code}
                  share={true}
                  onDelete={handleOpenDelTopic}
                />
              ))}
              <BottomRow colSpan={3}/>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <DeleteModal deleting={delFile} closeDelete={handleCloseDelFile} performDelete={handleDelFile}/>
      <DeleteModal deleting={delTopic} closeDelete={handleCloseDelTopic} performDelete={handleDelTopic}/>
    </div>
  )
}

export default Teacher