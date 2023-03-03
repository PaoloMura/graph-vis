import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ChooseTopic from './components/ChooseTopic'
import Home from './components/Home'
import TeacherLogin from './components/TeacherLogin'
import useToken from './components/useToken'
import Teacher from './components/Teacher'
import Header from './components/Header'

function App () {
  const { token, removeToken, setToken } = useToken()

  return (
    <div>
      <Header token={token} removeToken={removeToken}/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/teacher" element={
            !token && token !== '' && token !== undefined ?
              <TeacherLogin setToken={setToken}/> :
              <Teacher
                token={token}
                setToken={setToken}
                removeToken={removeToken}
              />
          }/>
          <Route path="/student/portal" element={<ChooseTopic/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
