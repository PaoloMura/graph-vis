import React, { useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

export default function ProgressRow ({ items, clickable }) {
  const variants = {
    undefined: 'secondary',
    answered: 'primary',
    correct: 'success',
    incorrect: 'danger'
  }
  const [selected, setSelected] = useState(0)

  const onSelect = (k) => {
    if (clickable) {
      setSelected(k)
    }
  }

  return (
    <Tabs justify activeKey={selected} onSelect={onSelect}>
      {items.map((item, index) => {
        let variant = item === undefined ? variants.undefined : variants[item.status]
        return <Tab eventKey={index} title={'Question ' + (index + 1)} disabled={!clickable}/>
      })}
    </Tabs>
  )
}