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

// ==================== Database Connection Middleware ====================
app.use(async (req, res, next) => {
  // Skip database check for health endpoint
  if (req.path === "/health" || req.path === "/") {
    return next();
  }

  try {
    // Ensure database connection for each request in serverless environment
    await ensureConnection();

    // Double-check connection state
    if (mongoose.connection.readyState !== 1) {
      console.error(
        `Database not connected. ReadyState: ${mongoose.connection.readyState}`
      );
      return res.status(500).json({
        message: "Database connection not available. Please try again.",
        error: "Database connection issue",
      });
    }

    next();
  } catch (error) {
    console.error("Database connection error in middleware:", error);
    return res.status(500).json({
      message: "Database connection failed. Please try again.",
      error: "Database connection error",
    });
  }
});

// ==================== MongoDB Connection ====================
const connectDB = require("./db");

// For serverless environments, we need to handle connections differently
let isConnected = false;

const ensureConnection = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log("✅ Database connection ensured");
    } catch (error) {
      console.error("❌ Database connection failed:", error.message);
      throw error;
    }
  }
  return isConnected;
};

// Initialize connection on startup
ensureConnection().catch(console.error);

// For traditional server deployment
if (process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1") {
  let server;

  const startServer = async () => {
    try {
      await ensureConnection();
      console.log("✅ Database connected, starting server...");

      server = app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error("❌ Failed to start server:", error);
      process.exit(1);
    }
  };

  startServer();
}

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
app.use(
  "/uploads/profiles",
  express.static(path.join(__dirname, "uploads/profiles"))
);

// ==================== Routes ====================
const authRoutes = require("./routes/auth.routes");
const jobRoutes = require("./routes/jobRoutes");
const candidateRoutes = require("./routes/candidates");
const archivedRoutes = require("./routes/archived");
const interviewRoutes = require("./routes/interviewRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/archived", archivedRoutes);
app.use("/api/interviews", interviewRoutes);

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
    filename: req.file.filename,
  });
});

// ==================== Recruiter Routes ====================
const recruiterRoutes = require("./routes/recruiterRoutes");
app.use("/api/recruiters", recruiterRoutes);

// ==================== Team Leader Routes ====================
const teamLeaderRoutes = require("./routes/teamLeaders");
app.use("/api/team-leaders", teamLeaderRoutes);

// ==================== Admin Routes ====================
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admins", adminRoutes);

// ==================== Contribution Routes ====================
const contributionRoutes = require("./routes/contributionRoutes");
app.use("/api/contributions", contributionRoutes);

// ==================== Seed Database Route ====================
app.post("/api/seed", async (req, res) => {
  try {
    const Recruiter = require("./models/Recruiter");
    const TeamLeader = require("./models/teamLeader");
    const Admin = require("./models/Admin");

    // Clear existing data
    await Recruiter.deleteMany();
    await TeamLeader.deleteMany();
    await Admin.deleteMany();

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

    // Seed admins
    const admins = [
      {
        adminId: "ADM001",
        name: "Kumaran",
        email: "kumaran@scaling.com",
        password: "kumaran777",
        mobile: "9999999999",
        designation: "System Administrator",
        department: "IT",
        permissions: [
          "user_management",
          "system_settings",
          "data_export",
          "analytics",
          "full_access",
        ],
        isActive: true,
      },
    ];

    await Recruiter.insertMany(recruiters);
    await TeamLeader.insertMany(teamLeaders);
    await Admin.insertMany(admins);

    res.json({
      message: "Database seeded successfully",
      recruiters: recruiters.length,
      teamLeaders: teamLeaders.length,
      admins: admins.length,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).json({ error: "Failed to seed database" });
  }
});

// ==================== Health Check Route ====================
app.get("/", (req, res) => {
  res.send("🟢 Resume & Job Backend is running");
});

app.get("/health", async (req, res) => {
  try {
    // Check MongoDB connection
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: {
        status: dbStatus[dbState] || "unknown",
        readyState: dbState,
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || "development",
        hasMongoUri: !!process.env.MONGO_URI,
        hasMongoUrl: !!process.env.MONGO_URL,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// ==================== Start Server ====================
// Server will be started after database connection in startServer function
