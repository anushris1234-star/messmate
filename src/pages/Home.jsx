import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Home() {
  const [meals, setMeals] = useState([])
  const [feedback, setFeedback] = useState([])
  const [issues, setIssues] = useState([])

  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:5000/api/meals")
      .then((response) => response.json())
      .then((data) => setMeals(data))

    fetch("http://localhost:5000/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedback(data))

    fetch("http://localhost:5000/api/issues")
      .then((response) => response.json())
      .then((data) => setIssues(data))
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
          <Link to="/student">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/feedback">Feedback</Link>
          <Link to="/issues">Issues</Link>
        </div>

        <button onClick={handleLogout} className="login-btn">
          Logout
        </button>
      </nav>

      <main className="student-dashboard">

        <section className="dashboard-welcome">
          <div>
            <p className="tagline">STUDENT DASHBOARD</p>

            <h1>
              Welcome back,
              <br />
              <span>{user?.name}</span>
            </h1>

            <p className="welcome-text">
              Stay updated with today's meals and make your voice heard.
            </p>
          </div>

          <div className="welcome-decoration">
            <div className="decoration-circle"></div>
            <span>🍽</span>
          </div>
        </section>

        <section className="dashboard-stats">

          <div className="stat-card">
            <div className="stat-icon">🍽</div>

            <div>
              <p>Meals Available</p>
              <h3>{meals.length}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">★</div>

            <div>
              <p>Feedback Submitted</p>
              <h3>{feedback.length}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">!</div>

            <div>
              <p>Issues Reported</p>
              <h3>{issues.length}</h3>
            </div>
          </div>

        </section>

        <section className="dashboard-menu-preview">

          <div className="section-heading">
            <div>
              <p className="section-label">TODAY</p>
              <h2>What's on the menu?</h2>
            </div>

            <Link to="/menu" className="text-link">
              View full menu →
            </Link>
          </div>

          <div className="dashboard-meal-grid">

            {meals.slice(0, 3).map((meal) => (
              <div className="dashboard-meal-card" key={meal.meal_id}>

                <div className="dashboard-meal-top">
                  <span className="dashboard-meal-icon">
                    {meal.meal_type === "Breakfast"
                      ? "☀"
                      : meal.meal_type === "Lunch"
                      ? "◐"
                      : "☾"}
                  </span>

                  <span className="meal-label">
                    {meal.meal_type}
                  </span>
                </div>

                <p className="dashboard-meal-items">
                  {meal.items}
                </p>

                <p className="dashboard-meal-time">
                  {meal.start_time.slice(0, 5)} – {meal.end_time.slice(0, 5)}
                </p>

              </div>
            ))}

          </div>
        </section>

        <section className="quick-actions">

          <div className="section-heading">
            <div>
              <p className="section-label">GET INVOLVED</p>
              <h2>What would you like to do?</h2>
            </div>
          </div>

          <div className="action-grid">

            <Link to="/feedback" className="action-card">
              <div className="action-icon">★</div>

              <div>
                <h3>Give Feedback</h3>
                <p>
                  Share your thoughts about today's meals.
                </p>
              </div>

              <span className="action-arrow">→</span>
            </Link>

            <Link to="/issues" className="action-card">
              <div className="action-icon">!</div>

              <div>
                <h3>Report an Issue</h3>
                <p>
                  Let the mess team know when something needs attention.
                </p>
              </div>

              <span className="action-arrow">→</span>
            </Link>

          </div>

        </section>

      </main>
    </div>
  )
}

export default Home