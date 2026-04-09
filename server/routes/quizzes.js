const express  = require("express");
const router   = express.Router();
const Quiz     = require("../models/Quiz");
const Question = require("../models/Question");
const { requireAuth, requireAdmin } = require("../middleware/auth");

// GET /api/quizzes
router.get("/", requireAuth, async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { visible: true };
    const quizzes = await Quiz.find(filter).sort({ createdAt: -1 });
    res.json({ quizzes });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/quizzes/:id
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json({ quiz });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/quizzes — admin only
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { title, timeLimit, questions } = req.body;
    if (!title) return res.status(400).json({ error: "Title required" });

    const quiz = await Quiz.create({
      title,
      timeLimit:  Number(timeLimit) || 30,
      visible:    true,
      createdBy:  req.user.userId,
    });

    if (questions && questions.length > 0) {
      const questionDocs = questions.map((q) => ({
        quizId:        quiz._id,
        question:      q.question,
        options:       q.options,
        correctAnswer: Number(q.correctAnswer),
      }));
      await Question.insertMany(questionDocs);
    }

    res.status(201).json({ quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH /api/quizzes/:id — admin only
router.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json({ quiz });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/quizzes/:id — admin only
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    await Question.deleteMany({ quizId: req.params.id });
    res.json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
