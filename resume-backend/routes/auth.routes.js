const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const { sendOTP } = require("../utils/mailer");

// Send OTP for forgot password
router.post("/forgot-password", async (req, res) => {
  const { primaryEmail } = req.body;

  try {
    const user = await Candidate.findOne({ primaryEmail });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.resetOTP = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    await sendOTP(primaryEmail, otp, "Password Reset OTP");
    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Error sending OTP", error: err.message });
  }
});

// Reset password
router.post("/reset-password", async (req, res) => {
  const { primaryEmail, otp, newPassword } = req.body;

  try {
    const user = await Candidate.findOne({ primaryEmail });

    if (
      !user ||
      user.resetOTP !== parseInt(otp) ||
      Date.now() > user.otpExpires
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = newPassword; // consider hashing
    user.resetOTP = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Error resetting password", error: err.message });
  }
});

// Send OTP for 2FA login
router.post("/send-2fa-otp", async (req, res) => {
  const { primaryEmail } = req.body;

  try {
    const user = await Candidate.findOne({ primaryEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.resetOTP = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendOTP(primaryEmail, otp, "2FA Login OTP");
    res.json({ message: "OTP sent for 2FA verification" });
  } catch (err) {
    res.status(500).json({ message: "Error sending 2FA OTP", error: err.message });
  }
});

// Verify 2FA OTP
router.post("/verify-2fa-otp", async (req, res) => {
  const { primaryEmail, otp } = req.body;

  try {
    const user = await Candidate.findOne({ primaryEmail });

    if (
      !user ||
      user.resetOTP !== parseInt(otp) ||
      Date.now() > user.otpExpires
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.resetOTP = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "2FA verification successful" });
  } catch (err) {
    res.status(500).json({ message: "Error verifying 2FA", error: err.message });
  }
});

module.exports = router;
