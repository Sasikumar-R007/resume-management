const mongoose = require("mongoose");
const Recruiter = require("../models/Recruiter");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/jobportal";

const seedRecruiters = async () => {
  await mongoose.connect(MONGO_URI);

  // Optional: Clear existing recruiters
  await Recruiter.deleteMany();

  const recruiters = [
    {
      recruiterId: "STTA001",
      name: "R. Sudharshan",
      email: "sudharshan@scaling.com",
      mobile: "9876543210",
      designation: "Recruitment Executive",
      reportingTo: "James Manoharan",
      joiningDate: new Date("2023-04-01"),
      password: "sudharshan123",
    },
    {
      recruiterId: "STTA002",
      name: "S. Kavitha",
      email: "kavitha@scaling.com",
      mobile: "9988776655",
      designation: "HR Manager",
      reportingTo: "Prakash Raj Raja",
      joiningDate: new Date("2022-08-10"),
      password: "kavitha123",
    },
    {
      recruiterId: "STTA003",
      name: "Arun Raj",
      email: "arunraj@scaling.com",
      mobile: "9876123456",
      designation: "Recruiter",
      reportingTo: "Yokeshwaran",
      joiningDate: new Date("2023-01-20"),
      password: "arunraj123",
    },
    {
      recruiterId: "STTA004",
      name: "Priya M",
      email: "priyam@scaling.com",
      mobile: "9123456780",
      designation: "Recruitment Assistant",
      reportingTo: "James Manoharan",
      joiningDate: new Date("2024-03-01"),
      password: "priyam123",
    },
    {
      recruiterId: "STTA005",
      name: "Kumaravel R",
      email: "kumaravel@scaling.com",
      mobile: "9998887770",
      designation: "Hiring Associate",
      reportingTo: "Prakash Raj Raja",
      joiningDate: new Date("2023-11-05"),
      password: "kumar123",
    },
    {
      recruiterId: "STTA006",
      name: "Lakshmi V",
      email: "lakshmi@scaling.com",
      mobile: "9090909090",
      designation: "Talent Acquisition",
      reportingTo: "Yokeshwaran",
      joiningDate: new Date("2022-06-18"),
      password: "lakshmi123",
    },
  ];

  await Recruiter.insertMany(recruiters);
  console.log("✅ Recruiters seeded");
  process.exit();
};

seedRecruiters();
