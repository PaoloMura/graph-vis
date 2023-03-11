import React from 'react'
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default function FinishedModal ({ showModal, score, total }) {
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
        <Button variant="primary" href="/student/portal">Done</Button>
      </ModalBody>
    </Modal>
  )
}