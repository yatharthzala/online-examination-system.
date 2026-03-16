import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";

import AdminDashboard from "./pages/AdminDashboard";
import CreateQuiz from "./pages/CreateQuiz";
import ManageQuiz from "./pages/ManageQuiz";
import ViewResults from "./pages/ViewResults";
import EditQuestions from "./pages/EditQuestions";
import StudentResults from "./pages/StudentResults";
import QuizResults from "./pages/QuizResults";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/manage-quiz" element={<ManageQuiz />} />
        <Route path="/view-results" element={<ViewResults />} />
        <Route path="/my-results" element={<StudentResults />} />
        <Route path="/edit-questions/:id" element={<EditQuestions />} />
        <Route path="/quiz-results/:id" element={<QuizResults />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;