const mongoose = require("mongoose");
require("dotenv").config();

async function testConnection() {
  try {
    console.log("🔍 Testing MongoDB connection...");
    console.log("Environment variables:");
    console.log("- MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not set");
    console.log("- MONGO_URL:", process.env.MONGO_URL ? "Set" : "Not set");
    console.log("- NODE_ENV:", process.env.NODE_ENV || "Not set");
    
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;
    
    if (!mongoUri) {
      console.error("❌ No MongoDB URI found in environment variables");
      return;
    }
    
    console.log("🔗 Attempting to connect...");
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log("✅ MongoDB Connected Successfully!");
    console.log("Connection state:", mongoose.connection.readyState);
    console.log("Database name:", conn.connection.name);
    
    // Test a simple query
    const collections = await conn.connection.db.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));
    
    await mongoose.connection.close();
    console.log("✅ Connection test completed successfully");
    
  } catch (error) {
    console.error("❌ Connection test failed:", error.message);
    console.error("Full error:", error);
  }
}

testConnection();
