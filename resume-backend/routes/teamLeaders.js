const express = require("express");
const router = express.Router();
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
      const teamLeader = await TeamLeader.findOne({ email });
  
      if (!teamLeader || teamLeader.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      res.status(200).json({ teamLeader });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error during login" });
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
