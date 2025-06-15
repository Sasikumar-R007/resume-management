const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobile: String,
  altMobile: String,
  primaryEmail: String,
  secondaryEmail: String,
  linkedin: String,
  portfolio: String,
  website: String,
  whatsapp: String,
  dob: String,
  currentCompany: String,
  companySector: String,
  companyLevel: String,
  productService: String,
  productDomain: String,
  productCategory: String,
  currentRole: String,
  totalExperience: String,
  relevantExperience: String,
  pedigree: String,
  primarySkill: String,
  resumeLink: String, // 👈 add later when uploading/resume feature is added
  profileImage: String,
  appliedBy: {
    type: String,
    default: "candidate", // or "recruiter"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Candidate", candidateSchema);
