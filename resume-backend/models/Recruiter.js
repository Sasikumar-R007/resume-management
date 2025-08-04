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
  reportingTo: String, // TL ID like STTL001
  joiningDate: Date,
  profilePic: { type: String, default: "" },  // <-- Default empty string
  bannerUrl: { type: String, default: "" }, 
  linkedin: String,
});

module.exports = mongoose.model("Recruiter", recruiterSchema);
