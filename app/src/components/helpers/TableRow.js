import React from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import LinkIcon from '@mui/icons-material/Link'
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

function DeleteButton ({ item, onDelete }) {
  return (
    <td>
      <IconButton onClick={(e) => onDelete(item, e)}>
        <DeleteIcon/>
      </IconButton>
    </td>
  )
}

function ShareButton () {
  return (
    <td>
      <IconButton>
        <LinkIcon/>
      </IconButton>
    </td>
  )
}

export default function TableRow ({
  text,
  link,
  myKey,
  share,
  onDelete
}) {
  return (
    <tr>
      {link ? <Link text={text}/> : <Text text={text}/>}
      <DeleteButton item={myKey} onDelete={onDelete}/>
      {share && <ShareButton/>}
    </tr>
  )
}