const express = require("express");
const router = express.Router();
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
      res.status(500).json({ message: "Server error" });
    }
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
