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
  ChevronLeft,
  ChevronRight,
  Bookmark,
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
    count,
    savedJob
  } = useContext(AppContext);

  const [totalPer, setTotalper] = useState(0);
  const [applications, setApplications] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [savedJobsLoading, setSavedJobsLoading] = useState(false);

  const JOBS_PER_PAGE = 6;

  // 🔹 Check auth & set user
  useEffect(() => {
    const token = Cookies.get("userToken");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      router.push("/");
      return;
    }

    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    setUserName(localStorage.getItem("userName") || "");
    setUserEmail(localStorage.getItem("email") || "");
    const savedJob = JSON.parse(localStorage.getItem("savedJob")) || [];
    console.log(savedJob);

    // Load saved jobs from localStorage
    if (storedUserId) {
      loadSavedJobs(storedUserId);
    }
  }, [router]);

  // 🔹 Load saved jobs from localStorage
  const loadSavedJobs = (userId: string) => {
    try {
      setSavedJobsLoading(true);
      const savedJobsData = localStorage.getItem(`savedJobs_${userId}`);
      if (savedJobsData) {
        const parsedSavedJobs = JSON.parse(savedJobsData);
        setSavedJobs(Array.isArray(parsedSavedJobs) ? parsedSavedJobs : []);
      } else {
        setSavedJobs([]);
      }
    } catch (error) {
      console.error("Error loading saved jobs:", error);
      setSavedJobs([]);
    } finally {
      setSavedJobsLoading(false);
    }
  };

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

        const firstSixJobs = response.data?.jobs?.slice(0, 6) || [];
        const sortedJobs = firstSixJobs.sort(
          (a: any, b: any) =>
            new Date(b.createdAt || b.updatedAt).getTime() -
            new Date(a.createdAt || a.updatedAt).getTime()
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
      title: "Saved Jobs",
      value: savedJob.length,
      icon: <Bookmark size={20} className="text-yellow-600" />,
      bg: "bg-yellow-100",
    },
    {
      title: "Profile Completion",
      value: `${totalPer}%`,
      icon: <UserCircle size={20} className="text-purple-600" />,
      bg: "bg-purple-100",
    },
  ];

  // 🔹 Pagination logic for saved jobs
  const totalPages = Math.ceil(savedJob.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const currentSavedJobs = savedJob.slice(
    startIndex,
    startIndex + JOBS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLogout = async () => {
    try {
      const token = Cookies.get("userToken");

      if (!token) {
        Cookies.remove("userToken");
        localStorage.clear();
        toast.success("Logged out successfully");
        router.push("/");
        return;
      }

      const response = await axios.post(
        `/api/auth/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

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
      Cookies.remove("userToken");
      localStorage.clear();

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
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Recently";
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Jobs */}
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
                      <Link
                        href={`/details/${job._id}`}
                        key={job.id || job._id}
                        className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors"
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

            {/* Saved Jobs Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-[#B9FF66] px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <Bookmark size={24} />
                  Saved Jobs
                </h2>
              </div>
              <div className="p-6">
                {savedJobsLoading ? (
                  <p className="text-gray-500">Loading saved jobs...</p>
                ) : savedJob.length === 0 ? (
                  <p className="text-gray-500">No saved jobs yet.</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-4">
                      {currentSavedJobs.map((job, index) => (
                        <Link
                          href={`/details/${job._id || job.id}`}
                          key={job._id || job.id || index}
                          className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                {job.jobName || job.title || "Untitled Job"}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                {job.company && (
                                  <span className="text-sm text-gray-600">
                                    {job.company}
                                  </span>
                                )}
                                {job.location && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-sm text-gray-600">
                                      {job.location}
                                    </span>
                                  </>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Saved:{" "}
                                {formatDate(job.savedAt || job.updatedAt)}
                              </p>
                            </div>
                            <Bookmark
                              size={16}
                              className="text-[#B9FF66] flex-shrink-0"
                              fill="#B9FF66"
                            />
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                          className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                            currentPage === 1
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <ChevronLeft size={16} />
                          Previous
                        </button>

                        <span className="text-sm text-gray-600">
                          Page {currentPage} of {totalPages}
                        </span>

                        <button
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                          className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                            currentPage === totalPages
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          Next
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}
                  </>
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
