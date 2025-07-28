const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema(
  {
    recruiterId: { type: String, required: true },
    candidateName: { type: String, required: true },
    position: { type: String, required: true },
    client: { type: String, required: true },
    interviewDate: { type: String, required: true },
    interviewTime: { type: String, required: true },
    interviewType: { type: String, required: true },
    interviewRound: { type: String, required: true },
    interviewFeedback: { type: String, required: true },
    finalStatus: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", InterviewSchema);
