import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

function AdminMeals() {
  const [meals, setMeals] = useState([])

  const [mealDate, setMealDate] = useState("")
  const [mealType, setMealType] = useState("Breakfast")
  const [items, setItems] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  const [editingMealId, setEditingMealId] = useState(null)

  useEffect(() => {
    fetch("https://messmate-awmh.onrender.com/api//api/meals")
      .then((response) => response.json())
      .then((data) => {
        setMeals(data)
      })
      .catch((error) => {
        console.error("Error fetching meals:", error)
      })
  }, [])

  function handleEdit(meal) {
    setEditingMealId(meal.meal_id)
    setMealDate(meal.meal_date)
    setMealType(meal.meal_type)
    setItems(meal.items)
    setStartTime(meal.start_time.slice(0, 5))
    setEndTime(meal.end_time.slice(0, 5))

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const mealData = {
      meal_date: mealDate,
      meal_type: mealType,
      items,
      start_time: startTime,
      end_time: endTime,
    }

    try {
      let response

      if (editingMealId) {
        response = await fetch(
          `https://messmate-awmh.onrender.com/api//api/meals/${editingMealId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(mealData),
          }
        )
      } else {
        response = await fetch("https://messmate-awmh.onrender.com/api//api/meals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mealData),
        })
      }

      const data = await response.json()

      if (response.ok) {
        if (editingMealId) {
          setMeals(
            meals.map((meal) =>
              meal.meal_id === editingMealId ? data : meal
            )
          )

          alert("Meal updated successfully! ✏️")
        } else {
          setMeals([...meals, data])

          alert("Meal added successfully! 🍽️")
        }

        setEditingMealId(null)
        setMealDate("")
        setMealType("Breakfast")
        setItems("")
        setStartTime("")
        setEndTime("")
      } else {
        alert(data.message || "Something went wrong.")
      }
    } catch (error) {
      console.error(error)
      alert("Could not connect to the server.")
    }
  }

  async function handleDelete(mealId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this meal?"
    )

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(
        `https://messmate-awmh.onrender.com/api//api/meals/${mealId}`,
        {
          method: "DELETE",
        }
      )

      const data = await response.json()

      if (response.ok) {
        setMeals(
          meals.filter((meal) => meal.meal_id !== mealId)
        )

        alert("Meal deleted successfully! 🗑️")
      } else {
        alert(data.message || "Failed to delete meal.")
      }
    } catch (error) {
      console.error(error)
      alert("Could not connect to the server.")
    }
  }

  function handleCancelEdit() {
    setEditingMealId(null)
    setMealDate("")
    setMealType("Breakfast")
    setItems("")
    setStartTime("")
    setEndTime("")
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

        <Link to="/admin" className="login-btn">
          Dashboard
        </Link>
      </nav>

      <main className="meal-management-page">

        <section className="management-intro">

          <div>
            <p className="tagline">MEAL MANAGEMENT</p>

            <h1>
              Keep the menu
              <br />
              <span>fresh.</span>
            </h1>

            <p>
              Add meals, update today's offerings, and keep
              the menu students see accurate and up to date.
            </p>
          </div>

          <div className="management-mark">
            <span>🍽</span>
          </div>

        </section>

        <section className="meal-editor">

          <div className="editor-heading">
            <div>
              <p className="section-label">
                {editingMealId ? "EDIT MEAL" : "NEW ENTRY"}
              </p>

              <h2>
                {editingMealId
                  ? "Update meal"
                  : "Add a meal"}
              </h2>
            </div>

            {editingMealId && (
              <span className="editing-badge">
                Editing #{editingMealId}
              </span>
            )}
          </div>

          <form
            className="meal-editor-form"
            onSubmit={handleSubmit}
          >

            <div className="form-group">
              <label>Meal Date</label>

              <input
                type="date"
                value={mealDate}
                onChange={(event) =>
                  setMealDate(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Meal Type</label>

              <select
                value={mealType}
                onChange={(event) =>
                  setMealType(event.target.value)
                }
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
              </select>
            </div>

            <div className="form-group meal-items-field">
              <label>Menu Items</label>

              <input
                type="text"
                value={items}
                onChange={(event) =>
                  setItems(event.target.value)
                }
                placeholder="Example: Idli, Sambar, Chutney"
                required
              />

              <small>
                Separate each item with a comma.
              </small>
            </div>

            <div className="time-fields">

              <div className="form-group">
                <label>Start Time</label>

                <input
                  type="time"
                  value={startTime}
                  onChange={(event) =>
                    setStartTime(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>End Time</label>

                <input
                  type="time"
                  value={endTime}
                  onChange={(event) =>
                    setEndTime(event.target.value)
                  }
                  required
                />
              </div>

            </div>

            <div className="editor-actions">

              <button
                type="submit"
                className="submit-btn"
              >
                {editingMealId
                  ? "Update Meal"
                  : "Add Meal"}

                <span>→</span>
              </button>

              {editingMealId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>

        <section className="existing-meals">

          <div className="management-section-heading">
            <div>
              <p className="section-label">CURRENT MENU</p>

              <h2>All meals</h2>
            </div>

            <span>
              {meals.length} entries
            </span>
          </div>

          <div className="admin-meal-list">

            {meals.length === 0 ? (
              <div className="empty-meals">
                <p>No meals have been added yet.</p>
              </div>
            ) : (
              meals.map((meal) => (
                <article
                  className="admin-meal-card"
                  key={meal.meal_id}
                >

                  <div className="meal-card-number">
                    {String(meal.meal_id).padStart(2, "0")}
                  </div>

                  <div className="admin-meal-info">

                    <div className="admin-meal-title">
                      <h3>{meal.meal_type}</h3>

                      <span>
                        {meal.meal_date}
                      </span>
                    </div>

                    <p className="admin-meal-items">
                      {meal.items}
                    </p>

                    <p className="admin-meal-time">
                      {meal.start_time.slice(0, 5)}
                      {" – "}
                      {meal.end_time.slice(0, 5)}
                    </p>

                  </div>

                  <div className="meal-actions">

                    <button
                      onClick={() => handleEdit(meal)}
                      className="edit-btn"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(meal.meal_id)
                      }
                      className="delete-btn"
                    >
                      Delete
                    </button>

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

export default AdminMeals