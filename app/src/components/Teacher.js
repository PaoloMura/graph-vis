import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

function Teacher (props) {
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

  const [profileData, setProfileData] = useState(null)

  function getData () {
    axios({
      method: 'GET',
      url: '/api/profile',
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
      .then((response) => {
        const res = response.data
        res.access_token && props.setToken(res.access_token)
        setProfileData(({
          profile_name: res.name,
          about_me: res.about
        }))
      }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }

  return (
    <div>
      <Button variant={'secondary'} onClick={logMeOut}>Logout</Button>
      <h2>Teacher Page</h2>
      <p>To get your profile details: </p>
      <Button onClick={getData}>Click me</Button>
      {profileData && <div>
        <p>Profile name: {profileData.profile_name}</p>
        <p>About me: {profileData.about_me}</p>
      </div>
      }
    </div>
  )
}

export default Teacher