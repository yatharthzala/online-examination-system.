const express = require("express");
const router  = express.Router();
const Result  = require("../models/Result");
const { requireAuth, requireAdmin } = require("../middleware/auth");

// GET /api/results — admin gets all, student gets own
router.get("/", requireAuth, async (req, res) => {
  try {
    const filter = req.user.role === "admin"
      ? {}
      : { studentId: req.user.userId };
    const results = await Result.find(filter).sort({ createdAt: -1 });
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/results/quiz/:quizId — admin only
router.get("/quiz/:quizId", requireAdmin, async (req, res) => {
  try {
    const results = await Result.find({ quizId: req.params.quizId })
      .sort({ createdAt: -1 });
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/results — submit quiz
router.post("/", requireAuth, async (req, res) => {
  try {
    const { quizId, quizName, score, total, studentClass } = req.body;
    if (!quizId || score === undefined || !total)
      return res.status(400).json({ error: "quizId, score and total required" });

    const result = await Result.create({
      quizId,
      quizName,
      studentId:    req.user.userId,
      studentName:  req.user.username,
      studentClass: studentClass || null,
      score:        Number(score),
      total:        Number(total),
    });

    res.status(201).json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
