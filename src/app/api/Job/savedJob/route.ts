import dbConnect from "../../../lib/db";
import userModel from "../../../models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userId, jobId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: "userId are required" },
        { status: 400 }
      );
    }

    const user = await userModel
      .findByIdAndUpdate(
        userId,
        { $addToSet: { savedJobs: jobId } }, // ✅ prevents duplicates
        { new: true }
      )
      .populate("savedJobs");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ✅ Important: RETURN response
    return NextResponse.json({
      message: "Job saved successfully",
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    console.error("Error saving job:", error);
    return NextResponse.json(
      { message: "Error saving job", error: (error as Error).message },
      { status: 500 }
    );
  }
}
