import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Admin() {
  const [mealCount, setMealCount] = useState(0)
  const [feedbackCount, setFeedbackCount] = useState(0)
  const [issueCount, setIssueCount] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://messmate-awmh.onrender.com/api/meals")
      .then((response) => response.json())
      .then((data) => {
        setMealCount(data.length)
      })
      .catch((error) => {
        console.error("Error fetching meals:", error)
      })

    fetch("https://messmate-awmh.onrender.com/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedbackCount(data.length)
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error)
      })

    fetch("https://messmate-awmh.onrender.com/api/issues")
      .then((response) => response.json())
      .then((data) => {
        setIssueCount(data.length)
      })
      .catch((error) => {
        console.error("Error fetching issues:", error)
      })
  }, [])

  function handleLogout() {
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">
          <span className="logo-mark">M</span>
          <span>MessMate</span>
        </div>

        <div className="nav-links">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/meals">Meals</Link>
          <Link to="/admin/feedback">Feedback</Link>
          <Link to="/admin/issues">Issues</Link>
        </div>

        <button onClick={handleLogout} className="login-btn">
          Logout
        </button>
      </nav>

      <main className="admin-dashboard">

        <section className="admin-welcome">

          <div>
            <p className="tagline">ADMINISTRATION</p>

            <h1>
              Good evening,
              <br />
              <span>Admin.</span>
            </h1>

            <p>
              Keep the mess running smoothly and stay on top
              of what students are saying.
            </p>
          </div>

          <div className="admin-mark">
            <span>✦</span>
          </div>

        </section>

        <section className="admin-overview">

          <div className="admin-section-heading">
            <div>
              <p className="section-label">OVERVIEW</p>
              <h2>At a glance</h2>
            </div>
          </div>

          <div className="admin-stats">

            <div className="admin-stat-card">
              <div className="admin-stat-icon">🍽</div>

              <div className="admin-stat-content">
                <span>Total Meals</span>
                <strong>{mealCount}</strong>
              </div>

              <Link to="/admin/meals">→</Link>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">★</div>

              <div className="admin-stat-content">
                <span>Feedback Received</span>
                <strong>{feedbackCount}</strong>
              </div>

              <Link to="/admin/feedback">→</Link>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">!</div>

              <div className="admin-stat-content">
                <span>Reported Issues</span>
                <strong>{issueCount}</strong>
              </div>

              <Link to="/admin/issues">→</Link>
            </div>

          </div>

        </section>

        <section className="admin-management">

          <div className="admin-section-heading">
            <div>
              <p className="section-label">MANAGEMENT</p>
              <h2>What needs your attention?</h2>
            </div>
          </div>

          <div className="admin-action-grid">

            <Link to="/admin/meals" className="admin-action-card">

              <div className="admin-action-number">
                01
              </div>

              <div className="admin-action-content">
                <h3>Manage Meals</h3>

                <p>
                  Add today's menu, update existing meals,
                  or remove outdated entries.
                </p>
              </div>

              <span className="admin-action-arrow">
                →
              </span>

            </Link>

            <Link to="/admin/feedback" className="admin-action-card">

              <div className="admin-action-number">
                02
              </div>

              <div className="admin-action-content">
                <h3>Review Feedback</h3>

                <p>
                  Understand student experiences and
                  identify areas for improvement.
                </p>
              </div>

              <span className="admin-action-arrow">
                →
              </span>

            </Link>

            <Link to="/admin/issues" className="admin-action-card">

              <div className="admin-action-number">
                03
              </div>

              <div className="admin-action-content">
                <h3>Manage Issues</h3>

                <p>
                  Review reported problems and keep track
                  of their resolution status.
                </p>
              </div>

              <span className="admin-action-arrow">
                →
              </span>

            </Link>

          </div>

        </section>

      </main>
    </div>
  )
}

export default Admin