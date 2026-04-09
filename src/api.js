// Central API helper — uses JWT tokens
const BASE = "http://localhost:5000/api"; // Change to Railway URL in production

const api = async (path, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
};

// ── Auth ──────────────────────────────────────────
export const authAPI = {
  me: () => api("/auth/me"),

  login: async (body) => {
    const data = await api("/auth/login", { method: "POST", body });
    if (data.token) localStorage.setItem("token", data.token);
    return data;
  },

  register: async (body) => {
    const data = await api("/auth/register", { method: "POST", body });
    if (data.token) localStorage.setItem("token", data.token);
    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
};

// ── Quizzes ───────────────────────────────────────
export const quizAPI = {
  getAll:  ()         => api("/quizzes"),
  getOne:  (id)       => api(`/quizzes/${id}`),
  create:  (body)     => api("/quizzes",       { method: "POST",   body }),
  update:  (id, body) => api(`/quizzes/${id}`, { method: "PATCH",  body }),
  remove:  (id)       => api(`/quizzes/${id}`, { method: "DELETE" }),
};

// ── Questions ─────────────────────────────────────
export const questionAPI = {
  getByQuiz: (quizId)   => api(`/questions?quizId=${quizId}`),
  create:    (body)     => api("/questions",       { method: "POST",   body }),
  update:    (id, body) => api(`/questions/${id}`, { method: "PATCH",  body }),
  remove:    (id)       => api(`/questions/${id}`, { method: "DELETE" }),
};

// ── Results ───────────────────────────────────────
export const resultAPI = {
  getAll:    ()       => api("/results"),
  getByQuiz: (quizId) => api(`/results/quiz/${quizId}`),
  submit:    (body)   => api("/results", { method: "POST", body }),
};

// ── Users (admin) ─────────────────────────────────
export const userAPI = {
  getAll: () => api("/users"),
};
