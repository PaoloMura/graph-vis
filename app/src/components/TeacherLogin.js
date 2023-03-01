import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function TeacherLogin () {
  return (
    <>
      <Form className={'Login-box'}>
        <h2>Teacher Login</h2>
        <Button variant={'secondary'} href={'/'} className={'Login-row'}>Back</Button>
        <Form.Group className={'Login-row'}>
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder={'Enter username'}></Form.Control>
        </Form.Group>
        <Form.Group className={'Login-row'}>
          <Form.Label>Password</Form.Label>
          <Form.Control type={'password'} placeholder={'Enter password'}></Form.Control>
        </Form.Group>
        <Row className={'Login-row'}>
          <Col>
            <Button variant={'secondary'} href={'/teacher-signup'}>Create account</Button>
          </Col>
          <Col className={'Right-button-container'}>
            <Button variant={'primary'} href={'/'} className={'Right-button'}>Login</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default TeacherLogin