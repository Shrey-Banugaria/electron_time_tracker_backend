const mongoose = require("mongoose");

const dailySummarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  totalWorkDuration: { type: Number },
  totalBreakDuration: { type: Number },
});

const DailySummary = mongoose.model("DailySummary", dailySummarySchema);

module.exports = DailySummary;
