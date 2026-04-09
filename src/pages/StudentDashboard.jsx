import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizAPI } from "../api";
import StudentNavbar from "../components/StudentNavbar";
import "../App.css";

function StudentDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    quizAPI.getAll()
      .then(({ quizzes }) => setQuizzes(quizzes))
      .catch(console.error);
  }, []);

  return (
    <div className="dashboard-root">
      <StudentNavbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">Available Quizzes</h2>
            <p className="dashboard-subtitle">
              Welcome, <span>{user?.username}</span> — pick a quiz to begin
            </p>
          </div>
          <button className="btn btn--outline" onClick={() => navigate("/my-results")}>
            📋 My Results
          </button>
        </div>

        {quizzes.length === 0 ? (
          <section className="dashboard-card">
            <p className="empty-state">No quizzes available right now. Check back later!</p>
          </section>
        ) : (
          <div className="sq-grid">
            {quizzes.map((quiz) => (
              <div className="sq-card" key={quiz._id}>
                <div className="sq-card-icon">📝</div>
                <div className="sq-card-body">
                  <h3 className="sq-card-title">{quiz.title}</h3>
                  {quiz.timeLimit && (
                    <span className="sq-card-meta">⏱ {quiz.timeLimit} mins</span>
                  )}
                </div>
                <button
                  className="btn btn--primary btn--sm"
                  onClick={() => navigate(`/quiz/${quiz._id}`)}
                >
                  Start →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
