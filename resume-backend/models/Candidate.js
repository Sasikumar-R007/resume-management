const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  candidateId: {
    type: String,
    unique: true,
    required: true
  },
  

  firstName: String,
  lastName: String,
  mobile: String,
  altMobile: String,

  primaryEmail: {
    type: String,
    required: true,
    unique: true,
  },

  secondaryEmail: String,

  password: {
    type: String,
    required: false,
  },

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
  secondarySkill: String,
  knowledgeOnly: String,
  currentLocation: String,
  preferredLocation: String,
  noticePeriod: String,

  resumeLink: {
    type: String,
    default: "",
  },

  profileImage: String,

  resetOTP: Number,
  otpExpires: Date,

  appliedBy: {
    type: String,
    default: "candidate", // or "recruiter"
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  isArchived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Candidate", candidateSchema);
