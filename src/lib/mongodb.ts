// lib/dbConnection.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

let isConnected = false;
export async function connectToDB(): Promise<void> {
  if (isConnected) return
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    if (db.connections[0].readyState === 1) {
      isConnected = true
      console.log("Connected to MongoDB");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ MongoDB connection error:", err.message);
      throw new Error("Failed to connect to MongoDB");
    }
  }
}
