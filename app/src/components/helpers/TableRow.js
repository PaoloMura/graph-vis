import React from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ShareIcon from '@mui/icons-material/Share'
import Button from 'react-bootstrap/Button'

function Text ({ text }) {
  return (
    <td>{text}</td>
  )
}

function Link ({ text }) {
  return (
    <td>
      <Button variant={'link'}>
        {text}
      </Button>
    </td>
  )
}

function DeleteButton () {
  return (
    <td>
      <IconButton>
        <DeleteIcon/>
      </IconButton>
    </td>
  )
}

function ShareButton () {
  return (
    <td>
      <IconButton>
        <ShareIcon/>
      </IconButton>
    </td>
  )
}

export default function TableRow ({
  text,
  link,
  share
}) {
  return (
    <tr>
      {link ? <Link text={text}/> : <Text text={text}/>}
      <DeleteButton/>
      {share && <ShareButton/>}
    </tr>
  )
}