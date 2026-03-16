import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import AdminNavbar from "../components/AdminNavbar";
import "../App.css";

function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("");

  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);

  function addQuestion() {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  }

  function updateQuestion(index, value) {
    const newQ = [...questions];
    newQ[index].question = value;
    setQuestions(newQ);
  }

  function updateOption(qIndex, optIndex, value) {
    const newQ = [...questions];
    newQ[qIndex].options[optIndex] = value;
    setQuestions(newQ);
  }

  function updateCorrect(index, value) {
    const newQ = [...questions];
    newQ[index].correctAnswer = value;
    setQuestions(newQ);
  }

  function removeQuestion(index) {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  }

  async function createQuiz() {
    const quizRef = await addDoc(collection(db, "quizzes"), {
      title,
      timeLimit: Number(timeLimit),
      visible: true,
    });

    const quizId = quizRef.id;

    for (let q of questions) {
      await addDoc(collection(db, "questions"), {
        quizId,
        question: q.question,
        options: q.options,
        correctAnswer: Number(q.correctAnswer),
      });
    }

    alert("Quiz Created");
  }

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="dashboard-root">
      <AdminNavbar />

      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">Create Quiz</h2>
            <p className="dashboard-subtitle">Build a new quiz for your students</p>
          </div>
          <div className="dashboard-badge">New Quiz</div>
        </div>

        {/* Quiz Info Card */}
        <section className="dashboard-card">
          <h3 className="card-title">Quiz Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Quiz Title</label>
              <input
                className="form-input"
                placeholder="e.g. Chapter 3 — Biology"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group form-group--sm">
              <label className="form-label">Time Limit (mins)</label>
              <input
                className="form-input"
                placeholder="e.g. 30"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Questions */}
        <div className="questions-list">
          {questions.map((q, index) => (
            <section className="dashboard-card question-card" key={index}>
              <div className="question-card-header">
                <span className="question-number">Q{index + 1}</span>
                <h3 className="card-title" style={{ flex: 1 }}>Question</h3>
                {questions.length > 1 && (
                  <button
                    className="btn-icon btn-icon--danger"
                    onClick={() => removeQuestion(index)}
                    title="Remove question"
                  >
                    ✕
                  </button>
                )}
              </div>

              <input
                className="form-input"
                placeholder="Enter your question here..."
                value={q.question}
                onChange={(e) => updateQuestion(index, e.target.value)}
              />

              <div className="options-grid">
                {q.options.map((opt, i) => (
                  <div className="option-row" key={i}>
                    <span className="option-label">{optionLabels[i]}</span>
                    <input
                      className="form-input"
                      placeholder={`Option ${optionLabels[i]}`}
                      value={opt}
                      onChange={(e) => updateOption(index, i, e.target.value)}
                    />
                  </div>
                ))}
              </div>

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
            </section>
          ))}
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button className="btn btn--outline" onClick={addQuestion}>
            + Add Question
          </button>
          <button className="btn btn--primary" onClick={createQuiz}>
            🚀 Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;