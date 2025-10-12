import nodemailer from "nodemailer";
import Otp from "@/src/app/models/otp";
import connectDB from "@/src/app/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, message: "Email is required" }),
        { status: 400 }
      );
    }

    // ✅ Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Store OTP in MongoDB (overwrite existing OTP for same email)
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // ✅ Setup Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Verify SMTP connection (optional)
    await new Promise((resolve, reject) => {
      transporter.verify((err, success) => {
        if (err) {
          console.error("SMTP Verify Failed:", err);
          reject(err);
        } else {
          console.log("✅ SMTP Server Ready:", success);
          resolve(success);
        }
      });
    });

    // ✅ Email HTML Template
    const otpHTML = `
      <div style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif; background-color:#f8fafc; padding:30px;">
        <div style="max-width:600px; margin:auto; background:white; border-radius:14px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.07);">
          <div style="background:linear-gradient(135deg,#2563eb,#9333ea); padding:25px; color:white; text-align:center;">
            <h2 style="margin:0; font-size:24px;">🔐 Password Reset OTP</h2>
            <p style="opacity:0.9; font-size:14px;">Your one-time verification code is below</p>
          </div>

          <div style="padding:30px; text-align:center;">
            <p style="font-size:16px; color:#334155; margin-bottom:20px;">Enter this OTP to verify your email:</p>
            <div style="display:inline-block; padding:15px 40px; background:#f1f5f9; border-radius:10px; font-size:30px; font-weight:bold; letter-spacing:6px; color:#1e3a8a; border:2px dashed #2563eb;">
              ${otp}
            </div>

            <p style="margin-top:25px; font-size:14px; color:#64748b;">
              ⚠️ This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.
            </p>
          </div>

          <div style="background:#f9fafb; padding:18px; text-align:center; font-size:13px; color:#94a3b8;">
            — HireMate | <a href="mailto:${process.env.EMAIL_USER}" style="color:#6366f1; text-decoration:none;">${process.env.EMAIL_USER}</a>
          </div>
        </div>
      </div>
    `;

    // ✅ Send OTP Email
    await transporter.sendMail({
      from: `"HireMate" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Your Password Reset OTP Code",
      html: otpHTML,
    });

    // ✅ Return success
    return new Response(
      JSON.stringify({ success: true, message: "OTP sent successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
