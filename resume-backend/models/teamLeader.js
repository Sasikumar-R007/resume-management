const mongoose = require("mongoose");

const teamLeaderSchema = new mongoose.Schema({
  teamLeadId: {
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
  reportingTo: String,
  department: String,
  joiningDate: Date,
  profilePic: String,
});

module.exports = mongoose.model("TeamLeader", teamLeaderSchema);
