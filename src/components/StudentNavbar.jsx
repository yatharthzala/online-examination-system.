import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

function StudentNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    localStorage.removeItem("user");
    navigate("/");
  }

  const navLinks = [
    { label: "Dashboard", path: "/student", icon: "🏠" },
    { label: "My Results", path: "/my-results", icon: "📊" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="navbar-logo">⚡</span>
          <span className="navbar-title">QuizApp</span>
        </div>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <button
              key={link.path}
              className={`nav-btn ${location.pathname === link.path ? "nav-btn--active" : ""}`}
              onClick={() => navigate(link.path)}
            >
              <span className="nav-icon">{link.icon}</span>
              {link.label}
            </button>
          ))}
        </div>

        <button className="nav-btn nav-btn--logout" onClick={logout}>
          <span className="nav-icon">🚪</span>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default StudentNavbar;