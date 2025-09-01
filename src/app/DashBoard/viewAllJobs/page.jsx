"use client";
import React, { useState } from "react";
import {
  Briefcase,
  Search,
  ChevronDown,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  // Mock job data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      status: "active",
      applications: 24,
      postedDate: "2023-10-15",
      salary: "$90,000 - $120,000",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "Data Systems LLC",
      location: "Remote",
      type: "Full-time",
      status: "active",
      applications: 18,
      postedDate: "2023-10-10",
      salary: "$100,000 - $140,000",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Solutions",
      location: "New York, NY",
      type: "Contract",
      status: "active",
      applications: 32,
      postedDate: "2023-10-05",
      salary: "$70 - $90/hr",
    },
    {
      id: 4,
      title: "DevOps Specialist",
      company: "Cloud Infrastructure Co.",
      location: "Austin, TX",
      type: "Full-time",
      status: "ended",
      applications: 15,
      postedDate: "2023-09-20",
      salary: "$110,000 - $150,000",
    },
    {
      id: 5,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "Remote",
      type: "Full-time",
      status: "active",
      applications: 28,
      postedDate: "2023-10-18",
      salary: "$120,000 - $160,000",
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Boston, MA",
      type: "Part-time",
      status: "draft",
      applications: 0,
      postedDate: "2023-10-22",
      salary: "$80 - $110/hr",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter jobs based on search term and status filter
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle job deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  // Get status badge with appropriate styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Active
          </span>
        );
      case "draft":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            Draft
          </span>
        );
      case "ended":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Ended
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
              HireMate. <span className="text-[10px] absolute left-28 top-3">Admin <span className="text-[#B9FF66]">portal</span></span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-[#B9FF66] flex items-center justify-center text-gray-800 font-medium">
                  A
                </div>
                <div className="ml-2 text-sm font-medium text-gray-700">Admin</div>
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
            <h1 className="text-2xl font-bold text-gray-800">All Job Postings</h1>
            <p className="text-gray-600 mt-1">Manage and review all your job listings</p>
          </div>
          
          <Link
            href="/dashboard/addJobDesc"
            className="flex items-center gap-2 bg-[#B9FF66] hover:bg-[#A5E55C] text-gray-800 px-4 py-3 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition mt-4 md:mt-0"
          >
            <Plus size={16} />
            Create New Job
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="ended">Ended</option>
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
              <div className="text-center py-8">
                <p className="text-gray-500">No jobs found matching your criteria.</p>
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
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applications
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500">{job.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{job.company}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {job.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(job.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="font-medium">{job.applications}</span> applications
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={"/DashBoard/Update-Job/rruuiw"} className="text-[#B9FF66] hover:text-[#A5E55C] p-1 mr-2">
                            <Edit size={16} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(job.id)}
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
    </div>
  );
};

export default Page;