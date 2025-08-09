const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// =================== Multer Config ===================
// For Vercel serverless, use memory storage
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
// });

// =================== Upload Resume ===================
router.post("/upload", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // For serverless, return file info instead of URL
  res.status(200).json({
    message: "File uploaded successfully",
    fileInfo: {
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
    note: "File processed in memory (serverless environment)",
  });
});

// =================== POST: New Candidate ===================
router.post("/", async (req, res) => {
  try {
    // Step 1: Generate Candidate ID
    const year = new Date().getFullYear().toString().slice(-2); // "25"
    const count = await Candidate.countDocuments({
      createdAt: {
        $gte: new Date(`${new Date().getFullYear()}-01-01T00:00:00Z`),
        $lte: new Date(),
      },
    });
    const serial = (count + 1).toString().padStart(4, "0"); // "0001"
    const candidateId = `STC${year}${serial}`; // e.g., STC250001

    // Step 2: Save new candidate
    const newCandidate = new Candidate({
      ...req.body,
      candidateId,
      appliedBy: "candidate",
      resumeLink: req.body.resumeLink || "",
    });

    await newCandidate.save();
    res.status(201).json({ message: "Candidate profile saved", candidateId });
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
// router.put("/profile-image", async (req, res) => {
//   const { email, profileImage } = req.body;

//   try {
//     const updatedCandidate = await Candidate.findOneAndUpdate(
//       { email },
//       { profileImage },
//       { new: true }
//     );

//     if (!updatedCandidate) {
//       return res.status(404).json({ message: "Candidate not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Profile image updated", candidate: updatedCandidate });
//   } catch (error) {
//     console.error("Error updating profile image:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// =================== POST: Upload Banner ===================
router.post("/upload-banner", upload.single("bannerImage"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No banner image uploaded" });
  }

  const bannerUrl = `/uploads/${Date.now()}_banner_${req.file.originalname}`;
  res.status(200).json({ bannerUrl }); // mimic upload (adjust if storing elsewhere)
});

// =================== POST: Upload Profile Image ===================
router.post("/upload-profile-image", upload.single("profileImage"), async (req, res) => {
  try {
    const email = req.body.email;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Simulate storing image URL — in real-world, upload to cloud and get URL
    const imageBuffer = req.file.buffer;
    const imageBase64 = `data:${req.file.mimetype};base64,${imageBuffer.toString("base64")}`;

    const updatedCandidate = await Candidate.findOneAndUpdate(
      { primaryEmail: email },
      { profileImage: imageBase64 },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    res.json({ message: "Image uploaded", candidate: updatedCandidate });
  } catch (err) {
    console.error("Upload error:", err);
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

    res
      .status(200)
      .json({ message: "Candidate archived successfully", data: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error archiving candidate", error: err.message });
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

// =================== GET: Candidate by candidateId ===================
router.get("/:candidateId", async (req, res) => {
  try {
    const { candidateId } = req.params;
    const candidate = await Candidate.findOne({ candidateId });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json(candidate);
  } catch (error) {
    console.error("Error fetching candidate:", error);
    res.status(500).json({ error: "Server error" });
  }
});
