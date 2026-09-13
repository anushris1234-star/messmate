const express = require("express")
const cors = require("cors")
const pool = require("./db")

const app = express()
const PORT = process.env.PORT || 5000
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL)

app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
  res.send("MessMate backend is running!")
})

app.get("/api/test", (req, res) => {
  res.json({
    message: "MessMate API is working!",
  })
})

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()")

    res.json({
      message: "Database connected successfully!",
      time: result.rows[0].now,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Database connection failed",
    })
  }
})

app.post("/api/feedback", async (req, res) => {
  try {
    const { meal_id, rating, category, comment } = req.body

    const result = await pool.query(
      `INSERT INTO feedback (meal_id, rating, category, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [meal_id, rating, category, comment]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Failed to submit feedback",
    })
  }
})

app.get("/api/meals", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM meals ORDER BY meal_id")

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Failed to fetch meals",
    })
  }
})

app.post("/api/meals", async (req, res) => {
  try {
    const {
      meal_date,
      meal_type,
      items,
      start_time,
      end_time,
    } = req.body

    const result = await pool.query(
      `INSERT INTO meals
       (meal_date, meal_type, items, start_time, end_time)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [meal_date, meal_type, items, start_time, end_time]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Failed to add meal",
    })
  }
})
app.put("/api/meals/:id", async (req, res) => {
  try {
    const {
      meal_date,
      meal_type,
      items,
      start_time,
      end_time,
    } = req.body

    const { id } = req.params

    const result = await pool.query(
      `UPDATE meals
       SET meal_date = $1,
           meal_type = $2,
           items = $3,
           start_time = $4,
           end_time = $5
       WHERE meal_id = $6
       RETURNING *`,
      [meal_date, meal_type, items, start_time, end_time, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Meal not found",
      })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Failed to update meal",
    })
  }
})

app.delete("/api/meals/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      "DELETE FROM meals WHERE meal_id = $1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Meal not found",
      })
    }

    res.json({
      message: "Meal deleted successfully",
      meal: result.rows[0],
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Failed to delete meal",
    })
  }
})
app.get("/api/feedback", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT feedback.*, meals.meal_type
       FROM feedback
       JOIN meals ON feedback.meal_id = meals.meal_id
       ORDER BY feedback.created_at DESC`
    )

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Failed to fetch feedback",
    })
  }
})

app.post("/api/issues", async (req, res) => {
  try {
    const { issue_type, description } = req.body

    const result = await pool.query(
      `INSERT INTO issues (issue_type, description)
       VALUES ($1, $2)
       RETURNING *`,
      [issue_type, description]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Failed to report issue",
    })
  }
})
app.get("/api/issues", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM issues ORDER BY created_at DESC"
    )

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Failed to fetch issues",
    })
  }
})

app.put("/api/issues/:id", async (req, res) => {
  try {
    const { status } = req.body
    const { id } = req.params

    const result = await pool.query(
      `UPDATE issues
       SET status = $1
       WHERE issue_id = $2
       RETURNING *`,
      [status, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Issue not found",
      })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Failed to update issue",
    })
  }
})

app.delete("/api/issues/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      "DELETE FROM issues WHERE issue_id = $1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Issue not found",
      })
    }

    res.json({
      message: "Issue deleted successfully",
      issue: result.rows[0],
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Failed to delete issue",
    })
  }
})
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const result = await pool.query(
      "SELECT user_id, name, email, role FROM users WHERE email = $1 AND password = $2",
      [email, password]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    res.json({
      message: "Login successful",
      user: result.rows[0],
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Login failed",
    })
  }
})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`)
})