const mongoose = require("mongoose");
const Admin = require("../models/Admin");
require("dotenv").config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/jobportal";

const seedAdmins = async () => {
  await mongoose.connect(MONGO_URI);

  // Optional: Clear existing admins
  await Admin.deleteMany();

  const admins = [
    {
      adminId: "ADM001",
      name: "Kumaran",
      email: "kumaran@scaling.com",
      password: "kumaran777",
      mobile: "9999999999",
      designation: "System Administrator",
      department: "IT",
      permissions: [
        "user_management",
        "system_settings",
        "data_export",
        "analytics",
        "full_access",
      ],
      isActive: true,
    },
  ];

  await Admin.insertMany(admins);
  console.log("✅ Admins seeded successfully");
  console.log("📧 Admin accounts created:");
  admins.forEach((admin) => {
    console.log(`   - ${admin.name}: ${admin.email} / ${admin.password}`);
  });
  process.exit();
};

seedAdmins();
