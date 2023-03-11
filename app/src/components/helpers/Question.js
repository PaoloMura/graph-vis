import React from 'react'
import QSelectPath from '../questions/QSelectPath'
import NotFound from './NotFound'

export default function Question ({ question, onNext }) {
  switch (question.type) {
    case 'QSelectPath':
      return <QSelectPath question={question} onNext={onNext}/>
    default:
      return <NotFound/>
  }
}