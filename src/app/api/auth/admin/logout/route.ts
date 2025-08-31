import dbConnect from "@/src/app/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request:Request){
   await dbConnect();
   try {
    const cookieStore = await cookies();
    cookieStore.delete("adminToken");
    return NextResponse.json({
        success:true,
        message:"Logout Successfully"
    })
   } catch (error) {
    console.error("Err in Logout", error);
        return NextResponse.json({
        success:true,
        message:"Logout Successfully"
    })
   }
}