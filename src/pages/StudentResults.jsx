import { useEffect, useState } from "react";
import { resultAPI } from "../api";
import StudentNavbar from "../components/StudentNavbar";
import "../App.css";

function StudentResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    resultAPI.getAll()
      .then(({ results }) => setResults(results))
      .catch(console.error);
  }, []);

  const getScoreColor = (score, total) => {
    const pct = (score / total) * 100;
    if (pct >= 80) return "score-high";
    if (pct >= 50) return "score-mid";
    return "score-low";
  };

  const getScoreLabel = (score, total) => {
    const pct = (score / total) * 100;
    if (pct >= 80) return "Excellent";
    if (pct >= 50) return "Passed";
    return "Needs Work";
  };

  return (
    <div className="dashboard-root">
      <StudentNavbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">My Results</h2>
            <p className="dashboard-subtitle">
              {results.length} quiz{results.length !== 1 ? "zes" : ""} attempted
            </p>
          </div>
          <div className="dashboard-badge">Student</div>
        </div>

        {results.length > 0 && (
          <div className="stats-grid">
            <div className="stat-card stat-card--primary">
              <div className="stat-icon">📝</div>
              <div className="stat-info">
                <span className="stat-value">{results.length}</span>
                <span className="stat-label">Attempted</span>
              </div>
            </div>
            <div className="stat-card stat-card--soft">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <span className="stat-value">
                  {Math.round(results.reduce((acc, r) => acc + (r.score / r.total) * 100, 0) / results.length)}%
                </span>
                <span className="stat-label">Avg Score</span>
              </div>
            </div>
            <div className="stat-card stat-card--pale">
              <div className="stat-icon">🏆</div>
              <div className="stat-info">
                <span className="stat-value">
                  {Math.max(...results.map((r) => Math.round((r.score / r.total) * 100)))}%
                </span>
                <span className="stat-label">Best Score</span>
              </div>
            </div>
          </div>
        )}

        {results.length === 0 ? (
          <section className="dashboard-card">
            <p className="empty-state">You haven't attempted any quizzes yet.</p>
          </section>
        ) : (
          <section className="dashboard-card">
            <h3 className="card-title">Quiz History</h3>
            <ul className="results-list">
              {results.map((r, i) => (
                <li className="result-item" key={i}>
                  <div className="result-avatar sr-avatar">{r.quizName?.charAt(0).toUpperCase()}</div>
                  <div className="result-info">
                    <span className="result-name">{r.quizName}</span>
                    <span className="result-meta">Class: {r.studentClass}</span>
                  </div>
                  <div className="sr-right">
                    <span className={`sr-label ${getScoreColor(r.score, r.total)}`}>
                      {getScoreLabel(r.score, r.total)}
                    </span>
                    <div className={`result-score ${getScoreColor(r.score, r.total)}`}>
                      <span className="result-score-num">{r.score}</span>
                      <span className="result-score-total">/{r.total}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default StudentResults;
