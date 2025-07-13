const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async (retries = 3) => {
  try {
    // Use MONGO_URI to match index.js, with fallback to MONGO_URL
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;

    if (!mongoUri) {
      throw new Error(
        "MongoDB connection string not found in environment variables"
      );
    }

    console.log("🔗 Attempting to connect to MongoDB...");

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // 15 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    });

    console.log("✅ MongoDB Connected Successfully");
    return conn;
  } catch (error) {
    console.error(
      `❌ MongoDB connection error (attempt ${4 - retries}/3):`,
      error.message
    );

    if (retries > 1) {
      console.log(`🔄 Retrying connection in 2 seconds...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return connectDB(retries - 1);
    }

    console.log("💡 Troubleshooting tips:");
    console.log("   1. Check your MONGO_URI environment variable");
    console.log("   2. Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0");
    console.log("   3. Verify connection string format");
    console.log("   4. Check if MongoDB Atlas cluster is running");
    console.log("   5. Ensure your MongoDB Atlas cluster is not paused");
    throw error;
  }
};

// Handle connection events
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
});

module.exports = connectDB;
