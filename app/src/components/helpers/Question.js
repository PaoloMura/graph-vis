import React from 'react'
import QSelectPath from '../questions/QSelectPath'
import NotFound from './NotFound'
import QTextInput from '../questions/QTextInput'
import QMultipleChoice from '../questions/QMultipleChoice'

export default function Question ({ question, onNext }) {
  switch (question.type) {
    case 'QSelectPath':
      return <QSelectPath question={question} onNext={onNext}/>
    case 'QTextInput':
      return <QTextInput question={question} onNext={onNext}/>
    case 'QMultipleChoice':
      return <QMultipleChoice question={question} onNext={onNext}/>
    default:
      return <NotFound/>
  }
}