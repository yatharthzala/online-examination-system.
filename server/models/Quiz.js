const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title:     { type: String, required: true, trim: true },
  timeLimit: { type: Number, default: 30 },
  visible:   { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", quizSchema);
