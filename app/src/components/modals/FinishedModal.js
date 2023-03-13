import React from 'react'
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default function FinishedModal ({ showModal, progress }) {
  let score = progress.reduce((tot, cur) => {
    return cur.status === 'correct' ? tot + 1 : tot
  }, 0)
  let total = progress.length

  return (
    <Modal
      show={showModal}
      backdrop="static"
    >
      <ModalHeader>
        <ModalTitle>Topic complete</ModalTitle>
      </ModalHeader>
      <ModalBody>
        You scored {score} out of {total}.
        <br/>
        <ul>
          {
            progress.map((item, idx) => (
              <li key={idx}>Q{idx + 1}: {item.status}</li>
            ))
          }
        </ul>
        <Button variant="primary" href="/student/portal">Done</Button>
      </ModalBody>
    </Modal>
  )
}