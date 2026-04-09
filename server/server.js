const express   = require("express");
const cors      = require("cors");
const mongoose  = require("mongoose");
require("dotenv").config();

const authRoutes     = require("./routes/auth");
const quizRoutes     = require("./routes/quizzes");
const questionRoutes = require("./routes/questions");
const resultRoutes   = require("./routes/results");
const userRoutes     = require("./routes/users");

const app  = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

// ── MongoDB ──
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ── CORS ──
app.use(cors({ origin: true, credentials: true }));

// ── Middleware ──
app.use(express.json());

// ── Routes ──
app.use("/api/auth",      authRoutes);
app.use("/api/quizzes",   quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/results",   resultRoutes);
app.use("/api/users",     userRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
