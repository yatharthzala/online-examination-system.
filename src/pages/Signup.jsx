import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api";
import "../App.css";

function Signup() {
  const [username, setUsername]       = useState("");
  const [password, setPassword]       = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [role, setRole]               = useState("student");
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const navigate = useNavigate();

  async function register() {
    setError("");
    setLoading(true);
    try {
      await authAPI.register({ username, password, role, studentClass });
      alert("Account Created! Please sign in.");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo">⚡</span>
          <span className="auth-brand-name">QuizApp</span>
        </div>

        <h2 className="auth-title">Create account</h2>
        <p className="auth-subtitle">Join QuizApp today</p>

        <div className="auth-role-toggle">
          <button
            className={`auth-role-btn ${role === "student" ? "auth-role-btn--active" : ""}`}
            onClick={() => setRole("student")}
          >🎓 Student</button>
          <button
            className={`auth-role-btn ${role === "admin" ? "auth-role-btn--active" : ""}`}
            onClick={() => setRole("admin")}
          >🛡️ Admin</button>
        </div>

        <div className="auth-fields">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Choose a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {role === "student" && (
            <div className="form-group">
              <label className="form-label">Class</label>
              <input
                className="form-input"
                placeholder="e.g. 10-A"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
              />
            </div>
          )}
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button className="btn btn--primary auth-submit" onClick={register} disabled={loading}>
          {loading ? "Creating account..." : "Create Account →"}
        </button>

        <p className="auth-switch">
          Already have an account?{" "}
          <button className="auth-link" onClick={() => navigate("/")}>Sign in</button>
        </p>
      </div>
      <div className="auth-blob auth-blob--1" />
      <div className="auth-blob auth-blob--2" />
    </div>
  );
}

export default Signup;
