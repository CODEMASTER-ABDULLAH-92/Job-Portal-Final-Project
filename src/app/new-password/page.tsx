"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { data } from "../assets/assets";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirm) return alert("Please fill both fields.");
    if (password !== confirm) return alert("Passwords do not match!");
    if (password.length < 6)
      return alert("Password must be at least 6 characters long.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Password updated successfully!");
        router.push("/login");
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen w-full">
      {/* Left Side Illustration */}
      <div className="w-full sm:w-1/2 h-60 sm:h-full bg-green-100 hidden sm:flex items-center justify-center">
        <Image
          src={data.password}
          alt="Password Illustration"
          className="object-contain h-full w-full p-8"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full sm:w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md px-6 py-8 sm:px-8 sm:py-10"
        >
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Image
              src={data.Icon}
              className="h-[30px] w-[30px] hover:rotate-180 duration-1000"
              alt="Logo"
            />
            <span className="text-2xl font-bold text-gray-800">HireMate.</span>
          </Link>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Reset Password
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Create a new password for: <strong>{email}</strong>
          </p>

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border-2 border-gray-300 p-3 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

          <p className="text-right text-sm mt-4">
            <Link href="/login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
