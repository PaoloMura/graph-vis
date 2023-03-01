import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ChooseTopic from './components/ChooseTopic'
import Home from './components/Home'
import TeacherLogin from './components/TeacherLogin'
import TeacherSignup from './components/TeacherSignup'

function App () {
  return (
    <div>
      <h1 id={'title'}>Graph Theory Question Generator</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/teacher-login" element={<TeacherLogin/>}/>
          <Route path="/teacher-signup" element={<TeacherSignup/>}/>
          <Route path="/choose-topic" element={<ChooseTopic/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
