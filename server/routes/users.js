const express = require("express");
const router  = express.Router();
const User    = require("../models/User");
const { requireAdmin } = require("../middleware/auth");

// GET /api/users — admin only
router.get("/", requireAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: "student" }).sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
