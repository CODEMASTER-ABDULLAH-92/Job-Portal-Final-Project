import Otp from "@/src/app/models/otp";
import connectDB from "@/src/app/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new Response(JSON.stringify({ success: false, message: "Email and OTP are required" }), { status: 400 });
    }

    // Find OTP record
    const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return new Response(JSON.stringify({ success: false, message: "OTP not found or expired" }), { status: 400 });
    }

    if (otpRecord.otp !== otp) {
      return new Response(JSON.stringify({ success: false, message: "Invalid OTP" }), { status: 400 });
    }

    // OTP is valid
    return new Response(JSON.stringify({ success: true, message: "OTP verified successfully" }), { status: 200 });
  } catch (error: any) {
    console.error("OTP Verify Error:", error);
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
