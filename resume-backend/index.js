// index.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== Middleware ====================
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://resume-mang-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== MongoDB Connection ====================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.log("💡 Make sure to:");
    console.log("   1. Check your MONGO_URI environment variable");
    console.log("   2. Whitelist Vercel IPs in MongoDB Atlas");
    console.log("   3. Use correct connection string format");
  }
};

connectDB();

// ==================== Multer Config ====================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "uploads");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ==================== Static Files ====================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==================== Routes ====================
const authRoutes = require("./routes/auth.routes");
const jobRoutes = require("./routes/jobRoutes");
const candidateRoutes = require("./routes/candidates");
const archivedRoutes = require("./routes/archived");

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/archived", archivedRoutes);

// ==================== Resume Upload API ====================
app.post("/api/upload", upload.array("resumes"), (req, res) => {
  const name = req.body.name;
  const files = req.files;

  if (!name || !files || files.length === 0) {
    return res.status(400).json({ message: "Missing name or files" });
  }

  const newRecord = {
    id: uuidv4(),
    name,
    files: files.map((f) => f.filename),
    timestamp: new Date().toISOString(),
  };

  const filePath = path.join(__dirname, "records.json");

  let existing = [];
  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      existing = JSON.parse(raw);
      if (!Array.isArray(existing)) existing = [existing];
    } catch (err) {
      console.error("Failed to parse existing records:", err);
      existing = [];
    }
  }

  existing.unshift(newRecord);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

  res.status(200).json({ message: "Upload successful", data: newRecord });
});

// Fetch recent 10 uploads
app.get("/api/records", (req, res) => {
  const filePath = path.join(__dirname, "records.json");
  if (!fs.existsSync(filePath)) return res.json([]);

  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const recent = data
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
    res.json(recent);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch all uploads
app.get("/api/all-resumes", (req, res) => {
  const filePath = path.join(__dirname, "records.json");
  if (!fs.existsSync(filePath)) return res.json([]);

  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ============ Candidate Resume Upload =============
app.post("/api/candidates/upload", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // For Vercel deployment, return file info instead of URL
  res.status(200).json({ 
    fileUrl: `uploads/${req.file.filename}`,
    message: "File uploaded successfully",
    filename: req.file.filename
  });
});

// ==================== Recruiter Routes ====================
const recruiterRoutes = require("./routes/recruiterRoutes");
app.use("/api/recruiters", recruiterRoutes);

// ==================== Team Leader Routes ====================
const teamLeaderRoutes = require("./routes/teamLeaders");
app.use("/api/team-leaders", teamLeaderRoutes);

// ==================== Seed Database Route ====================
app.post("/api/seed", async (req, res) => {
  try {
    const Recruiter = require("./models/Recruiter");
    const TeamLeader = require("./models/teamLeader");

    // Clear existing data
    await Recruiter.deleteMany();
    await TeamLeader.deleteMany();

    // Seed recruiters
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

    // Seed team leaders
    const teamLeaders = [
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

    await Recruiter.insertMany(recruiters);
    await TeamLeader.insertMany(teamLeaders);

    res.json({
      message: "Database seeded successfully",
      recruiters: recruiters.length,
      teamLeaders: teamLeaders.length,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).json({ error: "Failed to seed database" });
  }
});

// ==================== Default Route ====================
app.get("/", (req, res) => {
  res.send("🟢 Resume & Job Backend is running");
});

// ==================== Start Server ====================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
