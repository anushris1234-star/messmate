import { Link } from "react-router-dom"
import { useState } from "react"

function Feedback() {
  const [rating, setRating] = useState(0)
  const [meal, setMeal] = useState("Breakfast")
  const [category, setCategory] = useState("Food Quality")
  const [comment, setComment] = useState("")

  function handleSubmit(event) {
    event.preventDefault()

    console.log({
      meal,
      rating,
      category,
      comment,
    })

    alert("Thank you for your feedback! 🍱")
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
          <p className="tagline">SHARE YOUR EXPERIENCE</p>

          <h1>How was your meal?</h1>

          <p>
            Your feedback helps us improve the mess for everyone.
          </p>
        </div>

        <form className="feedback-card" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Meal</label>

            <select
              value={meal}
              onChange={(event) => setMeal(event.target.value)}
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </select>
          </div>

          <div className="form-group">
            <label>Rating</label>

            <div className="rating-options">
              {[1, 2, 3, 4, 5].map((number) => (
                <button
                  type="button"
                  key={number}
                  onClick={() => setRating(number)}
                  className={
                    rating === number ? "selected-rating" : ""
                  }
                >
                  {number} ⭐
                </button>
              ))}
            </div>

            <p className="rating-text">
              {rating === 0
                ? "Select a rating"
                : `You selected ${rating} out of 5`}
            </p>
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>Food Quality</option>
              <option>Taste</option>
              <option>Quantity</option>
              <option>Hygiene</option>
              <option>Variety</option>
            </select>
          </div>

          <div className="form-group">
            <label>Comments</label>

            <textarea
              placeholder="Tell us what you think..."
              rows="5"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>
        </form>
      </main>
    </div>
  )
}

export default Feedback