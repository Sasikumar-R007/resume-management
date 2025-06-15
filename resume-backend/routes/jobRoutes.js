const express = require("express");
const router = express.Router();
const Job = require("../models/job");

// Add a job
router.post("/", async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      keyResponsibilities: req.body.keyResponsibilities || [],
      mustHaveQualifications: req.body.mustHaveQualifications || [],
      niceToHaveQualifications: req.body.niceToHaveQualifications || [],
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error("Error saving job:", err);
    res.status(500).json({ message: "Failed to add job" });
  }
});

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ _id: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// DELETE a job by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
