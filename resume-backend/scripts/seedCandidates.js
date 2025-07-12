const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Candidate = require("../models/Candidate");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedCandidates = async () => {
  await Candidate.deleteMany(); // Remove existing data (optional for testing)

  const year = new Date().getFullYear().toString().slice(-2);
  const dummyCandidates = [];

  for (let i = 1; i <= 25; i++) {
    const serial = i.toString().padStart(4, "0");
    const candidateId = `STC${year}${serial}`;
    dummyCandidates.push({
      candidateId,
      firstName: `First${i}`,
      lastName: `Last${i}`,
      mobile: `98765432${i.toString().padStart(2, "0")}`,
      altMobile: `76543210${i.toString().padStart(2, "0")}`,
      primaryEmail: `user${i}@example.com`,
      secondaryEmail: `alt${i}@example.com`,
      whatsapp: `98765432${i.toString().padStart(2, "0")}`,
      dob: "1995-01-01",
      primarySkill: "React",
      secondarySkill: "Node.js",
      knowledgeOnly: "MongoDB",
      pedigree: "Tier 2",
      currentCompany: "CompanyX",
      companySector: "IT",
      companyLevel: "Startup",
      productService: "Product-Based",
      currentRole: "Frontend Developer",
      totalExperience: "3 Years",
      relevantExperience: "2 Years",
      linkedin: `https://linkedin.com/in/user${i}`,
      portfolio: `https://portfolio${i}.com`,
      website: `https://website${i}.com`,
      currentLocation: "Chennai",
      preferredLocation: "Remote",
      noticePeriod: "30 Days",
      resumeLink: "",
    });
  }

  await Candidate.insertMany(dummyCandidates);
  console.log("✅ 25 dummy candidates inserted");
  process.exit();
};

seedCandidates();
