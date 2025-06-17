const mongoose = require("mongoose");

const ArchivedCandidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: String,
  reason: String,
  archivedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ArchivedCandidate", ArchivedCandidateSchema);
