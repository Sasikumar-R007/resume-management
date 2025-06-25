const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your_email@gmail.com",
    pass: "your_app_password", // Use App Password, not real password
  },
});

async function sendOTP(email, otp, subject = "Your OTP Code") {
  await transporter.sendMail({
    from: "Resume System <your_email@gmail.com>",
    to: email,
    subject,
    html: `<h2>${otp}</h2><p>This OTP is valid for 10 minutes.</p>`,
  });
}

module.exports = { sendOTP };
