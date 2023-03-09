import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Output ({ number, message, answer, setAnswer, editable, onSubmit }) {
  return (
    <>
      <h2>Question {number}</h2>
      <p>{message}</p>
      <Form onSubmit={onSubmit}>
        {editable ? (
          <Form.Control
            value={answer.toString()}
            onChange={setAnswer}
          />
        ) : (
          <Form.Control
            disabled
            readOnly
            value={answer.toString()}
          />
        )}
        <br/>
        <Button variant={'primary'} type={'submit'}>Submit</Button>
      </Form>
    </>
  )
}

export default Output