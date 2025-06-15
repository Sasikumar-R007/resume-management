// index.js (or server.js)

const express = require("express");
const cors = require("cors");
require('dotenv').config(); // Load .env at the very top
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==================== MongoDB Connection ====================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

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

// ==================== Job Routes ====================
const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

// ==================== Default Route ====================
app.get("/", (req, res) => {
  res.send("🟢 Resume & Job Backend is running");
});

// ==================== Start Server ====================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Stores Candidate data in Master DB

const candidateRoutes = require("./routes/candidates");
app.use("/api/candidates", require("./routes/candidates"));

// Stores Resume

app.use("/uploads", express.static("uploads")); // Serve files
