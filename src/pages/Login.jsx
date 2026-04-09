import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api";
import "../App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState("student");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  async function login() {
    setError("");
    setLoading(true);
    try {
      const { user } = await authAPI.login({ username, password, role });
      localStorage.setItem("user", JSON.stringify(user));
      navigate(user.role === "admin" ? "/admin" : "/student");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === "Enter") login();
  }

  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo">⚡</span>
          <span className="auth-brand-name">QuizApp</span>
        </div>

        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Sign in to continue</p>

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
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button className="btn btn--primary auth-submit" onClick={login} disabled={loading}>
          {loading ? "Signing in..." : "Sign In →"}
        </button>

        <p className="auth-switch">
          Don't have an account?{" "}
          <button className="auth-link" onClick={() => navigate("/signup")}>Create one</button>
        </p>

        <div className="auth-demo">
          <p className="auth-demo-title">Demo Accounts</p>
          <div className="auth-demo-row">
            <span className="auth-demo-badge">Admin</span>
            <span className="auth-demo-cred">admin / admin1234</span>
          </div>
        </div>
      </div>
      <div className="auth-blob auth-blob--1" />
      <div className="auth-blob auth-blob--2" />
    </div>
  );
}

export default Login;
