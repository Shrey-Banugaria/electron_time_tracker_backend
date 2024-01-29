const mongoose = require("mongoose");

const workSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  breakDuration: { type: Number },
  workDuration: { type: Number },
  date: { type: Date, required: true },
  comment: { type: String },
});

const WorkSession = mongoose.model("WorkSession", workSessionSchema);

module.exports = WorkSession;
