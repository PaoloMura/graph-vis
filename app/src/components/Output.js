import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Output (props) {
  return (
    <>
      <h2>Question {props.number}</h2>
      <p>{props.question.message}</p>
      <Form action={'server.py'}>
        <Form.Control
          disabled
          readOnly
          value={props.output.toString()}
        />
        <br/>
        <Button variant={'primary'} type={'submit'}>Submit</Button>
      </Form>
    </>
  )
}

export default Output