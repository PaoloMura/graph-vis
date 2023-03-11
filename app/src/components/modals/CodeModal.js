import React from 'react'
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap'

export default function CodeModal ({ showModal, closeModal, topicCode }) {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <ModalHeader>
        <ModalTitle>Topic Code</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {topicCode}
      </ModalBody>
    </Modal>
  )
}