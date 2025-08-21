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
  const { token, setToken, adminToken, setAdminToken } = useContext(AppContext);
  const router = useRouter();

  const navLinks = [
    { href: "/jobs", label: "Jobs" },

  ];

  useGSAP(() => {
    gsap.fromTo(
      ".animate_nav",
      { y: -10, opacity: 0 },
      { y: 3, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out" }
    );
  });

  const handleLogout = () => {
    setToken(null);
    setAdminToken(null);
    router.push("/");
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

        {/* ✅ Auth Dropdown */}
        {token || adminToken ? (
          <div className="relative group">
            <button className="px-5 py-3 border border-gray-700 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition">
             Dashboard  <ChevronDown size={18} />
            </button>
            <div className="absolute top-14 right-0 w-[180px] bg-white shadow-md rounded-md hidden group-hover:block z-20">
              <ul className="py-2">
                {token && !adminToken && (
                  <>
                    <li>
                      <button
                        onClick={() => router.push("/apply-job")}
                        className="w-full text-left px-5 py-2 hover:bg-gray-100"
                      >
                        Apply for Job
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => router.push("/admin-login")}
                        className="w-full text-left px-5 py-2 hover:bg-gray-100"
                      >
                        Become Admin
                      </button>
                    </li>
                  </>
                )}

                {adminToken && (
                  <>
                    <li>
                      <button
                        onClick={() => router.push("/login")}
                        className="w-full text-left px-5 py-2 hover:bg-gray-100"
                      >
                        Add Job
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => router.push("/apply-job")}
                        className="w-full text-left px-5 py-2 hover:bg-gray-100"
                      >
                        Switch to User
                      </button>
                    </li>
                  </>
                )}

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
                  <Link href="/login" className="block px-5 py-2 hover:bg-gray-100">
                    User Login
                  </Link>
                </li>
                <li>
                  <Link href="/admin-login" className="block px-5 py-2 hover:bg-gray-100">
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
        <Link href="/" className="flex items-center gap-2">
          <Image src={data.Icon} width={28} height={28} alt="Logo" />
          <p className="text-2xl font-semibold">HireMate.</p>
        </Link>

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
                pathname === link.href
                  ? "font-bold text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {!token && !adminToken ? (
            <>
              <Link href="/login" onClick={() => setShowBurger(false)}>
                User Login
              </Link>
              <Link href="/admin-login" onClick={() => setShowBurger(false)}>
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

              {token && !adminToken && (
                <>
                  <button
                    onClick={() => {
                      setShowBurger(false);
                      router.push("/apply-job");
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Apply for Job
                  </button>
                  <button
                    onClick={() => {
                      setShowBurger(false);
                      router.push("/become-admin");
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Become Admin
                  </button>
                </>
              )}

              {adminToken && (
                <>
                  <button
                    onClick={() => {
                      setShowBurger(false);
                      router.push("/add-job");
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Add Job
                  </button>
                  <button
                    onClick={() => {
                      setShowBurger(false);
                      router.push("/apply-job");
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Switch to User
                  </button>
                </>
              )}

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
