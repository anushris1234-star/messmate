import { Link } from "react-router-dom"
import { useState } from "react"

function Issues() {
  const [issueType, setIssueType] = useState("Food Quality")
  const [description, setDescription] = useState("")

  function handleSubmit(event) {
    event.preventDefault()

    console.log({
      issueType,
      description,
    })

    alert("Issue reported successfully! 🛠️")
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

        <button className="login-btn">Login</button>
      </nav>

      <main className="feedback-page">
        <div className="feedback-header">
          <p className="tagline">REPORT A PROBLEM</p>

          <h1>Something wrong?</h1>

          <p>
            Let the mess management team know about an issue.
          </p>
        </div>

        <form className="feedback-card" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Issue Type</label>

            <select
              value={issueType}
              onChange={(event) => setIssueType(event.target.value)}
            >
              <option>Food Quality</option>
              <option>Hygiene</option>
              <option>Food Quantity</option>
              <option>Cleanliness</option>
              <option>Service</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              placeholder="Describe the issue..."
              rows="6"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Report Issue
          </button>
        </form>
      </main>
    </div>
  )
}

export default Issues