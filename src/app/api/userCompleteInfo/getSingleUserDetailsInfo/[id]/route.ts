import dbConnect from "@/src/app/lib/db";
import userDetailsModel from "@/src/app/models/userDetails.model";
import { NextResponse } from "next/server";

export async function GET(request:Request, context: {params: Promise<{id:string}>}){
    await dbConnect();
    const {id} = await context.params;
    try {
        const singleUserDetails = await userDetailsModel.findById(id);
        return NextResponse.json({
            success:true,
            message:"Getting single User successfully",
            singleUserDetails,
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Err in singleUser Details"
        })
    }
}