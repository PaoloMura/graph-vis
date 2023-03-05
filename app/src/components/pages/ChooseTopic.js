import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function ChooseTopic () {
  return (
    <>
      <Form className={'Login-box'}>
        <h2>Choose a Topic</h2>
        <Form.Group className={'Login-row'}>
          <Form.Control placeholder={'Topic code'}></Form.Control>
        </Form.Group>
        <Row className={'Login-row'}>
          <Col>
            <Button variant={'secondary'} href={'/'}>Back</Button>
          </Col>
          <Col className={'Right-button-container'}>
            <Button variant={'primary'} href={'/student/topic'} className={'Right-button'}>Submit</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ChooseTopic