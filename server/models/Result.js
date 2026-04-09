const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  quizId:       { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  quizName:     { type: String },
  studentId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  studentName:  { type: String },
  studentClass: { type: String },
  score:        { type: Number, required: true },
  total:        { type: Number, required: true },
  createdAt:    { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);
