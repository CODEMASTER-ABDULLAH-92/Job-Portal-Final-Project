"use client";
import React, { useState } from "react";
import { data, phoneData } from "../assets/assets";
import Link from "next/link";
import { CircleCheckBig, CircleX } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Page = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+61");
  const router = useRouter();

  // Password Validation
  const isLengthValid = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);
  const validPassword =
    isLengthValid && hasUppercase && hasNumber && hasSpecialChar;

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/auth/admin/register",
        { email, password, userName, countryCode, mobile },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Reset form
        setUserName("");
        setCountryCode("+61");
        setEmail("");
        setMobile("");
        setPassword("");
        toast.success("Admin Registered Successfully");
        router.push("/DashBoard/adminDashboard");
        localStorage.setItem("adminUserName", response.data.admin.userName);
        localStorage.setItem("adminId", response.data.admin._id);
        
      }
    } catch (error) {
      console.error("Error in admin register", error);
      toast.error("Error in registration");
    }
  };

  return (
    <div className="flex overflow-clip flex-col sm:flex-row h-screen w-full">
      {/* Left Section - Image */}
      <div className="w-full sm:w-1/2 h-60 sm:h-full bg-green-100 hidden sm:flex items-center justify-center">
        <Image
          src={data.signUp}
          alt="SignUp Illustration"
          className="object-contain h-full w-full p-8"
        />
      </div>

      {/* Right Section - Form */}
      <div className="w-full relative sm:w-1/2 flex h-full items-center justify-center bg-white">
        <form
          onSubmit={onsubmitHandler}
          className="w-full max-w-md px-6 py-8 sm:px-8 sm:py-10"
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
            Register with us!
          </h2>

          {/* UserName Input */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>

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
              autoComplete="new-password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>

          {/* Password Criteria */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-6">
            <div className="flex items-center gap-1 text-gray-700">
              {isLengthValid ? (
                <CircleCheckBig size={18} className="text-green-500" />
              ) : (
                <CircleX size={18} className="text-red-500" />
              )}
              8 Chars Minimum
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              {hasSpecialChar ? (
                <CircleCheckBig size={18} className="text-green-500" />
              ) : (
                <CircleX size={18} className="text-red-500" />
              )}
              1 Special Char
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              {hasNumber ? (
                <CircleCheckBig size={18} className="text-green-500" />
              ) : (
                <CircleX size={18} className="text-red-500" />
              )}
              1 Number
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              {hasUppercase ? (
                <CircleCheckBig size={18} className="text-green-500" />
              ) : (
                <CircleX size={18} className="text-red-500" />
              )}
              1 Uppercase Letter
            </div>
          </div>

          {/* Mobile Input */}
          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mobile Number
            </label>
            <div className="flex items-center gap-2">
              <select
                id="countryCode"
                name="countryCode"
                className="rounded-md border border-gray-300 p-2 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {phoneData.map((item, index) => (
                  <option value={item.dial_code} key={index}>
                    {item.flag} {item.dial_code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="123-456-7890"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                required
              />
            </div>
          </div>

          {/* Login Link */}
          <Link href="/admin-login">
            <p className="text-blue-600 py-2 text-right">
              Already have an account?
            </p>
          </Link>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!validPassword}
            className={`w-full py-2 font-semibold rounded-lg transition duration-300 ${
              validPassword
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
