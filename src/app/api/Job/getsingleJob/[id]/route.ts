import dbConnect from "@/src/app/lib/db";
import JobModel from "@/src/app/models/job.models";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await context.params; // ✅ await params

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Blog ID is required" },
      { status: 400 }
    );
  }

  try {
    const singlePost = await JobModel.findById(id);

    if (!singlePost) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Fetching Data is successful",
        singlePost,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in getting single Job:", error);
    return NextResponse.json(
      { success: false, message: "Error in getting single Job" },
      { status: 500 }
    );
  }
}