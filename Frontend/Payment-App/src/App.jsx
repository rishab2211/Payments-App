import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signin } from './Components/Signin'
import { Dashboard } from './Components/dashboard'
import { Send } from './Components/SendMoney'
import { Signup } from './Components/Signup'

function App() {

  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/send" element={<Send/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
