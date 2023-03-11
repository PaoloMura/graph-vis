import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Answer ({ message, answer, setAnswer, editable, onSubmit }) {
  return (
    <>
      <p>{message}</p>
      <Form>
        {editable ? (
          <Form.Control
            value={answer.toString()}
            onChange={setAnswer}
          />
        ) : (
          <Form.Control
            disabled
            readOnly={true}
            value={answer.toString()}
          />
        )}
        <br/>
        <Button variant={'primary'} onClick={onSubmit}>Submit</Button>
      </Form>
    </>
  )
}

export default Answer