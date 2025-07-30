
const express = require("express");
const router = express.Router();
const Contribution = require("../models/Contribution");

// GET all contributions
router.get("/", async (req, res) => {
  try {
    const contributions = await Contribution.find().sort({ createdAt: -1 });
    res.json(contributions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch contributions", error: err });
  }
});

// POST new contribution
router.post("/", async (req, res) => {
  try {
    const newContribution = new Contribution(req.body);
    await newContribution.save();
    res.status(201).json(newContribution);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save contribution", error: err });
  }
});

// PUT update contribution
router.put("/:id", async (req, res) => {
  try {
    const updated = await Contribution.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update contribution", error: err });
  }
});

// DELETE /api/contributions/:id
router.delete("/:id", async (req, res) => {
  try {
    await Contribution.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
      res.status(500).json({ error: "Delete failed" });
    }
  });

module.exports = router;
