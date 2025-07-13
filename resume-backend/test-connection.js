const mongoose = require("mongoose");
require("dotenv").config();

async function testConnection() {
  console.log("🔍 Testing MongoDB Connection...");
  console.log("Environment variables:");
  console.log("- MONGO_URI:", process.env.MONGO_URI ? "✅ Set" : "❌ Not set");
  console.log("- MONGO_URL:", process.env.MONGO_URL ? "✅ Set" : "❌ Not set");
  console.log("- NODE_ENV:", process.env.NODE_ENV || "development");

  const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;

  if (!mongoUri) {
    console.error("❌ No MongoDB connection string found!");
    console.log(
      "Please set either MONGO_URI or MONGO_URL environment variable"
    );
    return;
  }

  console.log("\n🔗 Connection string format check:");
  if (mongoUri.includes("mongodb+srv://")) {
    console.log("✅ Using MongoDB Atlas (cloud)");
  } else if (mongoUri.includes("mongodb://")) {
    console.log("✅ Using MongoDB local/network");
  } else {
    console.log("❌ Invalid connection string format");
    return;
  }

  try {
    console.log("\n🔄 Attempting connection...");
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ Connection successful!");
    console.log("Database:", conn.connection.db.databaseName);
    console.log("Host:", conn.connection.host);
    console.log("Port:", conn.connection.port);

    // Test a simple query
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(
      "Collections:",
      collections.map((c) => c.name)
    );

    await mongoose.connection.close();
    console.log("✅ Connection closed successfully");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);

    if (error.message.includes("ENOTFOUND")) {
      console.log("\n💡 This usually means:");
      console.log("   - DNS resolution failed");
      console.log("   - Check your connection string");
      console.log("   - Verify MongoDB Atlas cluster is running");
    } else if (error.message.includes("ECONNREFUSED")) {
      console.log("\n💡 This usually means:");
      console.log("   - Connection refused by server");
      console.log("   - Check IP whitelist in MongoDB Atlas");
      console.log("   - Add 0.0.0.0/0 to IP Access List");
    } else if (error.message.includes("Authentication failed")) {
      console.log("\n💡 This usually means:");
      console.log("   - Wrong username/password");
      console.log("   - Check your connection string");
    } else if (error.message.includes("buffering timed out")) {
      console.log("\n💡 This usually means:");
      console.log("   - Network timeout");
      console.log("   - Check your internet connection");
      console.log("   - Try increasing timeout values");
    } else if (error.message.includes("not supported")) {
      console.log("\n💡 This usually means:");
      console.log("   - MongoDB driver version issue");
      console.log("   - Some connection options are deprecated");
      console.log("   - Check your mongoose/mongodb versions");
    }
  }
}

testConnection();
