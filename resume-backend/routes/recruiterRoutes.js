const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Recruiter = require("../models/Recruiter");

// 🔹 GET all recruiters
router.get("/", async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.json(recruiters);
  } catch (error) {
    console.error("Error fetching recruiters:", error);
    if (
      error.name === "MongooseError" &&
      error.message.includes("buffering timed out")
    ) {
      res.status(500).json({
        message:
          "Database connection timeout. Please check MongoDB Atlas configuration.",
        error: "MongoDB connection issue",
      });
    } else {
      res.status(500).json({ message: "Failed to fetch recruiters" });
    }
  }
});

// 🔹 Login / Get Recruiter by Email
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      console.error("Database not connected. ReadyState:", mongoose.connection.readyState);
      return res.status(500).json({
        message: "Database connection not available. Please try again.",
        error: "Database connection issue"
      });
    }

    const recruiter = await Recruiter.findOne({ email });

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    if (recruiter.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", recruiter });
  } catch (error) {
    console.error("Login error:", error);
    
    // Handle specific MongoDB errors
    if (error.name === "MongooseError" || error.name === "MongoError") {
      if (error.message.includes("buffering timed out")) {
        return res.status(500).json({
          message: "Database connection timeout. Please check MongoDB Atlas configuration.",
          error: "MongoDB connection timeout"
        });
      } else if (error.message.includes("ECONNREFUSED")) {
        return res.status(500).json({
          message: "Cannot connect to database. Please check your MongoDB Atlas settings.",
          error: "Database connection refused"
        });
      } else if (error.message.includes("ENOTFOUND")) {
        return res.status(500).json({
          message: "Database host not found. Please verify your MongoDB connection string.",
          error: "Database host not found"
        });
      }
    }
    
    res.status(500).json({ 
      message: "Server error during login",
      error: error.message 
    });
  }
});

// 🔹 Get recruiter details by ID
router.get("/:recruiterId", async (req, res) => {
  try {
    const recruiter = await Recruiter.findOne({
      recruiterId: req.params.recruiterId,
    });

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json(recruiter);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
