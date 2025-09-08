"use client";
import React, { useContext, useEffect, useState } from "react";
import { Briefcase, Search, Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { AppContext } from "../../Context/ContextApi";
import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const { jobData } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const { id } = useParams();

  // Popup state
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("adminId");
    setAdminId(id);
  }, []);

  useEffect(() => {
    if (adminId && jobData.length > 0) {
      const adminJobs = jobData.filter((item) => item.admin === adminId);
      setJobs(adminJobs);
      setIsLoading(false);
    } else if (jobData.length === 0) {
      setIsLoading(false);
    }
  }, [adminId, jobData]);

  // Apply search + status filters
  useEffect(() => {
    if (jobs.length > 0) {
      const filtered = jobs.filter((job) => {
        const matchesSearch =
          job.jobName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || job.jobStatus === statusFilter;

        return matchesSearch && matchesStatus;
      });
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs([]);
    }
  }, [jobs, searchTerm, statusFilter]);

  // Delete function
  const handleDelete = async () => {
    if (!deleteJobId) return;
    try {
      setLoading(true);
      const response = await axios.delete(`/api/Job/removeJob/${deleteJobId}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success("Job Deleted Successfully");
        setJobs((prev) => prev.filter((job) => job._id !== deleteJobId)); // remove from state
        setShowConfirm(false);
        setDeleteJobId(null);
      }
    } catch (error) {
      toast.error("Error deleting job");
      console.error("Error deleting job", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B9FF66] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

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
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              All Job Postings
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and review all your job listings
            </p>
          </div>
          <Link
            href="/DashBoard/addJobDesc"
            className="flex items-center gap-2 bg-[#B9FF66] hover:bg-[#A5E55C] text-gray-800 px-4 py-3 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition mt-4 md:mt-0"
          >
            <Plus size={16} />
            Create New Job
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search jobs by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition text-sm w-full"
              />
            </div>
            <div className="w-full md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-[#B9FF66] px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <Briefcase size={24} />
              {filteredJobs.length} Job Postings
            </h2>
          </div>

          <div className="p-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {jobs.length === 0
                  ? "No jobs found for your account."
                  : "No jobs found matching your criteria."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Job Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Experience
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredJobs.map((job) => (
                      <tr key={job._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {job.jobName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {job.jobType}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {job.jobType}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {job.location}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              job.jobStatus === "Remote"
                                ? "bg-green-100 text-green-800"
                                : job.jobStatus === "On-site"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {job.jobStatus || "Unknown"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {job.experienceLevel || "Not specified"}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium flex justify-end gap-3">
                          <Link
                            href={`/DashBoard/Update-Job/${job._id}`}
                            className="text-[#B9FF66] hover:text-[#A5E55C] p-1"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => {
                              setDeleteJobId(job._id);
                              setShowConfirm(true);
                            }}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 size={16} />
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
      </main>

      {/* Delete Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Are you sure?
            </h2>
            <p className="text-gray-600 mb-6">
              Do you really want to delete this job? <br />
              <span className="text-red-500 font-medium">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
