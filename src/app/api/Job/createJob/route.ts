// import dbConnect from "@/src/app/lib/db";
// import JobModel from "@/src/app/models/job.models";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   await dbConnect();
//   const cookieStore = await cookies();
//   const adminId = cookieStore.get("adminId");
//   //  const adminId = request.cookies.get("adminId")?.value;

//     console.log("🟡 Received adminId:", adminId);

//   try {
//     const {
//       jobName,
//       location,
//       description,
//       jobStatus,
//       jobType,
//       salary,
//       experienceLevel,
//       responsibilities,
//       requirements,
//     } = await request.json();
    

//     // ✅ Extract adminId from middleware header

//     if (!adminId) {
//       return NextResponse.json({ success: false, message: "Admin ID missing from request" }, { status: 400 });
//     }

//     // Validation checks
//     if (!jobName) return NextResponse.json({ success: false, message: "Job name is required" }, { status: 400 });
//     if (!location) return NextResponse.json({ success: false, message: "Location is required" }, { status: 400 });
//     if (!description) return NextResponse.json({ success: false, message: "Description is required" }, { status: 400 });
//     if (!jobStatus) return NextResponse.json({ success: false, message: "Job status is required" }, { status: 400 });
//     if (!jobType) return NextResponse.json({ success: false, message: "Job type is required" }, { status: 400 });
//     if (!salary) return NextResponse.json({ success: false, message: "Salary is required" }, { status: 400 });
//     if (!experienceLevel) return NextResponse.json({ success: false, message: "Experience level is required" }, { status: 400 });
//     if (!responsibilities) return NextResponse.json({ success: false, message: "Responsibilities are required" }, { status: 400 });
//     if (!requirements) return NextResponse.json({ success: false, message: "Requirements are required" }, { status: 400 });

//     // ✅ Create job with adminId
//     const Job = new JobModel({
//       adminId, // stored from JWT
//       jobName,
//       location,
//       description,
//       jobStatus,
//       jobType,
//       salary,
//       experienceLevel,
//       responsibilities,
//       requirements,
//       admin: adminId,
//     });

//     await Job.save();

//     return NextResponse.json({ success: true, message: "Job added successfully" }, { status: 201 });
//   } catch (error) {
//     console.error("Error in adding Job:", error);
//     return NextResponse.json({ success: false, message: "Server error while adding job" }, { status: 500 });
//   }
// }



import dbConnect from "@/src/app/lib/db";
import JobModel from "@/src/app/models/job.models";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await dbConnect();

  try {
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

    // Validation
    // Validation (separate for each field)
if (!jobName) {
  return NextResponse.json({ success: false, message: "Job name is required" }, { status: 400 });
}
if (!location) {
  return NextResponse.json({ success: false, message: "Location is required" }, { status: 400 });
}
if (!description) {
  return NextResponse.json({ success: false, message: "Description is required" }, { status: 400 });
}
if (!jobStatus) {
  return NextResponse.json({ success: false, message: "Job status is required" }, { status: 400 });
}
if (!jobType) {
  return NextResponse.json({ success: false, message: "Job type is required" }, { status: 400 });
}
if (!salary) {
  return NextResponse.json({ success: false, message: "Salary is required" }, { status: 400 });
}
if (!experienceLevel) {
  return NextResponse.json({ success: false, message: "Experience level is required" }, { status: 400 });
}
if (!responsibilities) {
  return NextResponse.json({ success: false, message: "Responsibilities are required" }, { status: 400 });
}
if (!requirements) {
  return NextResponse.json({ success: false, message: "Requirements are required" }, { status: 400 });
}


    // Get token from cookies
    const cookieStore = await cookies(); // no need for await
    const token = cookieStore.get("adminToken")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    } catch (err) {
      return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
    }

    // Create Job
    const Job = new JobModel({
      jobName,
      location,
      description,
      jobStatus,
      jobType,
      salary,
      experienceLevel,
      responsibilities,
      requirements,
      admin: decoded._id, // Must exist in schema
    });

    await Job.save();

    return NextResponse.json({ success: true, message: "Job added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Err in adding Job:", error);
    return NextResponse.json({ success: false, message: "Server error while adding job" }, { status: 500 });
  }
}
