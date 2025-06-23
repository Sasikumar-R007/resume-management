const express = require("express");
const router = express.Router();
const Recruiter = require("../models/Recruiter");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const recruiter = await Recruiter.findOne({ email, password });
  if (!recruiter) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json(recruiter); // returns entire object with name, email etc.
});


module.exports = router;
