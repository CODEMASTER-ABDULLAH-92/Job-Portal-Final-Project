import dbConnect from "@/src/app/lib/db";
import JobModel from "@/src/app/models/job.models";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await context.params;
    const {
      jobName,
      location,
      description,
      jobStatus,
      jobType,
      salary,
      experienceLevel,
      responsibilities,
      requirements,
    } = await request.json();
    const updatePost = await JobModel.findByIdAndUpdate(
      id,
      {
        jobName,
        location,
        description,
        jobStatus,
        jobType,
        salary,
        experienceLevel,
        responsibilities,
        requirements,
      },
      { new: true }
    );
    if (!updatePost) {
      return NextResponse.json({
        success: false,
        message: "Job data Not Found",
      });
    }
    return NextResponse.json({
      success: true,
      message: "Job update successfully",
      updatePost,
    });
  } catch (error) {
    console.error("Err in Job Updation");
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
