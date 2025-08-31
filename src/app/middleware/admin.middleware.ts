// middleware.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function middleware(req: any) {
  const token = req.cookies.get("adminToken")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    console.log("🔑 Decoded:", decoded);

    // Attach adminId in cookies
    const res = NextResponse.next();
    const cookieStore = await cookies();
    cookieStore.set("adminId", decoded._id, { httpOnly: true })
    return res;
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}


export const config = {
  matcher: ["/api/Job/:path*"], // ✅ protect job routes only
};