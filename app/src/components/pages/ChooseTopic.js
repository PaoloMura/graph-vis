import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from './Header'

function ChooseTopic () {
  const [topicCode, setTopicCode] = useState('')

  const updateCode = (e) => setTopicCode(e.target.value)

  return (
    <div>
      <Header btnType="back" backPath="/"/>
      <Form className={'Login-box'}>
        <h2>Choose a Topic</h2>
        <Form.Group className={'Login-row'}>
          <Form.Control placeholder={'Topic code'} value={topicCode} onChange={updateCode}></Form.Control>
        </Form.Group>
        <Row className={'Login-row'}>
          <Col>
            <Button variant={'secondary'} href={'/'}>Back</Button>
          </Col>
          <Col className={'Right-button-container'}>
            <Button variant={'primary'} href={'/student/topics/' + topicCode} className={'Right-button'}>Submit</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default ChooseTopic