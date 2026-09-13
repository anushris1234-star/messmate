import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

function Menu() {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    fetch("https://messmate-awmh.onrender.com/api/meals")
      .then((response) => response.json())
      .then((data) => {
        setMeals(data)
      })
      .catch((error) => {
        console.error("Error fetching meals:", error)
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
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/feedback">Feedback</Link>
          <Link to="/issues">Issues</Link>
        </div>

        <Link to="/login" className="login-btn">
          Login
        </Link>
      </nav>

      <main className="menu-page">

        <section className="menu-intro">
          <p className="tagline">TODAY'S MENU</p>

          <h1>
            Something good
            <br />
            is being served.
          </h1>

          <p>
            Explore today's meals and see what's waiting
            for you at the mess.
          </p>
        </section>

        <section className="menu-content">

          <div className="menu-date">
            <span>MENU FOR TODAY</span>
            <div></div>
          </div>

          <div className="meal-grid">

            {meals.map((meal) => (
              <article className="menu-card" key={meal.meal_id}>

                <div className="menu-card-header">

                  <div>
                    <p className="meal-number">
                      {String(meal.meal_id).padStart(2, "0")}
                    </p>

                    <h2>{meal.meal_type}</h2>
                  </div>

                  <span className="meal-symbol">
                    {meal.meal_type === "Breakfast"
                      ? "☀"
                      : meal.meal_type === "Lunch"
                      ? "◐"
                      : "☾"}
                  </span>

                </div>

                <div className="meal-items">

                  {meal.items.split(", ").map((item, index) => (
                    <div className="menu-item" key={index}>
                      <span className="item-dot"></span>
                      <span>{item}</span>
                    </div>
                  ))}

                </div>

                <div className="meal-time">
                  <span>Serving time</span>

                  <strong>
                    {meal.start_time.slice(0, 5)}
                    {" – "}
                    {meal.end_time.slice(0, 5)}
                  </strong>
                </div>

              </article>
            ))}

          </div>

        </section>

      </main>
    </div>
  )
}

export default Menu