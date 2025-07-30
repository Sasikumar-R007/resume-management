  const express = require("express");
  const router = express.Router();
  const mongoose = require("mongoose");
  const TeamLeader = require("../models/teamLeader");

  // Add a new team leader (for seeding or admin use)
  router.post("/", async (req, res) => {
    try {
      const count = await TeamLeader.countDocuments();
      const teamLeadId = `STTL${(count + 1).toString().padStart(3, "0")}`;
      const teamLead = new TeamLeader({ ...req.body, teamLeadId });
      await teamLead.save();
      res.status(201).json(teamLead);
    } catch (error) {
      console.error("Error saving team leader:", error);
      res.status(500).json({ message: "Error saving team leader" });
    }
  });

  // POST login route for team leader
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      console.log("🔍 Attempting to find team leader with email:", email);
      console.log("Database readyState:", mongoose.connection.readyState);

      const teamLeader = await TeamLeader.findOne({ email });

      if (!teamLeader || teamLeader.password !== password) {
        console.log("❌ Invalid credentials for team leader:", email);
        return res.status(401).json({ message: "Invalid credentials" });
      }

      console.log("✅ Login successful for team leader:", email);
      res.status(200).json({ teamLeader });
    } catch (err) {
      console.error("Login error:", err);

      // Handle specific MongoDB errors
      if (err.name === "MongooseError" || err.name === "MongoError") {
        if (err.message.includes("buffering timed out")) {
          return res.status(500).json({
            message:
              "Database connection timeout. Please check MongoDB Atlas configuration.",
            error: "MongoDB connection timeout",
          });
        } else if (err.message.includes("ECONNREFUSED")) {
          return res.status(500).json({
            message:
              "Cannot connect to database. Please check your MongoDB Atlas settings.",
            error: "Database connection refused",
          });
        } else if (err.message.includes("ENOTFOUND")) {
          return res.status(500).json({
            message:
              "Database host not found. Please verify your MongoDB connection string.",
            error: "Database host not found",
          });
        }
      }

      res.status(500).json({
        message: "Server error during login",
        error: err.message,
      });
    }
  });

  // GET all team leaders
  router.get("/", async (req, res) => {
    try {
      const leads = await TeamLeader.find();
      res.json(leads);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch team leaders" });
    }
  });

  // GET by email for login
  router.get("/by-email/:email", async (req, res) => {
    try {
      const teamLead = await TeamLeader.findOne({ email: req.params.email });
      if (!teamLead) {
        return res.status(404).json({ message: "Team Leader not found" });
      }
      res.json(teamLead);
    } catch (err) {
      res.status(500).json({ message: "Error fetching team leader" });
    }
  });

  module.exports = router;
