"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { data } from "../assets/assets";

const Otp = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "user@example.com"; // ✅ fixed
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) return alert("Please enter complete OTP.");
    if (timeLeft === 0) return alert("OTP expired!");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await res.json();
      alert(data.success ? "✅ OTP verified!" : `❌ ${data.message}`);
       window.location.href = `/new-password?email=${encodeURIComponent(email)}`;
    } catch (err) {
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col sm:flex-row h-screen w-full">
      <div className="w-full sm:w-1/2 h-60 sm:h-full bg-green-100 hidden sm:flex items-center justify-center">
        <Image src={data.password} alt="Password Illustration" className="object-contain h-full w-full p-8" />
      </div>

      <div className="w-full sm:w-1/2 flex items-center justify-center bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-md px-6 py-8 sm:px-8 sm:py-10">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Image src={data.Icon} className="h-[30px] w-[30px] hover:rotate-180 duration-1000" alt="Logo" />
            <span className="text-2xl font-bold text-gray-800">HireMate.</span>
          </Link>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Verify OTP</h2>
          <p className="text-sm text-gray-600 mb-2">
            Enter the 6-digit code sent to <strong>{email}</strong>
          </p>
          <p className="text-red-500 font-medium mb-4">
            OTP expires in: {formatTime(timeLeft)}
          </p>

          <div className="flex justify-between gap-3 mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-14 h-14 text-center border-2 border-gray-400 rounded-md text-xl font-bold focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="text-right text-sm mt-4">
            Didn’t receive the code?{" "}
            <Link href={`/resend-otp?email=${email}`} className="text-blue-600 hover:underline">
              Resend
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Otp;
