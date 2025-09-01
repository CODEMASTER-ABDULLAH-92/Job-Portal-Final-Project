import dbConnect from "@/src/app/lib/db";
import adminModel from "@/src/app/models/admin.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();
    const admin = await adminModel.findOne({ email });

    // Check if admin exists
    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "Admin does not exist",
      });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return NextResponse.json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Generate JWT
    const adminToken = jwt.sign(
      { _id: admin._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "7d" }
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("adminToken", adminToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/", // important for Next.js cookies
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Return response
    return NextResponse.json({
      success: true,
      message: "Admin logged in successfully",
      admin,
      adminToken, // optional: send token if you need it on client
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
