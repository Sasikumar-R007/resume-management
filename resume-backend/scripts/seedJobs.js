const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("../models/job");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedJobs = async () => {
  await Job.deleteMany(); // Remove existing jobs

  const dummyJobs = [];

  for (let i = 1; i <= 10; i++) {
    const jobId = `STCJB${i.toString().padStart(4, "0")}`;

    dummyJobs.push({
      jobId,
      title: `Job Title ${i}`,
      description: `Description for job ${i}`,
      companyName: `Company ${i}`,
      location: "Remote",
      experience: "2-4 Years",
      salary: "5-8 LPA",
      keyResponsibilities: ["Develop UI", "Work with APIs"],
      mustHaveQualifications: ["BCA/MCA", "React.js"],
      niceToHaveQualifications: ["Node.js", "MongoDB"],
      createdAt: new Date(),
    });
  }

  await Job.insertMany(dummyJobs);
  console.log("✅ 10 dummy jobs inserted");
  process.exit();
};

seedJobs();
