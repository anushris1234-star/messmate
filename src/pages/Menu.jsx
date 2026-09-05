import { Link } from "react-router-dom"

function Menu() {
  const meals = [
    {
      type: "Breakfast",
      time: "7:30 AM - 9:00 AM",
      items: ["Idli", "Sambar", "Coconut Chutney", "Tea"],
      icon: "🌅",
    },
    {
      type: "Lunch",
      time: "12:30 PM - 2:00 PM",
      items: ["Rice", "Dal", "Paneer Curry", "Vegetable Salad", "Curd"],
      icon: "☀️",
    },
    {
      type: "Dinner",
      time: "7:30 PM - 9:00 PM",
      items: ["Roti", "Mixed Vegetable Curry", "Jeera Rice", "Dal", "Dessert"],
      icon: "🌙",
    },
  ]

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

      <main className="menu-page">
        <div className="menu-header">
          <p className="tagline">TODAY'S MENU</p>

          <h1>What's cooking? 🍽️</h1>

          <p>
            Check out today's meals and plan your day at the mess.
          </p>
        </div>

        <div className="meal-grid">
          {meals.map((meal) => (
            <div className="menu-card" key={meal.type}>
              <div className="menu-card-header">
                <div>
                  <h2>{meal.type}</h2>
                  <p className="meal-time">{meal.time}</p>
                </div>

                <span className="meal-icon">{meal.icon}</span>
              </div>

              <ul>
                {meal.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Menu