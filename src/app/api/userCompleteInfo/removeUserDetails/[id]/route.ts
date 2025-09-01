import dbConnect from "@/src/app/lib/db";
import userDetailsModel from "@/src/app/models/userDetails.model";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, context: {params : Promise<{id:string}>}){
    await dbConnect();
    const {id} = await context.params;
    try {
        const UserDetails = await userDetailsModel.findByIdAndDelete(id);
        return NextResponse.json({
            success:true,
            message:"Removed User Details Successfully",
            UserDetails
        })

    } catch (error) {
            return NextResponse.json({
            success:false,
            message:"Err in removed User Details Successfully",
        })
    }
}
