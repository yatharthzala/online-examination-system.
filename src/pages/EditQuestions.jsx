import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import AdminNavbar from "../components/AdminNavbar";
import "../App.css";

function EditQuestions() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [saved, setSaved] = useState({});

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    const q = query(collection(db, "questions"), where("quizId", "==", id));
    const snap = await getDocs(q);
    const list = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
    setQuestions(list);
  }

  async function updateQuestion(q) {
    await updateDoc(doc(db, "questions", q.id), {
      question: q.question,
      options: q.options,
      correctAnswer: Number(q.correctAnswer),
    });
    setSaved((prev) => ({ ...prev, [q.id]: true }));
    setTimeout(() => setSaved((prev) => ({ ...prev, [q.id]: false })), 2000);
  }

  async function deleteQuestion(qid) {
    await deleteDoc(doc(db, "questions", qid));
    loadQuestions();
  }

  async function addQuestion() {
    await addDoc(collection(db, "questions"), {
      quizId: id,
      question: "New Question",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0,
    });
    loadQuestions();
  }

  function updateOption(qIndex, optIndex, value) {
    const newQ = [...questions];
    newQ[qIndex].options[optIndex] = value;
    setQuestions(newQ);
  }

  function updateText(qIndex, value) {
    const newQ = [...questions];
    newQ[qIndex].question = value;
    setQuestions(newQ);
  }

  function updateCorrect(qIndex, value) {
    const newQ = [...questions];
    newQ[qIndex].correctAnswer = value;
    setQuestions(newQ);
  }

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="dashboard-root">
      <AdminNavbar />

      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">Edit Questions</h2>
            <p className="dashboard-subtitle">
              {questions.length} question{questions.length !== 1 ? "s" : ""} in this quiz
            </p>
          </div>
          <button className="btn btn--primary" onClick={addQuestion}>
            + Add Question
          </button>
        </div>

        {/* Questions */}
        {questions.length === 0 ? (
          <section className="dashboard-card">
            <p className="empty-state">No questions yet. Add one to get started.</p>
          </section>
        ) : (
          <div className="questions-list">
            {questions.map((q, index) => (
              <section className="dashboard-card question-card" key={q.id}>
                {/* Question Header */}
                <div className="question-card-header">
                  <span className="question-number">Q{index + 1}</span>
                  <h3 className="card-title" style={{ flex: 1 }}>Question</h3>
                  <button
                    className="btn-icon btn-icon--danger"
                    onClick={() => deleteQuestion(q.id)}
                    title="Delete question"
                  >
                    🗑️
                  </button>
                </div>

                {/* Question Text */}
                <input
                  className="form-input"
                  value={q.question}
                  onChange={(e) => updateText(index, e.target.value)}
                  placeholder="Enter question text..."
                />

                {/* Options */}
                <div className="options-grid">
                  {q.options.map((opt, i) => (
                    <div className="option-row" key={i}>
                      <span className="option-label">{optionLabels[i]}</span>
                      <input
                        className="form-input"
                        value={opt}
                        onChange={(e) => updateOption(index, i, e.target.value)}
                        placeholder={`Option ${optionLabels[i]}`}
                      />
                    </div>
                  ))}
                </div>

                {/* Correct Answer */}
                <div className="correct-row">
                  <label className="form-label">Correct Answer</label>
                  <div className="correct-options">
                    {optionLabels.map((label, i) => (
                      <button
                        key={i}
                        className={`correct-btn ${Number(q.correctAnswer) === i ? "correct-btn--active" : ""}`}
                        onClick={() => updateCorrect(index, i)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Save */}
                <div className="question-footer">
                  <button
                    className={`btn btn--sm ${saved[q.id] ? "btn--saved" : "btn--primary"}`}
                    onClick={() => updateQuestion(q)}
                  >
                    {saved[q.id] ? "✓ Saved" : "Save Question"}
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

export default EditQuestions;