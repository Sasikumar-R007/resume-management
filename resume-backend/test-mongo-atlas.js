const mongoose = require("mongoose");
require("dotenv").config();

async function testMongoAtlas() {
  console.log("🔍 Testing MongoDB Atlas Connection...");
  console.log("=====================================");
  
  // Check environment variables
  console.log("\n1. Environment Variables:");
  console.log("- NODE_ENV:", process.env.NODE_ENV || "Not set");
  console.log("- MONGO_URI:", process.env.MONGO_URI ? "✅ Set" : "❌ Not set");
  console.log("- MONGO_URL:", process.env.MONGO_URL ? "✅ Set" : "❌ Not set");
  
  const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;
  
  if (!mongoUri) {
    console.error("\n❌ No MongoDB URI found!");
    console.log("Please set MONGO_URI or MONGO_URL environment variable");
    return;
  }
  
  // Analyze connection string
  console.log("\n2. Connection String Analysis:");
  if (mongoUri.includes("mongodb+srv://")) {
    console.log("✅ Using MongoDB Atlas (cloud)");
  } else if (mongoUri.includes("mongodb://")) {
    console.log("✅ Using MongoDB local/network");
  } else {
    console.log("❌ Invalid connection string format");
    return;
  }
  
  // Check for required parameters
  const hasRetryWrites = mongoUri.includes("retryWrites=true");
  const hasWMajority = mongoUri.includes("w=majority");
  
  console.log("- retryWrites=true:", hasRetryWrites ? "✅ Present" : "❌ Missing");
  console.log("- w=majority:", hasWMajority ? "✅ Present" : "❌ Missing");
  
  // Test connection with different timeouts
  console.log("\n3. Testing Connection...");
  
  const testConnection = async (timeout) => {
    try {
      console.log(`\n🔄 Testing with ${timeout}ms timeout...`);
      
      const conn = await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: timeout,
        socketTimeoutMS: timeout,
        connectTimeoutMS: timeout,
        maxPoolSize: 1,
        minPoolSize: 0,
      });
      
      console.log("✅ Connection successful!");
      console.log("- Database:", conn.connection.name);
      console.log("- Host:", conn.connection.host);
      console.log("- Port:", conn.connection.port);
      
      // Test a simple query
      const collections = await conn.connection.db.listCollections().toArray();
      console.log("- Collections:", collections.map(c => c.name));
      
      await mongoose.connection.close();
      return true;
      
    } catch (error) {
      console.log(`❌ Connection failed with ${timeout}ms timeout:`);
      console.log("- Error:", error.message);
      
      if (error.message.includes("ENOTFOUND")) {
        console.log("💡 This suggests DNS resolution failed");
        console.log("   Check your connection string format");
      } else if (error.message.includes("ECONNREFUSED")) {
        console.log("💡 This suggests connection refused");
        console.log("   Check MongoDB Atlas IP whitelist");
      } else if (error.message.includes("Authentication failed")) {
        console.log("💡 This suggests wrong username/password");
        console.log("   Check your credentials");
      } else if (error.message.includes("timed out")) {
        console.log("💡 This suggests network timeout");
        console.log("   Try increasing timeout or check network");
      }
      
      return false;
    }
  };
  
  // Test with different timeouts
  const timeouts = [10000, 30000, 60000];
  
  for (const timeout of timeouts) {
    const success = await testConnection(timeout);
    if (success) {
      console.log(`\n✅ Connection test passed with ${timeout}ms timeout`);
      break;
    }
  }
  
  console.log("\n4. Recommendations:");
  console.log("- Ensure MongoDB Atlas cluster is running (not paused)");
  console.log("- Add 0.0.0.0/0 to IP Access List in MongoDB Atlas");
  console.log("- Verify username and password in connection string");
  console.log("- Check if connection string has special characters that need URL encoding");
  console.log("- Try using a different network if possible");
}

testMongoAtlas().catch(console.error); 