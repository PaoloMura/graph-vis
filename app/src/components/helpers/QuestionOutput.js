import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function QuestionOutput ({ number, success, message, onSubmit }) {
  return (
    <>
      <h2>Question {number}</h2>
      {success ? <p>Correct!</p> : <p>Incorrect</p>}
      {message && <p>{message}</p>}
      <br/>
      <Form onSubmit={onSubmit}>
        <Button variant={'primary'} type={'submit'}>Next</Button>
      </Form>
    </>
  )
}