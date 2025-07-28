const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");

// Get all interviews for a recruiter
router.get("/", async (req, res) => {
  try {
    const { recruiterId } = req.query;
    if (!recruiterId)
      return res.status(400).json({ error: "recruiterId required" });
    const interviews = await Interview.find({ recruiterId });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new interview
router.post("/", async (req, res) => {
  try {
    const interview = new Interview(req.body);
    await interview.save();
    res.status(201).json(interview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update interview by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Interview.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
