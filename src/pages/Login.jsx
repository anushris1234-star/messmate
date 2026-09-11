import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const response = await fetch("https://messmate-awmh.onrender.com/api//api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      localStorage.setItem("user", JSON.stringify(data.user))

      if (data.user.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/student")
      }
    } catch (error) {
      console.error(error)
      alert("Could not connect to the server.")
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-mark">M</span>
          <span>MessMate</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/feedback">Feedback</Link>
          <Link to="/issues">Issues</Link>
        </div>

        <Link to="/login" className="login-btn">
          Login
        </Link>
      </nav>

      <main className="login-page">

        <section className="login-intro">

          <p className="tagline">MESSMATE</p>

          <h1>
            Good food
            <br />
            starts with
            <br />
            <span>good communication.</span>
          </h1>

          <p className="login-description">
            Stay connected with your mess, share your experience,
            and help make every meal better.
          </p>

          <div className="login-note">
            <span>✦</span>
            <p>
              Your feedback helps shape tomorrow's menu.
            </p>
          </div>

        </section>

        <section className="login-card">

          <div className="login-header">
            <p className="section-label">WELCOME BACK</p>

            <h2>Sign in</h2>

            <p>
              Access your MessMate account.
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
              Sign in
              <span>→</span>
            </button>

          </form>

          <div className="login-footer">
            <span></span>
            <p>MessMate · Campus Dining</p>
            <span></span>
          </div>

        </section>

      </main>
    </div>
  )
}

export default Login