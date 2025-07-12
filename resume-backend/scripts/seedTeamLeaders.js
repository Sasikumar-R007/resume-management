// seedTeamLeaders.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const TeamLeader = require("../models/teamLeader");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jobportal")
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));

const dummyTeamLeaders = [
  {
    teamLeadId: "STTL001",
    name: "Sundar Raj",
    email: "sundar.tl@example.com",
    password: "sundar123",
    mobile: "9876543210",
    reportingTo: "James Manoharan",
    department: "IT Department",
    joiningDate: new Date("2022-07-01"),
    profilePic: "",
  },
  {
    teamLeadId: "STTL002",
    name: "Kavitha M",
    email: "kavitha.tl@example.com",
    password: "kavi321",
    mobile: "9998887776",
    reportingTo: "Ramesh Kumar",
    department: "HR Department",
    joiningDate: new Date("2023-01-20"),
    profilePic: "",
  },
  {
    teamLeadId: "STTL003",
    name: "Vignesh T",
    email: "vignesh.tl@example.com",
    password: "vig789",
    mobile: "7776665554",
    reportingTo: "Sujatha Devi",
    department: "Marketing",
    joiningDate: new Date("2023-06-10"),
    profilePic: "",
  },
];

const seedTeamLeaders = async () => {
  try {
    await TeamLeader.deleteMany(); // Optional: Clear existing data
    await TeamLeader.insertMany(dummyTeamLeaders);
    console.log("Team Leaders seeded successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Seeding error:", err);
  }
};

seedTeamLeaders();
