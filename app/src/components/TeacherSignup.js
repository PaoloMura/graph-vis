import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function TeacherSignup () {
  return (
    <>
      <Form className={'Login-box'}>
        <h2>Create Account</h2>
        <Form.Group className={'Login-row'}>
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder={'Enter username'}></Form.Control>
        </Form.Group>
        <Form.Group className={'Login-row'}>
          <Form.Label>Password</Form.Label>
          <Form.Control type={'password'} placeholder={'Enter password'}></Form.Control>
        </Form.Group>
        <Form.Group className={'Login-row'}>
          <Form.Label>Re-enter password</Form.Label>
          <Form.Control type={'password'} placeholder={'Enter password'}></Form.Control>
        </Form.Group>
        <Row className={'Login-row'}>
          <Col>
            <Button variant={'secondary'} href={'/teacher-login'}>Back</Button>
          </Col>
          <Col className={'Right-button-container'}>
            <Button variant={'primary'} href={'/teacher-login'} className={'Right-button'}>Create account</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default TeacherSignup