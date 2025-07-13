const mongoose = require("mongoose");

const fileRecordSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    files: [
      {
        fileUrl: String,
        fileName: String,
        originalName: String,
        size: Number,
        mimetype: String,
      },
    ],
    timestamp: {
      type: Date,
      default: Date.now,
    },
    uploadedBy: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "archived", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FileRecord", fileRecordSchema);
