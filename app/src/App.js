import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ChooseTopic from './components/pages/ChooseTopic'
import Home from './components/pages/Home'
import TeacherLogin from './components/pages/TeacherLogin'
import useToken from './components/functions/useToken'
import Teacher from './components/pages/Teacher'
import Header from './components/pages/Header'

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
