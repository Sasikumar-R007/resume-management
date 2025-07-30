const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema(
  {
    leader: String,
    quarter: String,
    contributor: String,
    revenue: Number,
    client: String,
    position: String,
    offerDate: Date,
    joiningDate: Date,
    scheme: String,
    incentive: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contribution", contributionSchema);
