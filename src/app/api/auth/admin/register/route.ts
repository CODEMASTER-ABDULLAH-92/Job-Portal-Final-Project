import dbConnect from "@/src/app/lib/db";
import adminModel from "@/src/app/models/admin.model";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userName, email, password, mobile, countryCode } =
      await request.json();

    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    if (!userName || !email || !password || !mobile || !countryCode) {
      return NextResponse.json({
        success: false,
        message: "All feilds are required",
      });
    }

    const checkAdminIsExist = await adminModel.findOne({ email });

    if (!hasMinLength)
      return NextResponse.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    if (!hasUppercase)
      return NextResponse.json({
        success: false,
        message: "Password must contain at least one uppercase letter",
      });
    if (!hasLowercase)
      return NextResponse.json({
        success: false,
        message: "Password must contain at least one lowercase letter",
      });
    if (!hasNumber)
      return NextResponse.json({
        success: false,
        message: "Password must contain at least one number",
      });
    if (!hasSpecialChar)
      return NextResponse.json({
        success: false,
        message: "Password must contain at least one special character",
      });

    if (checkAdminIsExist) {
      return NextResponse.json({
        success: false,
        message: "User already exist",
      });
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json({
        success: false,
        message: "Please Enter a valid Email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new adminModel({
        mobile,userName, email,countryCode, password:hashedPassword
    })
    await admin.save();

    const adminToken = jwt.sign({_id:admin._id}, process.env.JWT_SECRET_KEY, {expiresIn:"7d"});

    const cookieStore = await cookies();
    cookieStore.set("adminToken", adminToken,{
        httpOnly:true,
        maxAge:7 * 24 * 60 * 60,
        path:"/"
    })

    return NextResponse.json({
      success: true,
      message: "Admin registered successfully!",
      admin,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Server error",
      error: (error as Error).message,
    });
  }
}
