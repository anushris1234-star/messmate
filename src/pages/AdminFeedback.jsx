import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

function AdminFeedback() {
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    fetch("https://messmate-awmh.onrender.com/api//api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedback(data)
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error)
      })
  }, [])

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

        <Link to="/admin" className="login-btn">
          Dashboard
        </Link>
      </nav>

      <main className="admin-feedback-page">

        <section className="admin-feedback-intro">

          <div>
            <p className="tagline">FEEDBACK MANAGEMENT</p>

            <h1>
              Listen to
              <br />
              <span>your students.</span>
            </h1>

            <p>
              Review what students are saying about their
              meals and use their experiences to improve
              the mess.
            </p>
          </div>

          <div className="feedback-summary-mark">
            <span>★</span>
          </div>

        </section>

        <section className="feedback-section">

          <div className="feedback-section-heading">

            <div>
              <p className="section-label">STUDENT VOICE</p>

              <h2>Recent feedback</h2>
            </div>

            <span>
              {feedback.length} responses
            </span>

          </div>

          <div className="admin-feedback-list">

            {feedback.length === 0 ? (

              <div className="feedback-empty">
                <div className="empty-icon">★</div>

                <h2>No feedback yet</h2>

                <p>
                  Student feedback will appear here once
                  someone submits a response.
                </p>
              </div>

            ) : (

              feedback.map((item) => (

                <article
                  className="admin-feedback-card"
                  key={item.feedback_id}
                >

                  <div className="feedback-card-top">

                    <div className="feedback-meal">

                      <span className="feedback-meal-icon">
                        {item.meal_type === "Breakfast"
                          ? "☀"
                          : item.meal_type === "Lunch"
                          ? "◐"
                          : "☾"}
                      </span>

                      <div>
                        <h3>{item.meal_type}</h3>

                        <span>{item.category}</span>
                      </div>

                    </div>

                    <div className="feedback-rating">

                      <strong>{item.rating}</strong>

                      <span>
                        {"★".repeat(item.rating)}
                        <span className="empty-stars">
                          {"★".repeat(5 - item.rating)}
                        </span>
                      </span>

                    </div>

                  </div>

                  <div className="feedback-divider"></div>

                  <p className="feedback-comment">
                    {item.comment ||
                      "No comment was provided."}
                  </p>

                  <div className="feedback-card-footer">

                    <span>
                      Feedback #{String(item.feedback_id).padStart(2, "0")}
                    </span>

                    <span>
                      {new Date(
                        item.created_at
                      ).toLocaleString()}
                    </span>

                  </div>

                </article>

              ))

            )}

          </div>

        </section>

      </main>
    </div>
  )
}

export default AdminFeedback