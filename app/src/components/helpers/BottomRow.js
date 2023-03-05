import React from 'react'
import IconButton from '@mui/material/IconButton'
import { AddBox } from '@mui/icons-material'

export default function BottomRow ({ colSpan }) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <IconButton>
          <AddBox/>
        </IconButton>
      </td>
    </tr>
  )
}