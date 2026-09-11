import { Link } from "react-router-dom"
import { useState } from "react"

function Issues() {
  const [issueType, setIssueType] = useState("Food Quality")
  const [description, setDescription] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    if (!description.trim()) {
      alert("Please describe the issue.")
      return
    }

    const issue = {
      issue_type: issueType,
      description,
    }

    try {
      const response = await fetch("https://messmate-awmh.onrender.com/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issue),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Issue reported successfully! 🛠️")

        console.log(data)

        setIssueType("Food Quality")
        setDescription("")
      } else {
        alert("Failed to report issue.")
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

      <main className="issue-page">

        <section className="issue-intro">

          <p className="tagline">REPORT A PROBLEM</p>

          <h1>
            Something
            <br />
            needs attention?
          </h1>

          <p className="issue-description">
            If something isn't quite right, let the mess
            management team know. Your report helps us
            address problems and improve the dining
            experience.
          </p>

          <div className="issue-note">
            <div className="issue-note-icon">!</div>

            <div>
              <strong>We'll take it from here.</strong>

              <p>
                Describe the problem clearly and we'll make
                sure it reaches the right people.
              </p>
            </div>
          </div>

        </section>

        <section className="issue-card">

          <div className="issue-card-header">
            <p className="section-label">REPORT AN ISSUE</p>

            <h2>What's happening?</h2>

            <p>
              Give us a few details so we can understand the problem.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

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
                rows="7"
                value={description}
                
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Report Issue
              <span>→</span>
            </button>

          </form>

        </section>

      </main>
    </div>
  )
}

export default Issues