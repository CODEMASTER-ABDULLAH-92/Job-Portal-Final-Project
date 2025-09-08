"use client";
import React, { useState } from "react";
import { data } from "../assets/assets";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/auth/admin/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        setEmail("");
        setPassword("");
        toast.success("Admin logged in successfully");
        router.push("/DashBoard/adminDashboard");
        localStorage.setItem("adminUserName", response.data.admin.userName);
        localStorage.setItem("adminId", response.data.admin._id);
      }
    } catch (error) {
      console.error("Error logging in admin:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex relative flex-col sm:flex-row h-screen w-full">
      {/* Left Section - Image */}
      <div className="w-full sm:w-1/2 h-60 sm:h-full bg-green-100 hidden sm:flex items-center justify-center">
        <Image
          src={data.login}
          alt="Login Illustration"
          className="object-contain h-full w-full p-8"
        />
      </div>

      {/* Right Section - Form */}
      <div className="w-full sm:w-1/2 relative flex h-full items-center justify-center bg-white">
        <form
          onSubmit={onsubmitHandler}
          className="w-full max-w-md relative px-6 py-8 sm:px-8 sm:py-10"
        >
          {/* Logo + Branding */}
          <Link href="/" className="flex relative items-center gap-2 mb-6">
            <Image
              src={data.Icon}
              className="h-[20px] w-[20px] hover:rotate-180 duration-1000"
              alt="Logo"
            />
              <p className="text-xl">HireMate.</p> <p className="text-[12px] absolute left-28 bottom-4">Admin <span className="text-green-500"> portal</span></p>
          </Link>



          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            Login to Your Account
          </h2>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Links */}
          <div className="flex justify-between text-sm mb-6">
            <Link href="/admin-signup" className="text-blue-600 hover:underline">
              Don’t have an account? Sign Up
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
