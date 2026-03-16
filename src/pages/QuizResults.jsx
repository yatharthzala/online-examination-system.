import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import AdminNavbar from "../components/AdminNavbar";
import "../App.css";

function QuizResults() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    loadResults();
  }, []);

  async function loadResults() {
    const q = query(collection(db, "results"), where("quizId", "==", id));
    const snap = await getDocs(q);
    const list = [];
    snap.forEach((d) => list.push(d.data()));
    setResults(list);
  }

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
      <AdminNavbar />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">Quiz Results</h2>
            <p className="dashboard-subtitle">
              {results.length} student{results.length !== 1 ? "s" : ""} attempted this quiz
            </p>
          </div>
          <div className="dashboard-badge">Results</div>
        </div>

        {results.length === 0 ? (
          <section className="dashboard-card">
            <p className="empty-state">No students have attempted this quiz yet.</p>
          </section>
        ) : (
          <section className="dashboard-card">
            <h3 className="card-title">Student Results</h3>
            <ul className="results-list">
              {results.map((r, i) => (
                <li className="result-item" key={i}>
                  <div className="result-avatar">
                    {r.studentName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="result-info">
                    <span className="result-name">{r.studentName}</span>
                    <span className="result-meta">
                      ID: {r.studentId} &nbsp;·&nbsp; Class: {r.studentClass}
                    </span>
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

export default QuizResults;