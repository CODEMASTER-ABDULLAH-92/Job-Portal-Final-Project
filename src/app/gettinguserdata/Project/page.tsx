"use client";
import React, { useContext, useState , useEffect} from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";
import {AppContext} from "../../Context/ContextApi"
const ProjectsForm = () => {
  const {setUserProfile} = useContext(AppContext)
  const [status,setStatus] = useState();
  // Form state
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    technologiesUsed: "",
    liveUrl: "",
    linkdinUrl: "",
    gitHubLink: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [uId, setUId] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setUId(storedId);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", uId || "");
      formDataToSend.append("projectTitle", formData.projectTitle);
      formDataToSend.append("projectDescription", formData.projectDescription);
      formDataToSend.append("technologiesUsed", formData.technologiesUsed);
      formDataToSend.append("liveUrl", formData.liveUrl);
      formDataToSend.append("gitHubLink", formData.gitHubLink);
      formDataToSend.append("linkdinUrl", formData.linkdinUrl);

      const response = await axios.post(
        "/api/userCompleteInfo/addUserDetails",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setFormData({
          projectTitle: "",
          projectDescription: "",
          technologiesUsed: "",
          liveUrl: "",
          linkdinUrl: "",
          gitHubLink: "",
        });
        
        setUserProfile(response.data.status);
        console.log(setUserProfile(response.data.status))
        
        toast.success("Project details saved successfully ✅");
      }
    } catch (error) {
      console.error("Error saving project details", error);
      toast.error("Error saving project details");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            My <span className="text-[#B9FF66]">Projects</span> Information
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Provide your best project details to showcase in your application
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden lg:col-span-2 border border-gray-200">
            <div className="bg-[#B9FF66] px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Project Title */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                  required
                />
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Technologies Used <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="technologiesUsed"
                  value={formData.technologiesUsed}
                  onChange={handleInputChange}
                  placeholder="React, Node.js, MongoDB, etc."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                  required
                />
              </div>

              {/* Links */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium flex items-center gap-2">
                  <FaLink className="text-[#B9FF66]" /> Live Demo URL
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  placeholder="https://your-project.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-medium flex items-center gap-2">
                  <FaGithub className="text-gray-800" /> GitHub Repository
                </label>
                <input
                  type="url"
                  name="gitHubLink"
                  value={formData.gitHubLink}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/project"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-medium flex items-center gap-2">
                  <FaLinkedin className="text-blue-700" /> LinkedIn Post (Optional)
                </label>
                <input
                  type="url"
                  name="linkdinUrl"
                  value={formData.linkdinUrl}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/posts/your-project"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200">
                <Link
                  href="/gettinguserdata/Educational"
                  className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition shadow-sm"
                >
                  <ChevronLeft className="h-5 w-5" /> Previous
                </Link>
                <div className="flex gap-4 justify-center sm:justify-end">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-[#B9FF66] hover:bg-[#A5E55C] text-gray-900 font-medium py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
                  >
                    Save
                  </button>
                  <Link
                    href={`/DashBoard/userProfile/${uId}`}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
                  >
                    Next <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-6">
            {/* Form Progress */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-[#B9FF66] px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Form Progress
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-2">
                  <span className="text-sm font-medium text-gray-500">
                    Personal Details
                  </span>
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex items-center justify-between p-2">
                  <span className="text-sm font-medium text-gray-500">
                    Address Information
                  </span>
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex items-center justify-between p-2">
                  <span className="text-sm font-medium text-gray-500">
                    Education History
                  </span>
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#B9FF66]/10 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Project Details
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#B9FF66] flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default ProjectsForm;
