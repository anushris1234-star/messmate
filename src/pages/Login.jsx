import { Link } from "react-router-dom"
import { useState } from "react"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(event) {
    event.preventDefault()

    console.log({
      email,
      password,
    })

    alert("Login successful! 👋")
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          🍱 <span>MessMate</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/feedback">Feedback</Link>
          <Link to="/issues">Issues</Link>
        </div>

        <Link to="/login" className="login-btn">Login</Link>
        </nav>

      <main className="login-page">
        <div className="login-card">
          <div className="login-header">
            <p className="tagline">WELCOME BACK</p>

            <h1>Login to MessMate</h1>

            <p>
              Access your mess management dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login