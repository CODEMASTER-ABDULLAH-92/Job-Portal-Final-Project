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
    count
  } = useContext(AppContext);

  const [totalPer, setTotalper] = useState(0);
  const [applications, setApplications] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]); // New state for jobs
  const [loading, setLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true); // Separate loading for jobs

  
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

  // 🔹 Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setJobsLoading(true);
        const token = Cookies.get("userToken");
        if (!token) return;

        const response = await axios.get(`/api/Job/getAllJobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Get first 6 jobs and sort them (you can adjust the sorting logic)
        const firstSixJobs = response.data?.jobs?.slice(0, 6) || [];
        
        // Sort by date (assuming there's a createdAt field) or any other field
        const sortedJobs = firstSixJobs.sort((a: any, b: any) => 
          new Date(b.createdAt || b.updatedAt).getTime() - new Date(a.createdAt || a.updatedAt).getTime()
        );

        setJobs(sortedJobs);
      } catch (err: any) {
        console.error("Failed to fetch jobs:", err);
        toast.error(err.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setJobsLoading(false);
      }
    };

    fetchJobs();
  }, [url]);

  // 🔹 Dashboard stats
  const stats = [
    {
      title: "Total Applications",
      value: count,
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
    const token = Cookies.get("userToken");
    
    if (!token) {
      // If no token, just clear local data and redirect
      Cookies.remove("userToken");
      localStorage.clear();
      toast.success("Logged out successfully");
      router.push("/");
      return;
    }

    const response = await axios.post(`/api/auth/user/logout`, {}, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.success) {
      Cookies.remove("userToken");
      localStorage.clear();
      toast.success("Logged out successfully");
      router.push("/");
    } else {
      throw new Error(response.data.message || "Logout failed");
    }
  } catch (error: any) {
    console.error("Logout error:", error);
    
    // Even if the API call fails, clear local data
    Cookies.remove("userToken");
    localStorage.clear();
    
    // Show appropriate error message
    if (error.response?.status === 401) {
      toast.info("Session expired. You have been logged out.");
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.message) {
      toast.error(error.message);
    } else {
      toast.error("Logout failed, but local data cleared");
    }
    
    router.push("/");
  }
};

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

          {/* Recent Jobs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-[#B9FF66] px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <Briefcase size={24} />
                  Recent Jobs
                </h2>
              </div>
              <div className="p-6">
                {jobsLoading ? (
                  <p className="text-gray-500">Loading jobs...</p>
                ) : jobs.length === 0 ? (
                  <p className="text-gray-500">No jobs found.</p>
                ) : (
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <Link href={`/details/${job._id}`}
                        key={job.id || job._id}
                        className="flex justify-between items-center py-3 border-b border-gray-100"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {job.jobName}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1">
                  
                            {job.location && (
                              <>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm text-gray-600">
                                  {job.location}
                                </span>
                              </>
                            )}
                            {job.type && (
                              <>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm text-gray-600">
                                  {job.jobType}
                                </span>
                              </>
                            )}
                          </div>
                          {job.updatedAt && (
                            <p className="text-xs text-gray-500 mt-1">
                              Posted: {formatDate(job.updatedAt)}
                            </p>
                          )}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            job.jobType === "Full-time"
                              ? "bg-blue-100 text-blue-700"
                              : job.jobType === "Part-time"
                              ? "bg-green-100 text-green-700"
                              : job.jobType === "Contract"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {job.jobType || "Full-time"}
                        </span>
                      </Link>
                    ))}
                  </div>
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