"use client";

import React, { useRef, useState, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { data } from "../assets/assets";
import { AppContext } from "../Context/ContextApi";

const Navbar = () => {
  const [showBurger, setShowBurger] = useState(false);
  const [userName, setUserName] = useState("");
  const [adminName, setAdminName] = useState("");

  const containerRef = useRef();
  const pathname = usePathname();

  const { token, adminToken } = useContext(AppContext);

  // ✅ Load values from localStorage once on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userName");
      const storedAdmin = localStorage.getItem("adminUserName");

      if (storedUser) setUserName(storedUser);
      if (storedAdmin) setAdminName(storedAdmin);
    }
  }, []);

  const navLinks = [
    { href: "/jobs", label: "Jobs" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // ✅ GSAP animation for desktop links
  useGSAP(() => {
    gsap.fromTo(
      ".animate_nav",
      { y: -10, opacity: 0 },
      { y: 3, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out" }
    );
  });

  // ✅ Function to get initials
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <header className="max-w-[1440px] mx-auto px-6 relative">
      {/* ================= Desktop Navbar ================= */}
      <div className="hidden sm:flex justify-between items-center py-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={data.Icon}
            width={28}
            height={28}
            className="hover:rotate-180 transition-transform duration-700"
            alt="Logo"
          />
          <p className="text-3xl font-semibold">HireMate.</p>
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className="flex gap-6 text-lg font-medium" ref={containerRef}>
            {navLinks.map((link, idx) => (
              <li
                key={idx}
                className="animate_nav group relative cursor-pointer"
              >
                <Link
                  href={link.href}
                  className={`transition-colors ${
                    pathname === link.href
                      ? "font-bold text-black"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
                <div className="absolute left-0 w-0 group-hover:w-full bg-black h-[2px] -bottom-1 transition-all duration-500 origin-left"></div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Section */}
        {token ? (
          <div className="flex items-center gap-4">
            <Link
              href={`/DashBoard/userDashboard`}
              className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-gray-900"
            >
              {getInitials(userName) || "U"}
            </Link>
            <Link
              href={adminToken ? "/DashBoard/addJobDesc" : "/admin-login"}
              className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Upload Job
            </Link>
          </div>
        ) : adminToken ? (
          <div className="flex items-center gap-4">
            <Link
              href={`/DashBoard/adminDashboard`}
              className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center font-bold text-white"
            >
              {getInitials(adminName) || "A"}
            </Link>
            <Link
              href={token ? "/jobs" : "/login"}
              className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Job Apply
            </Link>
          </div>
        ) : (
          <div className="relative group">
            <button className="px-5 py-3 border border-gray-700 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition">
              Login <ChevronDown size={18} />
            </button>
            <div className="absolute top-14 right-0 w-[160px] bg-white shadow-md rounded-md hidden group-hover:block z-20">
              <ul className="py-2">
                <li>
                  <Link
                    href="/login"
                    className="block px-5 py-2 hover:bg-gray-100"
                  >
                    User Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin-login"
                    className="block px-5 py-2 hover:bg-gray-100"
                  >
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ================= Mobile Navbar ================= */}
      <div className="sm:hidden flex justify-between items-center py-5">
        <Link href="/" className="flex items-center gap-2">
          <Image src={data.Icon} width={28} height={28} alt="Logo" />
          <p className="text-2xl font-semibold">HireMate.</p>
        </Link>

        {/* Burger Button */}
        <button
          onClick={() => setShowBurger(!showBurger)}
          className="flex flex-col justify-center items-center space-y-1 cursor-pointer z-50"
        >
          <span
            className={`h-[3px] bg-black w-7 rounded transition-all duration-500 ${
              showBurger ? "rotate-45 translate-y-[6px]" : ""
            }`}
          ></span>
          <span
            className={`h-[3px] bg-black w-7 rounded transition-all duration-500 ${
              showBurger ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`h-[3px] bg-black w-7 rounded transition-all duration-500 ${
              showBurger ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          showBurger ? "opacity-100 visible" : "opacity-0 invisible"
        } z-40`}
        onClick={() => setShowBurger(false)}
      ></div>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-500 ease-in-out z-50 ${
          showBurger ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-start p-8 gap-6 text-lg font-medium">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={() => setShowBurger(false)}
              className={`transition-colors ${
                pathname === link.href
                  ? "font-bold text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t w-full my-4"></div>

          {/* Auth Section - same as desktop */}
          {token ? (
            <>
              <div className="flex items-center gap-3">
                <Link
                  href={"/DashBoard/userDashboard"}
                  className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-gray-900"
                >
                  {getInitials(userName) || "U"}
                </Link>
                <span className="text-lg font-semibold">
                  {userName || "User"}
                </span>
              </div>
              <Link
                href={adminToken ? "/DashBoard/addJobDesc" : "/admin-login"}
                onClick={() => setShowBurger(false)}
                className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition w-full text-center"
              >
                Upload Job
              </Link>
            </>
          ) : adminToken ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center font-bold text-white">
                  {getInitials(adminName) || "A"}
                </div>
                <span className="text-lg font-semibold">
                  {adminName || "Admin"}
                </span>
              </div>
              <Link
                href={token ? "/jobs" : "/login"}
                onClick={() => setShowBurger(false)}
                className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition w-full text-center"
              >
                Job Apply
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setShowBurger(false)}
                className="px-5 py-2 w-full rounded hover:bg-gray-100 transition text-center"
              >
                User Login
              </Link>
              <Link
                href="/admin-login"
                onClick={() => setShowBurger(false)}
                className="px-5 py-2 w-full rounded hover:bg-gray-100 transition text-center"
              >
                Admin Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
