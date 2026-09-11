import { Link } from "react-router-dom"
import { useState } from "react"

function Feedback() {
  const [rating, setRating] = useState(0)
  const [meal, setMeal] = useState("Breakfast")
  const [category, setCategory] = useState("Food Quality")
  const [comment, setComment] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    if (rating === 0) {
      alert("Please select a rating.")
      return
    }

    const mealIds = {
      Breakfast: 1,
      Lunch: 2,
      Dinner: 3,
    }

    const feedback = {
      meal_id: mealIds[meal],
      rating,
      category,
      comment,
    }

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Thank you for your feedback! 🍱")

        console.log(data)

        setRating(0)
        setMeal("Breakfast")
        setCategory("Food Quality")
        setComment("")
      } else {
        alert("Failed to submit feedback.")
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

      <main className="feedback-page">

        <section className="feedback-intro">
          <p className="tagline">SHARE YOUR EXPERIENCE</p>

          <h1>
            Every meal has
            <br />
            a story to tell.
          </h1>

          <p>
            Tell us what worked, what didn't, and what
            could make your next meal better.
          </p>

          <div className="feedback-quote">
            <span>✦</span>
            <p>
              Thoughtful feedback helps create a better
              dining experience for everyone.
            </p>
          </div>
        </section>

        <form className="feedback-card" onSubmit={handleSubmit}>

          <div className="feedback-card-header">
            <p className="section-label">YOUR FEEDBACK</p>

            <h2>How was your meal?</h2>

            <p>
              It only takes a moment.
            </p>
          </div>

          <div className="form-group">
            <label>Which meal?</label>

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
            <label>How would you rate it?</label>

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
                  <span>{number}</span>
                  <small>★</small>
                </button>
              ))}
            </div>

            <p className="rating-text">
              {rating === 0
                ? "Select a rating from 1 to 5"
                : rating === 1
                ? "Not quite what you hoped for."
                : rating === 2
                ? "There is room for improvement."
                : rating === 3
                ? "A decent meal."
                : rating === 4
                ? "Quite a good meal."
                : "Excellent. Keep it up!"}
            </p>
          </div>

          <div className="form-group">
            <label>What would you like to comment on?</label>

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
            <span>→</span>
          </button>

        </form>

      </main>
    </div>
  )
}

export default Feedback