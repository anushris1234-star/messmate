import { Link } from "react-router-dom"

function Home() {
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

      <main className="hero">
        <section className="hero-content">
          <p className="tagline">SMARTER MESS MANAGEMENT</p>

          <h1>
            Your mess.
            <br />
            <span>Your voice.</span>
          </h1>

          <p className="description">
            View your mess menu, share your feedback, report issues,
            and help make your dining experience better.
          </p>

          <div className="hero-buttons">
            <Link to="/menu" className="primary-btn">
              View Today's Menu
            </Link>

            <Link to="/feedback" className="secondary-btn">
              Give Feedback
            </Link>
          </div>
        </section>

        <section className="hero-card">
          <div className="card-header">
            <span>Today's Menu</span>
            <span>🍽️</span>
          </div>

          <div className="meal">
            <div>
              <h3>Breakfast</h3>
              <p>Idli • Sambar • Coconut Chutney</p>
            </div>

            <span>🌅</span>
          </div>

          <div className="meal">
            <div>
              <h3>Lunch</h3>
              <p>Rice • Dal • Paneer • Salad</p>
            </div>

            <span>☀️</span>
          </div>

          <div className="meal">
            <div>
              <h3>Dinner</h3>
              <p>Roti • Curry • Rice • Dessert</p>
            </div>

            <span>🌙</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home