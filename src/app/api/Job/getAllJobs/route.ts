import dbConnect from "@/src/app/lib/db";
import JobModel from "@/src/app/models/job.models";
import { NextResponse } from "next/server";

export async function GET(){
    await dbConnect();

    try {
        const jobs = await JobModel.find({}).sort({createdAt:-1});
        return NextResponse.json({
            success:true,
            message:"Getting all Jobs Successfully",
            jobs
        })
    } catch (error) {
        console.error("Err in Job Listing", error);
        return NextResponse.json({
            success:false,
            message:"Err in Jobs Listing",
        })
    }
}