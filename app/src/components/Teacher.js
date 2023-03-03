import React, { useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Table } from 'react-bootstrap'
import DeleteIcon from '@mui/icons-material/Delete'
import { AddBox } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/Share'
import Button from 'react-bootstrap/Button'

function Teacher (props) {
  function setInitialContent () {
    return {
      questions: [
        'euler.py',
        'hamilton.py',
        'dfs.py',
        'bfs.py'
      ],
      topics: [
        {
          'topic_code': 'f93hf',
          'name': 'Walks'
        },
        {
          'topic_code': 'f93js',
          'name': 'Traversals'
        }
      ]
    }
  }

  const [content, setContent] = useState(setInitialContent)

  function getData () {
    axios({
      method: 'GET',
      url: '/api/teacher/content',
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
      .then((response) => {
        const res = response.data
        res.access_token && props.setToken(res.access_token)
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
  }

  // useEffect(() => {
  //   getData()
  // })

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2>Questions:</h2>
            <Table bordered hover>
              <tbody>
              {content.questions.map((question) => (
                <tr>
                  <td>{question}</td>
                  <td>
                    <IconButton>
                      <DeleteIcon/>
                    </IconButton>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={2}>
                  <IconButton>
                    <AddBox/>
                  </IconButton>
                </td>
              </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
            <h2>Topics:</h2>
            <Table bordered hover>
              <tbody>
              {content.topics.map((topic) => (
                <tr>
                  <td>
                    <Button variant={'link'}>
                      {topic.name}
                    </Button>
                  </td>
                  <td>
                    <IconButton>
                      <DeleteIcon/>
                    </IconButton>
                  </td>
                  <td>
                    <IconButton>
                      <ShareIcon/>
                    </IconButton>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>
                  <IconButton>
                    <AddBox/>
                  </IconButton>
                </td>
              </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Teacher