"use client";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
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
import toast from "react-hot-toast";

const AddJobPage = () => {
  const [formData, setFormData] = useState({
    jobName: "",
    location: "",
    description: "",
    jobStatus: "Remote",
    jobType: "Full-time",
    salary: "",
    experienceLevel: "Mid-Level",
    responsibilities: "",
    requirements: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("jobName", formData.jobName);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("jobStatus", formData.jobStatus);
      formDataToSend.append("jobType", formData.jobType);
      formDataToSend.append("salary", formData.salary);
      formDataToSend.append("experienceLevel", formData.experienceLevel);
      formDataToSend.append("responsibilities", formData.responsibilities);
      formDataToSend.append("requirements", formData.requirements);

      const response = await axios.post("/api/Job/createJob", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.success) {
        setFormData({
          jobName: "",
          location: "",
          description: "",
          jobStatus: "",
          jobType: "",
          salary: "",
          experienceLevel: "",
          responsibilities: "",
          requirements: "",
        });
        toast.success("Job Added Successfully");
      }
    } catch (error) {
      console.error("Err in Job Adding", error);
      toast.error("Job Adding Err");
    }
  };

  const [showPreview, setShowPreview] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize editor only on client side
  const editor = useEditor({
    extensions: [StarterKit],
    content: formData.description,
    onUpdate: ({ editor }) => {
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
    immediatelyRender: false, // Explicitly disable SSR rendering
  });

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const textToArray = (text) => {
    return text.split("\n").filter((item) => item.trim() !== "");
  };
  if (!isMounted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B9FF66]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            {showPreview ? "Job Preview" : "Add New Job"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {showPreview
              ? "Review your job posting before submission"
              : "Fill in the details for your new job posting"}
          </p>
        </div>

        {showPreview ? (
          /* PREVIEW SECTION */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-8">
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

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Job Description
              </h3>
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: formData.description }}
              />
            </div>

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
          // ==============
          /* FORM SECTION */
          // ==============
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Job Title*
                </label>
                <select
                  name="jobName"
                  value={formData.jobName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                >
                  <option value="">-- Select a Job Title --</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">
                    Full Stack Developer
                  </option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Machine Learning Engineer">
                    Machine Learning Engineer
                  </option>
                  <option value="Mobile App Developer">
                    Mobile App Developer
                  </option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="QA Engineer">QA Engineer</option>
                  <option value="Business Analyst">Business Analyst</option>
                  <option value="Database Administrator">
                    Database Administrator
                  </option>
                  <option value="System Administrator">
                    System Administrator
                  </option>
                  <option value="Cloud Engineer">Cloud Engineer</option>
                  <option value="Cybersecurity Specialist">
                    Cybersecurity Specialist
                  </option>
                  <option value="Network Engineer">Network Engineer</option>
                  <option value="Game Developer">Game Developer</option>
                  <option value="Embedded Systems Engineer">
                    Embedded Systems Engineer
                  </option>
                  <option value="AI Engineer">AI Engineer</option>
                  <option value="Data Engineer">Data Engineer</option>
                  <option value="Research Scientist">Research Scientist</option>
                  <option value="Blockchain Developer">
                    Blockchain Developer
                  </option>
                  <option value="Technical Writer">Technical Writer</option>
                  <option value="IT Support Specialist">
                    IT Support Specialist
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Location*
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                >
                  <option value="">-- Select a Country --</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Italy">Italy</option>
                  <option value="Spain">Spain</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Australia">Australia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="China">China</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Singapore">Singapore</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Mexico">Mexico</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Russia">Russia</option>
                </select>
              </div>
            </div>

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

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Salary (USD)
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. 120,000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
              />
            </div>

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
