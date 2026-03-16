import { useLocation, useNavigate } from "react-router-dom";
import StudentNavbar from "../components/StudentNavbar";
import "../App.css";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || {};

  const user = JSON.parse(localStorage.getItem("user"));

  const pct = total ? Math.round((score / total) * 100) : 0;

  const getGrade = () => {
    if (pct >= 90) return { label: "A+", emoji: "🏆", msg: "Outstanding performance!" };
    if (pct >= 80) return { label: "A",  emoji: "🥇", msg: "Excellent work!" };
    if (pct >= 70) return { label: "B",  emoji: "🥈", msg: "Great job!" };
    if (pct >= 50) return { label: "C",  emoji: "🥉", msg: "You passed!" };
    return               { label: "F",  emoji: "📚", msg: "Keep practising!" };
  };

  const grade = getGrade();

  const scoreClass =
    pct >= 80 ? "score-high" : pct >= 50 ? "score-mid" : "score-low";

  const circumference = 2 * Math.PI * 54; // r=54
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <div className="dashboard-root">
      <StudentNavbar />

      <div className="dashboard-container">

        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">Quiz Complete</h2>
            <p className="dashboard-subtitle">Here's how you did, {user?.username}</p>
          </div>
          <button className="btn btn--outline" onClick={() => navigate("/student")}>
            ← Dashboard
          </button>
        </div>

        {/* Hero Result Card */}
        <section className={`rp-hero dashboard-card`}>
          <div className="rp-hero-left">
            {/* Circular progress */}
            <div className="rp-circle-wrap">
              <svg className="rp-circle-svg" viewBox="0 0 120 120">
                <circle
                  cx="60" cy="60" r="54"
                  fill="none"
                  stroke="rgba(99,103,255,0.10)"
                  strokeWidth="10"
                />
                <circle
                  cx="60" cy="60" r="54"
                  fill="none"
                  className={`rp-circle-arc ${scoreClass}`}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="rp-circle-inner">
                <span className="rp-pct">{pct}%</span>
                <span className="rp-grade-label">{grade.label}</span>
              </div>
            </div>
          </div>

          <div className="rp-hero-right">
            <div className="rp-emoji">{grade.emoji}</div>
            <h3 className="rp-msg">{grade.msg}</h3>
            <p className="rp-score-text">
              You scored <strong>{score}</strong> out of <strong>{total}</strong> questions correctly.
            </p>
            <span className={`sr-label rp-badge ${scoreClass}`}>
              {pct >= 80 ? "Excellent" : pct >= 50 ? "Passed" : "Needs Work"}
            </span>
          </div>
        </section>

        {/* Breakdown Stats */}
        <div className="stats-grid">
          <div className="stat-card stat-card--primary">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-value">{score}</span>
              <span className="stat-label">Correct</span>
            </div>
          </div>
          <div className="stat-card stat-card--soft">
            <div className="stat-icon">❌</div>
            <div className="stat-info">
              <span className="stat-value">{total - score}</span>
              <span className="stat-label">Incorrect</span>
            </div>
          </div>
          <div className="stat-card stat-card--pale">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <span className="stat-value">{total}</span>
              <span className="stat-label">Total Questions</span>
            </div>
          </div>
          <div className="stat-card stat-card--blush">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <span className="stat-value">{pct}%</span>
              <span className="stat-label">Accuracy</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="dashboard-card rp-cta">
          <div className="rp-cta-text">
            <h3 className="rp-cta-title">What's next?</h3>
            <p className="rp-cta-sub">Browse more quizzes or check your full result history.</p>
          </div>
          <div className="rp-cta-btns">
            <button className="btn btn--primary" onClick={() => navigate("/student")}>
              🏠 More Quizzes
            </button>
            <button className="btn btn--outline" onClick={() => navigate("/my-results")}>
              📊 My Results
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default ResultPage;