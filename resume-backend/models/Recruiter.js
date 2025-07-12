const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema(
  {
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
    mobile: String,
    designation: String, // e.g. "HR Executive"
    reportingTo: String, // e.g. "Rajesh Kumar"
    joiningDate: Date,
    password: String, // simple for now, later hash if needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recruiter", recruiterSchema);
