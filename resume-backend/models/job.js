const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

  jobId: {
    type: String,
    unique: true,
    required: true
  },

  companyLogo: String,
  companyName: String,
  jobTitle: String,
  jobType: String,
  companyOverview: String,
  roleOverview: String,
  keyResponsibilities: [String],
  mustHaveQualifications: [String],
  niceToHaveQualifications: [String],
  compensation: String,
  location: String,
  workSetup: String,
  priority: String,
});

module.exports = mongoose.model("Job", jobSchema);
