import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import StudentNavbar from "../components/StudentNavbar";
import "../App.css";

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [quizName, setQuizName] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuiz();
    loadQuestions();
  }, []);

  async function loadQuiz() {
    const quizDoc = await getDoc(doc(db, "quizzes", id));
    if (quizDoc.exists()) {
      setQuizName(quizDoc.data().title);
      setTimeLeft(quizDoc.data().timeLimit * 60);
    }
  }

  async function loadQuestions() {
    const q = query(collection(db, "questions"), where("quizId", "==", id));
    const snap = await getDocs(q);
    const list = [];
    snap.forEach((d) => list.push(d.data()));
    setQuestions(list);
  }

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) submitQuiz();
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  function selectAnswer(qIndex, optIndex) {
    setAnswers({ ...answers, [qIndex]: optIndex });
  }

  async function submitQuiz() {
    if (submitting) return;
    setSubmitting(true);

    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });

    const user = JSON.parse(localStorage.getItem("user"));

    await addDoc(collection(db, "results"), {
      quizId: id,
      quizName,
      studentName: user.username,
      studentId: user.studentId,
      studentClass: user.class,
      score,
      total: questions.length,
    });

    navigate("/result", { state: { score, total: questions.length } });
  }

  const answered = Object.keys(answers).length;
  const pctDone = questions.length > 0 ? (answered / questions.length) * 100 : 0;

  const mins = Math.floor(timeLeft / 60);
  const secs = String(timeLeft % 60).padStart(2, "0");
  const timerWarning = timeLeft <= 60 && timeLeft > 0;

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="dashboard-root">
      <StudentNavbar />

      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">{quizName}</h2>
            <p className="dashboard-subtitle">
              {answered} of {questions.length} answered
            </p>
          </div>

          {/* Timer */}
          <div className={`qp-timer ${timerWarning ? "qp-timer--warn" : ""}`}>
            <span className="qp-timer-icon">⏱</span>
            {mins}:{secs}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="qp-progress-bar">
          <div className="qp-progress-fill" style={{ width: `${pctDone}%` }} />
        </div>

        {/* Questions */}
        <div className="questions-list">
          {questions.map((q, index) => (
            <section className="dashboard-card question-card" key={index}>
              <div className="question-card-header">
                <span className="question-number">Q{index + 1}</span>
                <p className="qp-question-text">{q.question}</p>
                {answers[index] !== undefined && (
                  <span className="qp-answered-tick">✓</span>
                )}
              </div>

              <div className="qp-options">
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    className={`qp-option ${answers[index] === i ? "qp-option--selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`q-${index}`}
                      checked={answers[index] === i}
                      onChange={() => selectAnswer(index, i)}
                      style={{ display: "none" }}
                    />
                    <span className="qp-option-label">{optionLabels[i]}</span>
                    <span className="qp-option-text">{opt}</span>
                  </label>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Submit */}
        <div className="form-actions">
          <p className="qp-submit-hint">
            {questions.length - answered > 0
              ? `${questions.length - answered} question${questions.length - answered !== 1 ? "s" : ""} unanswered`
              : "All questions answered!"}
          </p>
          <button
            className="btn btn--primary"
            onClick={submitQuiz}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Quiz 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;