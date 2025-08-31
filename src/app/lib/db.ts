import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected === 1) {
    console.log("✅ Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState;
    // db.connections[0].readyState = “What’s the status of my first MongoDB connection right now?”
    console.log("🚀 Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw new Error("Database connection failed");
  }
}

// export default dbConnect(); ❌ This is Wrong Way;

export default dbConnect;

// export default dbConnect ✅ (function reference)

// export default dbConnect() ❌ (executes once, exports a promise)