import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Feedback from "./pages/Feedback"
import Issues from "./pages/Issues"
import Admin from "./pages/admin"
import AdminMeals from "./pages/AdminMeals"
import AdminFeedback from "./pages/AdminFeedback"
import AdminIssues from "./pages/AdminIssues2.jsx"

import ProtectedRoute from "./components/ProtectedRoute"

import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/issues"
  element={
    <ProtectedRoute role="admin">
      <AdminIssues />
    </ProtectedRoute>
  }
/>

        <Route
  path="/menu"
  element={
    <ProtectedRoute role="student">
      <Menu />
    </ProtectedRoute>
  }
/>

<Route
  path="/feedback"
  element={
    <ProtectedRoute role="student">
      <Feedback />
    </ProtectedRoute>
  }
/><Route
  path="/admin/feedback"
  element={
    <ProtectedRoute role="admin">
      <AdminFeedback />
    </ProtectedRoute>
  }
/>


<Route
  path="/issues"
  element={
    <ProtectedRoute role="student">
      <Issues />
    </ProtectedRoute>
  }
/>
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/meals"
  element={
    <ProtectedRoute role="admin">
      <AdminMeals />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  )
}

export default App