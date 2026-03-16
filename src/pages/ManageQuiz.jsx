import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import "../App.css";

function ManageQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuizzes();
  }, []);

  async function loadQuizzes() {
    const snap = await getDocs(collection(db, "quizzes"));
    const list = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
    setQuizzes(list);
  }

  async function toggleQuiz(id, current) {
    await updateDoc(doc(db, "quizzes", id), { visible: !current });
    loadQuizzes();
  }

  async function deleteQuiz(id) {
    await deleteDoc(doc(db, "quizzes", id));
    loadQuizzes();
  }

  return (
    <div className="dashboard-root">
      <AdminNavbar />

      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">Manage Quizzes</h2>
            <p className="dashboard-subtitle">
              {quizzes.length} quiz{quizzes.length !== 1 ? "zes" : ""} available
            </p>
          </div>
          <div className="dashboard-badge">Admin</div>
        </div>

        {/* Quiz List */}
        {quizzes.length === 0 ? (
          <section className="dashboard-card">
            <p className="empty-state">No quizzes found. Create one to get started.</p>
          </section>
        ) : (
          <div className="quiz-list">
            {quizzes.map((q) => (
              <section className="dashboard-card quiz-card" key={q.id}>
                <div className="quiz-card-left">
                  <div className="quiz-icon">📋</div>
                  <div className="quiz-meta">
                    <h3 className="quiz-name">{q.title}</h3>
                    <span className="quiz-id">ID: {q.id}</span>
                  </div>
                </div>

                <div className="quiz-card-right">
                  <span className={`status-pill ${q.visible ? "status-pill--active" : "status-pill--hidden"}`}>
                    {q.visible ? "● Active" : "○ Hidden"}
                  </span>

                  <button
                    className={`btn btn--sm ${q.visible ? "btn--outline" : "btn--soft"}`}
                    onClick={() => toggleQuiz(q.id, q.visible)}
                  >
                    {q.visible ? "Hide" : "Activate"}
                  </button>

                  <button
                    className="btn btn--sm btn--soft"
                    onClick={() => navigate("/edit-questions/" + q.id)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="btn btn--sm btn--danger"
                    onClick={() => deleteQuiz(q.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageQuiz;