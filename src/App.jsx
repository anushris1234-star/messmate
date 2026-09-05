import Login from "./pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Feedback from "./pages/Feedback"
import Issues from "./pages/Issues"

import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

