const express  = require("express");
const router   = express.Router();
const Question = require("../models/Question");
const { requireAuth, requireAdmin } = require("../middleware/auth");

// GET /api/questions?quizId=xxx
router.get("/", requireAuth, async (req, res) => {
  try {
    const { quizId } = req.query;
    if (!quizId) return res.status(400).json({ error: "quizId required" });
    const questions = await Question.find({ quizId });
    res.json({ questions });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/questions — admin only
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { quizId, question, options, correctAnswer } = req.body;
    if (!quizId || !question)
      return res.status(400).json({ error: "quizId and question required" });

    const q = await Question.create({
      quizId,
      question,
      options:       options || ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: Number(correctAnswer) || 0,
    });
    res.status(201).json({ question: q });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH /api/questions/:id — admin only
router.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const q = await Question.findByIdAndUpdate(req.params.id, {
      question:      req.body.question,
      options:       req.body.options,
      correctAnswer: Number(req.body.correctAnswer),
    }, { new: true });
    if (!q) return res.status(404).json({ error: "Question not found" });
    res.json({ question: q });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/questions/:id — admin only
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
