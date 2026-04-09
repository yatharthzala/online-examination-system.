const express = require("express");
const router  = express.Router();
const jwt     = require("jsonwebtoken");
const User    = require("../models/User");
const { requireAuth } = require("../middleware/auth");

const generateToken = (user) =>
  jwt.sign(
    { userId: user._id, username: user.username, role: user.role, class: user.class },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, password, role, studentClass } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ error: "Username already taken" });

    const studentId = role === "student" ? "STU" + Date.now() : null;

    const user = await User.create({
      username,
      password,
      role:      role || "student",
      studentId,
      class:     role === "student" ? studentClass : null,
    });

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ error: "Invalid credentials. Please check your username, password and role." });

    const match = await user.comparePassword(password);
    if (!match)
      return res.status(401).json({ error: "Invalid credentials. Please check your username, password and role." });

    if (role && user.role !== role)
      return res.status(401).json({ error: "Invalid credentials. Please check your username, password and role." });

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out" });
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
