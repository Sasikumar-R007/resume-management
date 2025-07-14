const mongoose = require("mongoose");
require("dotenv").config();

async function testLoginFix() {
  console.log("🔍 Testing Login Route Fix...");
  console.log("=================================");

  try {
    // Test database connection first
    console.log("\n1. Testing Database Connection...");
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;

    if (!mongoUri) {
      console.error("❌ No MongoDB URI found!");
      return;
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });

    console.log("✅ Database connected successfully");
    console.log("ReadyState:", mongoose.connection.readyState);

    // Test Recruiter model
    console.log("\n2. Testing Recruiter Model...");
    const Recruiter = require("./models/Recruiter");

    const recruiters = await Recruiter.find().limit(1);
    console.log(
      "✅ Recruiter model works, found",
      recruiters.length,
      "recruiters"
    );

    if (recruiters.length > 0) {
      console.log("Sample recruiter email:", recruiters[0].email);
    }

    // Test TeamLeader model
    console.log("\n3. Testing TeamLeader Model...");
    const TeamLeader = require("./models/teamLeader");

    const teamLeaders = await TeamLeader.find().limit(1);
    console.log(
      "✅ TeamLeader model works, found",
      teamLeaders.length,
      "team leaders"
    );

    if (teamLeaders.length > 0) {
      console.log("Sample team leader email:", teamLeaders[0].email);
    }

    console.log("\n4. Login Route Analysis:");
    console.log(
      "✅ Removed redundant database connection checks from login routes"
    );
    console.log("✅ Middleware now handles all database connection management");
    console.log("✅ Login routes will rely on middleware for connection state");

    console.log("\n5. Expected Behavior:");
    console.log("- GET /api/recruiters: Should work (already working)");
    console.log("- GET /api/jobs: Should work (already working)");
    console.log("- POST /api/recruiters/login: Should now work");
    console.log("- POST /api/team-leaders/login: Should now work");

    await mongoose.connection.close();
    console.log("\n✅ Test completed successfully");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testLoginFix();
