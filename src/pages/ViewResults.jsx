import { useEffect, useState } from "react";
import { quizAPI, resultAPI } from "../api";
import AdminNavbar from "../components/AdminNavbar";
import "../App.css";

function ViewResults() {
  const [quizzes, setQuizzes]               = useState([]);
  const [results, setResults]               = useState([]);
  const [selectedQuiz, setSelectedQuiz]     = useState(null);
  const [selectedQuizTitle, setSelectedQuizTitle] = useState("");

  useEffect(() => {
    quizAPI.getAll().then(({ quizzes }) => setQuizzes(quizzes)).catch(console.error);
  }, []);

  async function showResults(quizId, quizTitle) {
    setSelectedQuiz(quizId);
    setSelectedQuizTitle(quizTitle);
    try {
      const { results } = await resultAPI.getByQuiz(quizId);
      setResults(results);
    } catch (err) { console.error(err); }
  }

  function goBack() {
    setSelectedQuiz(null);
    setSelectedQuizTitle("");
    setResults([]);
  }

  const getScoreColor = (score, total) => {
    const pct = (score / total) * 100;
    if (pct >= 80) return "score-high";
    if (pct >= 50) return "score-mid";
    return "score-low";
  };

  return (
    <div className="dashboard-root">
      <AdminNavbar />
      <div className="dashboard-container">

        {selectedQuiz === null && (
          <>
            <div className="dashboard-header">
              <div>
                <h2 className="dashboard-title">View Results</h2>
                <p className="dashboard-subtitle">Select a quiz to see student attempts</p>
              </div>
              <div className="dashboard-badge">Results</div>
            </div>

            {quizzes.length === 0 ? (
              <section className="dashboard-card">
                <p className="empty-state">No quizzes available.</p>
              </section>
            ) : (
              <div className="quiz-list">
                {quizzes.map((q) => (
                  <section className="dashboard-card quiz-card" key={q._id}>
                    <div className="quiz-card-left">
                      <div className="quiz-icon">📊</div>
                      <div className="quiz-meta">
                        <h3 className="quiz-name">{q.title}</h3>
                        <span className="quiz-id">ID: {q._id}</span>
                      </div>
                    </div>
                    <div className="quiz-card-right">
                      <button className="btn btn--primary btn--sm" onClick={() => showResults(q._id, q.title)}>
                        View Results →
                      </button>
                    </div>
                  </section>
                ))}
              </div>
            )}
          </>
        )}

        {selectedQuiz !== null && (
          <>
            <div className="dashboard-header">
              <div>
                <h2 className="dashboard-title">{selectedQuizTitle}</h2>
                <p className="dashboard-subtitle">
                  {results.length} student{results.length !== 1 ? "s" : ""} attempted this quiz
                </p>
              </div>
              <button className="btn btn--outline" onClick={goBack}>← Back</button>
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
                      <div className="result-avatar">{r.studentName?.charAt(0).toUpperCase()}</div>
                      <div className="result-info">
                        <span className="result-name">{r.studentName}</span>
                        <span className="result-meta">Class: {r.studentClass}</span>
                      </div>
                      <div className={`result-score ${getScoreColor(r.score, r.total)}`}>
                        <span className="result-score-num">{r.score}</span>
                        <span className="result-score-total">/{r.total}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ViewResults;
