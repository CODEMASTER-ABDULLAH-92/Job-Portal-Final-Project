import dbConnect from "../../../../lib/db";
import userModel from "../../../../models/user.model";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userName, email, password, mobile, countryCode } = await request.json();

    // Check for empty fields
    if (!userName || !email || !password || !mobile || !countryCode) {
      return NextResponse.json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const checkUserInExist = await userModel.findOne({ email });
    if (checkUserInExist) {
      return NextResponse.json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email" });
    }

    // ✅ Password regex checks
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    if (!hasMinLength) return NextResponse.json({ success: false, message: "Password must be at least 8 characters long" });
    if (!hasUppercase) return NextResponse.json({ success: false, message: "Password must contain at least one uppercase letter" });
    if (!hasLowercase) return NextResponse.json({ success: false, message: "Password must contain at least one lowercase letter" });
    if (!hasNumber) return NextResponse.json({ success: false, message: "Password must contain at least one number" });
    if (!hasSpecialChar) return NextResponse.json({ success: false, message: "Password must contain at least one special character" });

    // ✅ Hash the password properly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create user first
    const User = new userModel({ userName, email, mobile, countryCode, password: hashedPassword });
    await User.save();

    // ✅ Create JWT using new user ID
    const userToken = jwt.sign(
      { _id: User._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "7d" }
    );

    // ✅ Store JWT in cookies
    const cookieStore = await cookies();
    cookieStore.set("userToken", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully!",
      User,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Server error",
      error: (error as Error).message,
    });
  }
}
