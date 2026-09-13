import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

function AdminIssues() {
  const [issues, setIssues] = useState([])

  useEffect(() => {
    fetch("https://messmate-awmh.onrender.com/api/issues")
      .then((response) => response.json())
      .then((data) => {
        setIssues(data)
      })
      .catch((error) => {
        console.error("Error fetching issues:", error)
      })
  }, [])

  async function handleStatusChange(issueId, newStatus) {
    try {
      const response = await fetch(
        `https://messmate-awmh.onrender.com/api/issues/${issueId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        setIssues(
          issues.map((issue) =>
            issue.issue_id === issueId ? data : issue
          )
        )

        alert("Issue status updated! ✅")
      } else {
        alert(data.message || "Failed to update issue.")
      }
    } catch (error) {
      console.error(error)
      alert("Could not connect to the server.")
    }
  }

  async function handleDelete(issueId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this issue?"
    )

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(
        `https://messmate-awmh.onrender.com/api//api/issues/${issueId}`,
        {
          method: "DELETE",
        }
      )

      const data = await response.json()

      if (response.ok) {
        setIssues(
          issues.filter((issue) => issue.issue_id !== issueId)
        )

        alert("Issue deleted successfully! 🗑️")
      } else {
        alert(data.message || "Failed to delete issue.")
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
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/meals">Meals</Link>
          <Link to="/admin/feedback">Feedback</Link>
          <Link to="/admin/issues">Issues</Link>
        </div>

        <Link to="/admin" className="login-btn">
          Dashboard
        </Link>
      </nav>

      <main className="admin-issues-page">

        <section className="admin-issues-intro">

          <div>
            <p className="tagline">ISSUE MANAGEMENT</p>

            <h1>
              Keep things
              <br />
              <span>on track.</span>
            </h1>

            <p>
              Review reported problems, update their status,
              and make sure nothing gets left unresolved.
            </p>
          </div>

          <div className="issues-summary-mark">
            <span>!</span>
          </div>

        </section>

        <section className="issues-section">

          <div className="issues-section-heading">

            <div>
              <p className="section-label">STUDENT REPORTS</p>

              <h2>Reported issues</h2>
            </div>

            <span>
              {issues.length} reports
            </span>

          </div>

          <div className="admin-issues-list">

            {issues.length === 0 ? (

              <div className="feedback-empty">

                <div className="empty-icon">✓</div>

                <h2>No reported issues</h2>

                <p>
                  Student-reported issues will appear here
                  when they need attention.
                </p>

              </div>

            ) : (

              issues.map((issue) => (

                <article
                  className="admin-issue-card"
                  key={issue.issue_id}
                >

                  <div className="issue-card-number">
                    {String(issue.issue_id).padStart(2, "0")}
                  </div>

                  <div className="issue-details">

                    <div className="issue-title-row">

                      <h3>{issue.issue_type}</h3>

                      <span
                        className={`issue-status ${issue.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {issue.status}
                      </span>

                    </div>

                    <p className="issue-description">
                      {issue.description}
                    </p>

                    <span className="issue-date">
                      Reported{" "}
                      {new Date(
                        issue.created_at
                      ).toLocaleString()}
                    </span>

                  </div>

                  <div className="issue-actions">

                    <select
                      value={issue.status}
                      onChange={(event) =>
                        handleStatusChange(
                          issue.issue_id,
                          event.target.value
                        )
                      }
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>

                    <button
                      onClick={() =>
                        handleDelete(issue.issue_id)
                      }
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

export default AdminIssues