import mongoose, { Document, Schema, Model } from "mongoose";

// 1️⃣ Define the TypeScript interface for the document
export interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

// 2️⃣ Create the schema
const otpSchema: Schema<IOtp> = new Schema<IOtp>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // 5 minutes
});

// 3️⃣ Avoid model recompilation issues in Next.js (hot reload)
const Otp: Model<IOtp> =
  mongoose.models.Otp || mongoose.model<IOtp>("Otp", otpSchema);

export default Otp;
