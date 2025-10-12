"use client";
import React, { useState } from "react";
import { data } from "../assets/assets";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("OTP sent successfully. Please check your email.");
        // Redirect to OTP verification page with email param
        setTimeout(() => {
          router.push(`/otp?email=${encodeURIComponent(email)}`);
        }, 1500);
      } else {
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen w-full">
      {/* Left Section - Image */}
      <div className="w-full sm:w-1/2 h-60 sm:h-full bg-green-100 hidden sm:flex items-center justify-center">
        <Image
          src={data.password}
          alt="Password Illustration"
          className="object-contain h-full w-full p-8"
        />
      </div>

      {/* Right Section - Email Reset Form */}
      <div className="w-full sm:w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md px-6 py-8 sm:px-8 sm:py-10"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Image
              src={data.Icon}
              className="h-[30px] w-[30px] hover:rotate-180 duration-1000"
              alt="Logo"
            />
            <span className="text-2xl font-bold text-gray-800">HireMate.</span>
          </Link>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
            Forgot Password?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter your registered email address below. We’ll send you a one-time
            OTP to reset your password.
          </p>

          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-sm mb-3 ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Login Link */}
          <p className="text-right text-sm mb-4">
            Remember your password?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
