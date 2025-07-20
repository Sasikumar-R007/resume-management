const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Admin = require("../models/Admin");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads/profiles");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "admin-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// 🔹 GET all admins
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Failed to fetch admins" });
  }
});

// 🔹 Login / Get Admin by Email
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔍 Attempting to find admin with email:", email);
    console.log("Database readyState:", mongoose.connection.readyState);

    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log("❌ Admin not found for email:", email);
      return res.status(404).json({ message: "Admin not found" });
    }

    console.log("✅ Admin found:", admin.name);

    if (admin.password !== password) {
      console.log("❌ Invalid password for admin:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    console.log("✅ Login successful for admin:", email);
    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    console.error("Login error:", error);

    // Handle specific MongoDB errors
    if (error.name === "MongooseError" || error.name === "MongoError") {
      if (error.message.includes("buffering timed out")) {
        return res.status(500).json({
          message:
            "Database connection timeout. Please check MongoDB Atlas configuration.",
          error: "MongoDB connection timeout",
        });
      } else if (error.message.includes("ECONNREFUSED")) {
        return res.status(500).json({
          message:
            "Cannot connect to database. Please check your MongoDB Atlas settings.",
          error: "Database connection refused",
        });
      } else if (error.message.includes("ENOTFOUND")) {
        return res.status(500).json({
          message:
            "Database host not found. Please verify your MongoDB connection string.",
          error: "Database host not found",
        });
      }
    }

    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
});

// 🔹 Get currently logged-in admin (for profile modal)
router.get("/profile", async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Get admin details by ID
router.get("/:adminId", async (req, res) => {
  try {
    const admin = await Admin.findOne({
      adminId: req.params.adminId,
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Create new admin (for system setup)
router.post("/", async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    const adminId = `ADM${(count + 1).toString().padStart(3, "0")}`;

    const admin = new Admin({ ...req.body, adminId });
    await admin.save();

    res.status(201).json(admin);
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Error creating admin" });
  }
});

// 🔹 Update admin
router.put("/:adminId", upload.single("profileImage"), async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: Date.now() };

    // Handle profile image upload
    if (req.file) {
      updateData.profileImage = `/uploads/profiles/${req.file.filename}`;
    }

    const admin = await Admin.findOneAndUpdate(
      { adminId: req.params.adminId },
      updateData,
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Delete admin
router.delete("/:adminId", async (req, res) => {
  try {
    const admin = await Admin.findOneAndDelete({
      adminId: req.params.adminId,
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
