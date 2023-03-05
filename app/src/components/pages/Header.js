import React from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

function Header (props) {
  function logMeOut () {
    axios({
      method: 'POST',
      url: '/api/logout'
    }).then((response) => {
      props.removeToken()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }

  return (
    <div id={'header'}>
      <h1>Graph Theory Question Generator</h1>
      {
        props.token &&
        <Button variant={'secondary'} onClick={logMeOut} id={'btn-logout'}>Logout</Button>
      }
    </div>
  )
}

export default Header