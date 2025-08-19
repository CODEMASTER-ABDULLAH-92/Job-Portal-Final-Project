"use client";

import React, { useRef, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { data } from "@/app/assets/assets";
import { AppContext } from "../Context/ContextApi";

const Navbar = () => {
  const [showBurger, setShowBurger] = useState(false);
  const containerRef = useRef();
  const pathname = usePathname();
  const { token, setToken } = useContext(AppContext); // assume you can update token
  const router = useRouter();

  const navLinks = [
    { href: "/jobs", label: "Jobs" },
    { href: "/hire-dev", label: "Hire Dev" },
    { href: "/hireMate-academy-code365", label: "Academy", badge: "New!" },
  ];

  // Animate navbar links on mount
  useGSAP(() => {
    gsap.fromTo(
      ".animate_nav",
      { y: -10, opacity: 0 },
      { y: 3, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out" }
    );
  });

  // ✅ Logout handler
  const handleLogout = () => {
    setToken(null); // clear token from context
    router.push("/"); // redirect home
  };

  return (
    <header className="max-w-[1440px] mx-auto px-6 relative">
      {/* ✅ Desktop Navbar */}
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
              <li key={idx} className="animate_nav group relative cursor-pointer">
                {link.badge && (
                  <span className="absolute -top-6 right-0 animate-bounce bg-[#B9FF66] px-2 py-0.5 rounded-md text-xs">
                    {link.badge}
                  </span>
                )}
                <Link
                  href={link.href}
                  className={`transition-colors ${
                    pathname === link.href ? "font-bold text-black" : "text-gray-700 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
                {/* Hover underline */}
                <div className="absolute left-0 w-0 group-hover:w-full bg-black h-[2px] -bottom-1 transition-all duration-500 origin-left"></div>
              </li>
            ))}
          </ul>
        </nav>

        {/* ✅ Auth Dropdown */}
        {token ? (
          <div className="relative group">
            <button className="px-5 py-3 border border-gray-700 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition">
              Account <ChevronDown size={18} />
            </button>
            <div className="absolute top-14 right-0 w-[160px] bg-white shadow-md rounded-md hidden group-hover:block z-20">
              <ul className="py-2">
                <li>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full text-left px-5 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
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

      {/* ✅ Mobile Navbar */}
      <div className="sm:hidden flex justify-between items-center py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={data.Icon} width={28} height={28} alt="Logo" />
          <p className="text-2xl font-semibold">HireMate.</p>
        </Link>

        {/* Burger Menu */}
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

      {/* ✅ Mobile Menu */}
      <div
        className={`sm:hidden transition-all duration-500 ${
          showBurger ? "translate-x-0" : "-translate-x-full"
        } absolute top-0 left-0 w-full h-screen bg-white z-40`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 text-lg font-medium">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={() => setShowBurger(false)}
              className={`${
                pathname === link.href ? "font-bold text-black" : "text-gray-700 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!token ? (
            <>
              <Link
                href="/login"
                onClick={() => setShowBurger(false)}
                className={`${pathname === "/login" ? "font-bold" : ""}`}
              >
                User Login
              </Link>
              <Link
                href="/admin-login"
                onClick={() => setShowBurger(false)}
                className={`${pathname === "/admin-login" ? "font-bold" : ""}`}
              >
                Admin Login
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setShowBurger(false);
                  router.push("/dashboard");
                }}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setShowBurger(false);
                  handleLogout();
                }}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
