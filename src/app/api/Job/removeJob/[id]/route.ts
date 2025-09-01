import dbConnect from "@/src/app/lib/db";
import JobModel from "@/src/app/models/job.models";
import { NextResponse } from "next/server";

export async function DELETE(request: Request,
  context: { params: Promise<{ id: string }> }){
    await dbConnect();
    const {id} = await context.params;
    try {
        const job = await JobModel.findByIdAndDelete(id);
        return NextResponse.json({
            success:true, 
            message:"Remove Job Successfully",
            job
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Err in Removing Job"
        })
    }
}