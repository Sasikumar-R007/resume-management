const express = require("express");
const router = express.Router();
const ArchivedCandidate = require("../models/ArchivedCandidate");

// POST: Archive a candidate
router.post("/", async (req, res) => {
  try {
    const { name, email, status, reason } = req.body;
    const archived = new ArchivedCandidate({ name, email, status, reason });
    await archived.save();
    res.status(201).json(archived);
  } catch (err) {
    res.status(500).json({ error: "Error saving archived candidate" });
  }
});

// GET: Fetch all archived candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await ArchivedCandidate.find().sort({ archivedAt: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: "Error fetching archived candidates" });
  }
});

module.exports = router;
