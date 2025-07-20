const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: null,
  },
  designation: {
    type: String,
    default: "System Administrator",
  },
  department: {
    type: String,
    default: "IT",
  },
  permissions: {
    type: [String],
    default: ["user_management", "system_settings", "data_export", "analytics"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
adminSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
