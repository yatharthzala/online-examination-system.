# ⚡ QuizApp — Full Stack Quiz Management System

A secured full-stack web application built using the **MERN Stack** (MongoDB, Express, React, Node.js) with JWT-based authentication and role-based access control.

---

## 🌐 Live Demo

- **Frontend:** [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)
- **Backend API:** [https://your-railway-url.up.railway.app/api/health](https://your-railway-url.up.railway.app/api/health)

---

## 📋 Features

### 👨‍🎓 Student
- Sign up and login securely
- View all available quizzes
- Take timed quizzes
- View personal results and score history
- See average score and best score statistics

### 🛡️ Admin (Teacher)
- Login with admin credentials
- Create quizzes with multiple choice questions
- Set time limits for each quiz
- Manage quizzes — activate, hide, edit, delete
- Edit questions — add, update, delete
- View results for each quiz
- See all student attempts and scores
- View top performing students

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router DOM |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Authentication | JWT (JSON Web Tokens) |
| Password Security | bcryptjs |
| Deployment (Frontend) | Vercel |
| Deployment (Backend) | Railway |

---

## 🔐 Security Implementation

- **JWT Authentication** — Every API request is verified using JSON Web Tokens
- **Password Hashing** — All passwords are hashed using bcryptjs before storing
- **Role-Based Access Control** — Admin and Student have different permissions
- **Environment Variables** — All sensitive data stored in `.env` file
- **Protected Routes** — Middleware guards all API endpoints

---

## 📁 Project Structure

```
quiz-app/
├── src/                        # React Frontend
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── QuizPage.jsx
│   │   ├── ResultPage.jsx
│   │   ├── CreateQuiz.jsx
│   │   ├── ManageQuiz.jsx
│   │   ├── EditQuestions.jsx
│   │   ├── ViewResults.jsx
│   │   ├── QuizResults.jsx
│   │   └── StudentResults.jsx
│   ├── components/
│   │   ├── AdminNavbar.jsx
│   │   └── StudentNavbar.jsx
│   ├── api.js                  # API helper (replaces Firebase)
│   └── App.jsx                 # Routes
│
├── server/                     # Express Backend
│   ├── models/
│   │   ├── User.js
│   │   ├── Quiz.js
│   │   ├── Question.js
│   │   └── Result.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── quizzes.js
│   │   ├── questions.js
│   │   ├── results.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js             # JWT middleware
│   ├── server.js
│   └── createAdmin.js
│
└── README.md
```

---

## 🗄️ Database Schema

### Users Collection
```json
{
  "username": "string",
  "password": "hashed string",
  "role": "student | admin",
  "studentId": "string",
  "class": "string",
  "createdAt": "date"
}
```

### Quizzes Collection
```json
{
  "title": "string",
  "timeLimit": "number",
  "visible": "boolean",
  "createdBy": "userId",
  "createdAt": "date"
}
```

### Questions Collection
```json
{
  "quizId": "quizId",
  "question": "string",
  "options": ["string"],
  "correctAnswer": "number"
}
```

### Results Collection
```json
{
  "quizId": "quizId",
  "quizName": "string",
  "studentId": "userId",
  "studentName": "string",
  "studentClass": "string",
  "score": "number",
  "total": "number",
  "createdAt": "date"
}
```

---

## 🚀 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new student |
| POST | /api/auth/login | Login user |
| POST | /api/auth/logout | Logout user |
| GET | /api/auth/me | Get current user |

### Quiz Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/quizzes | Get all quizzes |
| GET | /api/quizzes/:id | Get single quiz |
| POST | /api/quizzes | Create quiz (admin) |
| PATCH | /api/quizzes/:id | Update quiz (admin) |
| DELETE | /api/quizzes/:id | Delete quiz (admin) |

### Question Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/questions?quizId=xxx | Get questions for quiz |
| POST | /api/questions | Add question (admin) |
| PATCH | /api/questions/:id | Update question (admin) |
| DELETE | /api/questions/:id | Delete question (admin) |

### Result Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/results | Get results |
| GET | /api/results/quiz/:quizId | Get quiz results (admin) |
| POST | /api/results | Submit quiz result |

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/quiz-app.git
cd quiz-app
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd server
npm install
```

### 4. Setup environment variables
Create `server/.env`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
PORT=5000
```

### 5. Create admin account
```bash
cd server
node createAdmin.js
```

### 6. Run the application

Terminal 1 — Backend:
```bash
cd server
npm run dev
```

Terminal 2 — Frontend:
```bash
npm run dev
```

Open `http://localhost:5173`

---

## 👤 Demo Accounts

| Role | Username | Password |
|---|---|---|
| Admin | admin | admin1234 |
| Student | Sign up to create | - |

---

## 📦 Deployment

- **Frontend** deployed on [Vercel](https://vercel.com)
- **Backend** deployed on [Railway](https://railway.app)
- **Database** hosted on [MongoDB Atlas](https://cloud.mongodb.com)

---

## 👨‍💻 Developer

Marwadi University — Computer Engineering, Semester 4
Subject: AWT (01CE1412)
