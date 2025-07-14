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
    console.log("Environment:", process.env.NODE_ENV || "development");

    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Already connected to MongoDB");
      return mongoose.connection;
    }

    // Parse connection string to check format
    let connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 60000, // Increased to 60 seconds
      socketTimeoutMS: 60000, // Increased to 60 seconds
      connectTimeoutMS: 60000, // Explicit connect timeout
      maxPoolSize: 1, // Single connection for serverless
      minPoolSize: 0, // No minimum connections
      maxIdleTimeMS: 10000, // Close connections quickly
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    };

    // Add retryWrites and w=majority if not present
    let finalMongoUri = mongoUri;
    if (!mongoUri.includes('retryWrites=true')) {
      finalMongoUri += (mongoUri.includes('?') ? '&' : '?') + 'retryWrites=true&w=majority';
    }

    console.log("Using connection string format:", finalMongoUri.substring(0, 50) + "...");

    const conn = await mongoose.connect(finalMongoUri, connectionOptions);

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
