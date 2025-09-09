"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
import {
  UserCircle,
  FileText,
  Award,
  Home,
  Bell,
  Search,
  Briefcase,
} from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AppContext } from "../../Context/ContextApi";
import Link from "next/link";
import { data } from "../../assets/assets";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const {
    status,
    statusAddress,
    statusEdu,
    url,
    totalApplications,
    statusDocs,
  } = useContext(AppContext);

  const [totalPer, setTotalper] = useState(0);
  const [applications, setApplications] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Check auth & set user
  useEffect(() => {
    const token = Cookies.get("userToken");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      router.push("/");
      return;
    }

    setUserId(localStorage.getItem("userId"));
    setUserName(localStorage.getItem("userName") || "");
    setUserEmail(localStorage.getItem("email") || "");
  }, [router]);

  // 🔹 Profile % calculation
  useEffect(() => {
    let total = 4;
    let completed = 0;
    if (statusAddress === "Completed") completed++;
    if (status === "Completed") completed++;
    if (statusEdu === "Completed") completed++;
    if (statusDocs === "Completed") completed++;
    setTotalper((completed / total) * 100);
  }, [status, statusAddress, statusEdu, statusDocs]);

  // 🔹 Fetch applications & activities
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("userToken");
        if (!token) return;

        const [appsRes, actRes] = await Promise.all([
          axios.get(`${url}/api/applications/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${url}/api/activities/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setApplications(appsRes.data?.applications || []);
        setActivities(actRes.data?.activities || []);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();
  }, [userId, url]);

  // 🔹 Dashboard stats
  const stats = [
    {
      title: "Total Applications",
      value: applications.length || totalApplications,
      icon: <FileText size={20} className="text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Interviews Scheduled",
      value: applications.filter((app) =>
        app.status?.toLowerCase().includes("interview")
      ).length,
      icon: <Award size={20} className="text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Notifications",
      value: activities.length,
      icon: <Bell size={20} className="text-yellow-600" />,
      bg: "bg-yellow-100",
    },
    {
      title: "Profile Completion",
      value: `${totalPer}%`,
      icon: <UserCircle size={20} className="text-purple-600" />,
      bg: "bg-purple-100",
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${url}/api/user/logout`);
      if (response.data.success) {
        Cookies.remove("userToken");
        localStorage.clear();
        toast.success("Logged out successfully");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-8 p-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={data.Icon}
                width={24}
                height={24}
                className="hover:rotate-180 transition-transform duration-700"
                alt="Logo"
              />
              <p className="text-3xl font-semibold">HireMate.</p>
            </Link>
          </div>

          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg bg-[#B9FF66]/10 text-gray-800 font-medium"
            >
              <Home size={18} />
              Dashboard
            </a>

            <Link
              href={
                status === "Pending"
                  ? `/dashboard/user-dashboard/${userId}`
                  : `/DashBoard/userProfile/${userId}`
              }
              onClick={(e) => {
                if (status === "Pending") {
                  e.preventDefault();
                  toast.error("Please complete your profile first!");
                }
              }}
              className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
            >
              <UserCircle size={18} />
              Profile
            </Link>

            <div
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium cursor-pointer"
            >
              <FiLogOut size={18} color="red" />
              Logout
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
              Dashboard
            </h1>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                />
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-[#B9FF66] flex items-center justify-center text-gray-800 font-medium">
                  {userName?.charAt(0).toUpperCase()}
                  {userName?.charAt(1)?.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bg} p-6 rounded-xl shadow-sm flex items-center justify-between border border-gray-200`}
              >
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-white">{stat.icon}</div>
              </div>
            ))}
          </div>

          {/* Recent Applications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-[#B9FF66] px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <Briefcase size={24} />
                  Recent Applications
                </h2>
              </div>
              <div className="p-6">
                {loading ? (
                  <p className="text-gray-500">Loading applications...</p>
                ) : applications.length === 0 ? (
                  <p className="text-gray-500">No applications found.</p>
                ) : (
                  applications.map((app) => (
                    <div
                      key={app.id}
                      className="flex justify-between items-center py-3 border-b border-gray-100"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {app.jobTitle} - {app.company}
                        </p>
                        <p className="text-sm text-gray-500">{app.date}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          app.status?.includes("Interview")
                            ? "bg-green-100 text-green-700"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-[#B9FF66] px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <Bell size={24} />
                  Recent Activity
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {loading ? (
                  <p className="text-gray-500">Loading activities...</p>
                ) : activities.length === 0 ? (
                  <p className="text-gray-500">No recent activity.</p>
                ) : (
                  activities.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-8 w-8 rounded-full bg-[#B9FF66]/20 flex items-center justify-center">
                          {activity.icon || "🔔"}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
