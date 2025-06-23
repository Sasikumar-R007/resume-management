const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  password: String, // ⚠️ Plain text for now (for dev only)
});

module.exports = mongoose.model("Recruiter", recruiterSchema);
