import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import AdminNavbar from "../components/AdminNavbar";
import "../App.css";

function AdminDashboard() {
  const [quizCount, setQuizCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [recentResults, setRecentResults] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const quizzes = await getDocs(collection(db, "quizzes"));
    setQuizCount(quizzes.size);

    const users = await getDocs(collection(db, "users"));
    let students = 0;
    users.forEach((u) => {
      if (u.data().role === "student") students++;
    });
    setStudentCount(students);

    const results = await getDocs(collection(db, "results"));
    setAttemptCount(results.size);

    const list = [];
    results.forEach((r) => list.push(r.data()));
    setRecentResults(list.slice(0, 5));
  }

  const topStudents = [...recentResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="dashboard-root">
      <AdminNavbar />

      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">Teacher Dashboard</h2>
            <p className="dashboard-subtitle">Welcome back, <span>{user.username}</span></p>
          </div>
          <div className="dashboard-badge">Admin</div>
        </div>

        {/* Stats Cards */}
        <section className="stats-grid">
          <div className="stat-card stat-card--primary">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <span className="stat-value">{quizCount}</span>
              <span className="stat-label">Total Quizzes</span>
            </div>
          </div>
          <div className="stat-card stat-card--soft">
            <div className="stat-icon">🎓</div>
            <div className="stat-info">
              <span className="stat-value">{studentCount}</span>
              <span className="stat-label">Total Students</span>
            </div>
          </div>
          <div className="stat-card stat-card--pale">
            <div className="stat-icon">⚡</div>
            <div className="stat-info">
              <span className="stat-value">{attemptCount}</span>
              <span className="stat-label">Total Attempts</span>
            </div>
          </div>
        </section>

        <div className="dashboard-grid">
          {/* Recent Attempts */}
          <section className="dashboard-card">
            <h3 className="card-title">Recent Student Attempts</h3>
            {recentResults.length === 0 ? (
              <p className="empty-state">No attempts yet</p>
            ) : (
              <ul className="attempts-list">
                {recentResults.map((r, i) => (
                  <li key={i} className="attempt-item">
                    <div className="attempt-avatar">
                      {r.studentName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="attempt-info">
                      <span className="attempt-name">{r.studentName}</span>
                      <span className="attempt-quiz">{r.quizName}</span>
                    </div>
                    <div className="attempt-score">
                      <span className="score-num">{r.score}</span>
                      <span className="score-sep">/{r.total}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Top Students */}
          <section className="dashboard-card">
            <h3 className="card-title">Top Students</h3>
            {topStudents.length === 0 ? (
              <p className="empty-state">No data yet</p>
            ) : (
              <ul className="top-list">
                {topStudents.map((r, i) => (
                  <li key={i} className={`top-item top-item--${i}`}>
                    <span className="top-medal">{medals[i]}</span>
                    <div className="top-info">
                      <span className="top-name">{r.studentName}</span>
                    </div>
                    <div className="top-score">
                      {r.score}<span>/{r.total}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;