"use client";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import toast from "react-hot-toast";
import StarterKit from "@tiptap/starter-kit";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUserTie,
  FaTasks,
  FaCheckCircle,
  FaEye,
  FaPaperPlane,
} from "react-icons/fa";
import axios from "axios";
import { useParams } from "next/navigation";

const AddJobPage = () => {
  // ---------------- STATE ----------------
  const [formData, setFormData] = useState({
    jobName: "",
    location: "",
    description: "<p></p>",
    jobStatus: "Remote",
    jobType: "Full-time",
    salary: "",
    experienceLevel: "Mid-Level",
    responsibilities: "",
    requirements: "",
  });

  const { id } = useParams(); // job id from URL
  const [showPreview, setShowPreview] = useState(false); // toggle between form and preview
  const [isMounted, setIsMounted] = useState(false); // avoid SSR hydration errors

  // ---------------- API CALL: UPDATE JOB ----------------
  const updateTheJob = async (e) => {
    e.preventDefault();

    try {
      // sending plain JSON (not FormData)
      const response = await axios.put(
        `/api/Job/updateJob/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Job Updated Successfully");
      }
    } catch (error) {
      console.error("Error in updating job", error);
      toast.error("Job update failed");
    }
  };

  // ---------------- API CALL: GET JOB DATA ----------------
  const getJobData = async () => {
    try {
      const response = await axios.get(`/api/Job/getsingleJob/${id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setFormData({
          jobName: response.data.singlePost.jobName || "",
          location: response.data.singlePost.location || "",
          description: response.data.singlePost.description || "<p></p>",
          jobStatus: response.data.singlePost.jobStatus || "Remote",
          jobType: response.data.singlePost.jobType || "Full-time",
          salary: response.data.singlePost.salary || "",
          experienceLevel: response.data.singlePost.experienceLevel || "Mid-Level",
          responsibilities: response.data.singlePost.responsibilities || "",
          requirements: response.data.singlePost.requirements || "",
        });
        console.log("Job data loaded:", response.data.singlePost);
      }
    } catch (error) {
      console.error("Error fetching job data", error);
    }
  };

  // load job data on mount
  useEffect(() => {
    getJobData();
  }, []);

  // ---------------- TIPTAP EDITOR ----------------
  const editor = useEditor({
    extensions: [StarterKit],
    content: formData.description,
    onUpdate: ({ editor }) => {
      // sync editor content to state
      setFormData((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
    editorProps: {
      attributes: {
        class: "prose focus:outline-none min-h-[200px] p-2",
      },
    },
    immediatelyRender: false, // prevent SSR rendering mismatch
  });

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (editor) {
        editor.destroy(); // cleanup editor on unmount
      }
    };
  }, [editor]);

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // convert multiline text (requirements, responsibilities) to array
  const textToArray = (text) => {
    return text.split("\n").filter((item) => item.trim() !== "");
  };

  // used in preview's submit button
  const handleSubmit = () => {
    updateTheJob(new Event("submit")); // trigger job update
  };

  // ---------------- LOADING STATE ----------------
  if (!isMounted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B9FF66]"></div>
      </div>
    );
  }

  // ---------------- RENDER ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            {showPreview ? "Job Preview" : "Update the Job"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {showPreview
              ? "Review your job posting before submission"
              : "Fill in the details for your job posting"}
          </p>
        </div>

        {/* ---------------- PREVIEW SECTION ---------------- */}
        {showPreview ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-8">
            {/* Job header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {formData.jobName || "Job Title"}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <FaBriefcase /> {formData.jobType}
                </span>
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt /> {formData.location || "Location"}
                </span>
                <span className="flex items-center gap-2">
                  <FaUserTie /> {formData.experienceLevel}
                </span>
                {formData.salary && (
                  <span className="flex items-center gap-2">
                    <FaMoneyBillWave /> ${formData.salary}/month
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Job Description
              </h3>
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: formData.description }}
              />
            </div>

            {/* Responsibilities */}
            {formData.responsibilities && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaTasks /> Responsibilities
                </h3>
                <ul className="space-y-2">
                  {textToArray(formData.responsibilities).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {formData.requirements && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCheckCircle /> Requirements
                </h3>
                <ul className="space-y-2">
                  {textToArray(formData.requirements).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowPreview(false)}
                className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition shadow-sm"
              >
                Back to Edit
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition shadow-md hover:shadow-lg"
              >
                Submit Job <FaPaperPlane />
              </button>
            </div>
          </div>
        ) : (
          /* ---------------- FORM SECTION ---------------- */
          <form
            onSubmit={updateTheJob}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-8"
          >
            {/* Job title + location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Job Title*
                </label>
                <input
                  type="text"
                  name="jobName"
                  value={formData.jobName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Location*
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                />
              </div>
            </div>

            {/* Job type, mode, experience */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Job Type*
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Work Mode*
                </label>
                <select
                  name="jobStatus"
                  value={formData.jobStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Experience Level*
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                >
                  <option value="Entry-Level">Entry-Level</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior-Level">Senior-Level</option>
                </select>
              </div>
            </div>

            {/* Salary */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Salary (USD)
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. 120,000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
              />
            </div>

            {/* Job description */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Job Description*
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                {editor && (
                  <EditorContent
                    editor={editor}
                    className="min-h-[200px] p-2"
                  />
                )}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Responsibilities (one per line)*
              </label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
              />
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Requirements (one per line)*
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="flex items-center justify-center gap-2 bg-[#B9FF66] hover:bg-[#A5E55C] text-gray-900 font-medium py-2 px-4 rounded-lg transition shadow-md hover:shadow-lg"
              >
                <FaEye /> Preview
              </button>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition shadow-md hover:shadow-lg"
              >
                Post Job <FaPaperPlane />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddJobPage;
