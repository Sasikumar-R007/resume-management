const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  recruiterId: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  mobile: String,
  reportingTo: {
    type: String,
    required: true,
  },
  joiningDate: Date,
  profilePic: String,
  linkedin: String,
});

module.exports = mongoose.model("Recruiter", recruiterSchema);
