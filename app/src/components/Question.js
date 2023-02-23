import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Question (props) {
  return (
    <div>
      <h2>Question {props.number}</h2>
      <p>{props.message}</p>
      <Form>
        <Button variant={'primary'} type={'submit'}>Submit</Button>
      </Form>
    </div>
  )
}

export default Question