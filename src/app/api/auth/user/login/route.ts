import dbConnect from "@/src/app/lib/db";
import userModel from "@/src/app/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    const User = await userModel.findOne({ email });
    if (!User) {
      return NextResponse.json(
        {
          success: false,
          message: "User doesn't exist", // ✅ typo fixed
        },
        { status: 404 }
      );
    }

    const passwordMatching = await bcrypt.compare(password, User.password);
    if (!passwordMatching) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect Email or Password",
        },
        { status: 401 }
      );
    }

    // ❌ process.env.JWT_SECRET_KEY might be undefined
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }

    const userToken = jwt.sign({ _id: User._id }, secret, { expiresIn: "7d" });


    const cookieStore = await cookies();

    cookieStore.set("userToken", userToken, {
      httpOnly: true, // ✅ prevent JS access (important for security)
      secure: process.env.NODE_ENV === "production", // ✅ HTTPS only in prod
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token: userToken, // optional if you want to return it
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
