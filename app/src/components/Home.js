import React from 'react'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'

function Home () {
  return (
    <div>
      <div className={'Home-box'}>
        <Stack gap={5}>
          <Button href={'/teacher-login'}>Teacher</Button>
          <Button href={'/choose-topic'}>Student</Button>
        </Stack>
      </div>
    </div>
  )
}

export default Home
