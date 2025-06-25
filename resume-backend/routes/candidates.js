const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const multer = require("multer");
const path = require("path");

// =================== Multer Config ===================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// =================== Upload Resume ===================
router.post("/upload", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileUrl = `${process.env.SERVER_BASE_URL}/uploads/${req.file.filename}`;
  res.status(200).json({ fileUrl });
});

// =================== POST: New Candidate ===================
router.post("/", async (req, res) => {
  try {
    const newCandidate = new Candidate({
      ...req.body,
      resumeLink: req.body.resumeLink || "", // ✅ Ensure resume link is saved
      appliedBy: "candidate",
    });

    await newCandidate.save();
    res.status(201).json({ message: "Candidate profile saved successfully" });
  } catch (error) {
    console.error("Error saving candidate:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// =================== GET: All Active Candidates ===================
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find({ isArchived: false });
    res.json(candidates);
  } catch (err) {
    console.error("Error fetching candidates:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// =================== GET: Archived Candidates ===================
router.get("/archived", async (req, res) => {
  try {
    const candidates = await Candidate.find({ isArchived: true });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================== PUT: Update Profile Image ===================
router.put("/profile-image", async (req, res) => {
  const { email, profileImage } = req.body;

  try {
    const updatedCandidate = await Candidate.findOneAndUpdate(
      { email },
      { profileImage },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({ message: "Profile image updated", candidate: updatedCandidate });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// =================== PATCH: Archive Candidate ===================
router.patch("/:id/archive", async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, status } = req.body;

    const updated = await Candidate.findByIdAndUpdate(
      id,
      {
        isArchived: true,
        status: status || "Rejected",
        rejectionReason: reason,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({ message: "Candidate archived successfully", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Error archiving candidate", error: err.message });
  }
});

// =================== PATCH: Restore Archived Candidate ===================
router.patch("/:id/restore", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Candidate.findByIdAndUpdate(
      id,
      {
        $set: { status: "Processing" },
        $unset: { archivedAt: "", reason: "" },
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Candidate not found" });
    res.json(updated);
  } catch (err) {
    console.error("Restore error:", err);
    res.status(500).json({ error: "Failed to restore candidate" });
  }
});

module.exports = router;
