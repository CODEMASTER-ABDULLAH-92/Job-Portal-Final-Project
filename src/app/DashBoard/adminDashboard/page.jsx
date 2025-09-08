"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Briefcase,
  Users,
  FileText,
  CheckCircle,
  Plus,
  Search,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { AppContext } from "../../Context/ContextApi";
import { useRouter } from "next/navigation";

const Page = () => {
  const { url } = useContext(AppContext);
  const [jobData, setJobData] = useState([]);
  const router = useRouter();
  const adminName = localStorage.getItem("adminUserName");
  const {adminId} = useContext(AppContext);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${url}/api/job/remove-job/${id}`
      );
      if (response.data.success) {
        toast.success("Job deleted successfully");
        getJobs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting job");
    }
  };

  const logoutAdmin = async () => {
    try {
      const response = await axios.post(
        `/api/auth/admin/logout`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        Cookies.remove("adminToken");
        localStorage.removeItem("adminUserName");
        localStorage.removeItem("adminId");
        toast.success("Logout Successfully");
        window.location.href = "/";
        router.push("/");
      }
    } catch (error) {
      console.error("Error in Logout ", error);
      toast.error(error.response?.data?.message || "Error during logout");
    }
  };

  const getJobs = async () => {
    if (!adminId) return;

    try {
      const response = await axios.get(
        `${url}/api/job/get-jobs/${adminId.trim()}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setJobData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs", error);
      toast.error(error.response?.data?.message || "Error fetching jobs");
    }
  };

  useEffect(() => {
    if (adminId) {
      getJobs();
    }
  }, [adminId]);

  const stats = [
    {
      title: "Total Job Postings",
      value: jobData.length,
      icon: <Briefcase size={20} className="text-[#B9FF66]" />,
      change: "+3 this month",
      bg: "bg-[#B9FF66]/10",
    },
    {
      title: "Active Candidates",
      value: "1,248",
      icon: <Users size={20} className="text-[#B9FF66]" />,
      change: "12% increase",
      bg: "bg-[#B9FF66]/10",
    },
    {
      title: "Applications Received",
      value: "856",
      icon: <FileText size={20} className="text-[#B9FF66]" />,
      change: "32 new today",
      bg: "bg-[#B9FF66]/10",
    },
    {
      title: "Hire Success Rate",
      value: "68%",
      icon: <CheckCircle size={20} className="text-[#B9FF66]" />,
      change: "2% better",
      bg: "bg-[#B9FF66]/10",
    },
  ];

  const recentApplications = [
    {
      id: 1,
      name: "Sarah Johnson",
      job: "Frontend Developer",
      status: "pending",
      date: "2 hours ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      job: "Backend Engineer",
      status: "approved",
      date: "5 hours ago",
    },
    {
      id: 3,
      name: "Emma Williams",
      job: "UI/UX Designer",
      status: "rejected",
      date: "1 day ago",
    },
    {
      id: 4,
      name: "David Kim",
      job: "Data Analyst",
      status: "pending",
      date: "1 day ago",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
      case "approved":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      case "draft":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            Draft
          </span>
        );
      case "ended":
      case "rejected":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-gray-800"
            >
              HireMate. <p className="text-[10px] absolute left-28 top-3">Admin <span className="text-[#B9FF66]"> portal</span></p>

            </Link>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-[#B9FF66] flex items-center justify-center text-gray-800 font-medium">
                  {adminName?.charAt(0).toUpperCase() || ""}
                  {adminName?.charAt(1).toUpperCase() || ""}
                </div>
                <div className="relative group inline-block">
                  <ChevronDown
                    size={16}
                    className="ml-1 text-gray-500 md:inline cursor-pointer"
                  />
                  <button
                    onClick={() => logoutAdmin()}
                    className="absolute top-7 right-0 hidden group-hover:block bg-gray-200 p-2 rounded-lg shadow hover:bg-gray-300 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bg} p-6 rounded-2xl shadow-sm border border-gray-200`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-800 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className="p-3 rounded-full bg-white">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Link
              href={"/DashBoard/addJobDesc"}
              className="flex items-center gap-2 bg-[#B9FF66] hover:bg-[#A5E55C] text-gray-800 px-4 py-3 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition"
            >
              <Plus size={16} />
              Create New Job
            </Link>
            <Link href={"/DashBoard/viewAllJobs"} className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition">
              <FileText size={16} />
              View All Applications
            </Link>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 mb-8">
          <div className="bg-[#B9FF66] px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <Briefcase size={24} />
              Recent Job Postings
            </h2>
          </div>
          <div className="p-6">
            {jobData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No jobs found.</p>
                <Link
                  href={"/dashboard/add-job"}
                  className="inline-block mt-4 text-[#B9FF66] hover:text-[#A5E55C] font-medium"
                >
                  Post your first job
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applications
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deadline
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobData.map((job) => (
                      <tr key={job._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {job.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(job.status || "draft")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {job.applications || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {job.deadline || "No deadline set"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/dashboard/update-job/${job._id}`}
                            className="text-[#B9FF66] hover:text-[#A5E55C] mr-3"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-[#B9FF66] px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <FileText size={24} />
              Recent Applications
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition text-sm w-64"
                />
              </div>
              <button className="text-sm text-[#B9FF66] hover:text-[#A5E55C] font-medium">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentApplications.map((application) => (
                    <tr key={application.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {application.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {application.job}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(application.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {application.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-[#B9FF66] hover:text-[#A5E55C] mr-3"
                        >
                          Review
                        </a>
                        {application.status === "pending" && (
                          <>
                            <a
                              href="#"
                              className="text-green-600 hover:text-green-800 mr-3"
                            >
                              Approve
                            </a>
                            <a
                              href="#"
                              className="text-red-600 hover:text-red-800"
                            >
                              Reject
                            </a>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Page;
