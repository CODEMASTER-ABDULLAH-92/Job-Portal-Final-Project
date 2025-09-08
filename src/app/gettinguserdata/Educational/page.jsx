"use client";
import React, { useState , useEffect} from "react";
import Link from "next/link";
import {
  FaSchool,
  FaUniversity,
  FaGraduationCap,
  FaBook,
  FaPercentage,
  FaChevronLeft,
  FaChevronRight,
  FaSave,
  FaClipboardList,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const Educational = () => {
  const [formData, setFormData] = useState({
    programLevel: "",
    instituteName: "",
    schoolDiscipline: "",
    schoolObtaintedMarks: "",
    schoolTotalMarks: "",
    percentageOfMarks: "",
    secondaryProgramLevel: "",
    secondaryInstituteName: "",
    secondaryDiscipline: "",
    secondaryObtaintedMarks: "",
    secondaryTotalMarks: "",
    secondaryPercentageOfMarks: "",
    UniversityprogramLevel: "",
    UniversityinstituteName: "",
    UniversityschoolDiscipline: "",
    UniversityschoolObtaintedMarks: "",
    UniversityschoolTotalMarks: "",
    UniversitypercentageOfMarks: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [uId, setUId] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setUId(storedId);
  }, []);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
     formDataToSend.append("userId", uId);
     formDataToSend.append("programLevel",formData.programLevel),
     formDataToSend.append("instituteName",formData.instituteName),
     formDataToSend.append("schoolDiscipline",formData.schoolDiscipline),
     formDataToSend.append("schoolObtaintedMarks",formData.schoolObtaintedMarks),
     formDataToSend.append("schoolTotalMarks",formData.schoolTotalMarks),
     formDataToSend.append("percentageOfMarks",formData.percentageOfMarks),
     formDataToSend.append("secondaryProgramLevel",formData.secondaryProgramLevel),
     formDataToSend.append("secondaryInstituteName",formData.secondaryInstituteName),
     formDataToSend.append("secondaryDiscipline",formData.secondaryDiscipline),
     formDataToSend.append("secondaryObtaintedMarks",formData.secondaryObtaintedMarks),
     formDataToSend.append("secondaryTotalMarks",formData.secondaryTotalMarks),
     formDataToSend.append("secondaryPercentageOfMarks",formData.secondaryPercentageOfMarks),
     formDataToSend.append("UniversityprogramLevel",formData.UniversityprogramLevel),
     formDataToSend.append("UniversityinstituteName",formData.UniversityinstituteName),
     formDataToSend.append("UniversityschoolDiscipline",formData.UniversityschoolDiscipline),
     formDataToSend.append("UniversityschoolObtaintedMarks",formData.UniversityschoolObtaintedMarks),
     formDataToSend.append("UniversityschoolTotalMarks",formData.UniversityschoolTotalMarks),
     formDataToSend.append("UniversitypercentageOfMarks",formData.UniversitypercentageOfMarks)

      const response = await axios.post("/api/userCompleteInfo/addUserDetails", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      
      if (response.data.success) {
    setFormData({
    programLevel: "",
    instituteName: "",
    schoolDiscipline: "",
    schoolObtaintedMarks: "",
    schoolTotalMarks: "",
    percentageOfMarks: "",
    secondaryProgramLevel: "",
    secondaryInstituteName: "",
    secondaryDiscipline: "",
    secondaryObtaintedMarks: "",
    secondaryTotalMarks: "",
    secondaryPercentageOfMarks: "",
    UniversityprogramLevel: "",
    UniversityinstituteName: "",
    UniversityschoolDiscipline: "",
    UniversityschoolObtaintedMarks: "",
    UniversityschoolTotalMarks: "",
    UniversitypercentageOfMarks: "",
        })
        toast.success("Details Added Successfully!");
      }
    } catch (error) {
      toast.error("Error saving educational details");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            My <span className="text-[#B9FF66]">Educational</span> Background
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please provide your complete academic history
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-8">
          {/* Matric/O-Level Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-[#B9FF66] px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                <FaSchool className="text-gray-900" />
                Secondary Education
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Program Title */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <FaBook className="text-[#B9FF66]" />
                    Program Title <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="programLevel"
                  value={formData.programLevel}
                  onChange={onChangeHandler}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                  required
                >
                  <option value="">Select Degree</option>
                  <option value="Matriculation">Matriculation</option>
                  <option value="O-Level">O-Level</option>
                </select>
              </div>

              {/* Institution Name */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <FaUniversity className="text-[#B9FF66]" />
                    Institution Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={onChangeHandler}
                  placeholder="Enter institution name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                  required
                />
              </div>

              {/* Discipline */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <FaClipboardList className="text-[#B9FF66]" />
                    Discipline <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="schoolDiscipline"
                  value={formData.schoolDiscipline}
                  onChange={onChangeHandler}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                  required
                >
                  <option value="">Select Discipline</option>
                  <option value="Science">Science</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>

              {/* Marks Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Obtained Marks <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="schoolObtaintedMarks"
                    value={formData.schoolObtaintedMarks}
                    onChange={onChangeHandler}
                    placeholder="Obtained marks"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Total Marks <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="schoolTotalMarks"
                    value={formData.schoolTotalMarks}
                    onChange={onChangeHandler}
                    placeholder="Total marks"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Percentage */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <FaPercentage className="text-[#B9FF66]" />
                    Percentage <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="percentageOfMarks"
                  value={formData.percentageOfMarks}
                  onChange={onChangeHandler}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Intermediate/A-Level Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-[#B9FF66] px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                <FaUniversity className="text-gray-900" />
                Higher Secondary Education
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Program Title */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <FaBook className="text-[#B9FF66]" />
                    Program Title <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="secondaryProgramLevel"
                  value={formData.secondaryProgramLevel}
                  onChange={onChangeHandler}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                  required
                >
                  <option value="">Select Degree</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="A-Level">A-Level</option>
                </select>
              </div>

              {/* Institution Name */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <FaUniversity className="text-[#B9FF66]" />
                    Institution Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="secondaryInstituteName"
                  value={formData.secondaryInstituteName}
                  onChange={onChangeHandler}
                  placeholder="Enter institution name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                  required
                />
              </div>

              {/* Discipline */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <FaClipboardList className="text-[#B9FF66]" />
                    Discipline <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="secondaryDiscipline"
                  value={formData.secondaryDiscipline}
                  onChange={onChangeHandler}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                  required
                >
                  <option value="">Select Discipline</option>
                  <option value="Pre-Medical">Pre-Medical</option>
                  <option value="Pre-Engineering">Pre-Engineering</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>

              {/* Marks Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Obtained Marks <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="secondaryObtaintedMarks"
                    value={formData.secondaryObtaintedMarks}
                    onChange={onChangeHandler}
                    placeholder="Obtained marks"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Total Marks <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="secondaryTotalMarks"
                    value={formData.secondaryTotalMarks}
                    onChange={onChangeHandler}
                    placeholder="Total marks"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Percentage */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <FaPercentage className="text-[#B9FF66]" />
                    Percentage <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="secondaryPercentageOfMarks"
                  value={formData.secondaryPercentageOfMarks}
                  onChange={onChangeHandler}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Undergraduate Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-[#B9FF66] px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                <FaGraduationCap className="text-gray-900" />
                Higher Education
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Degree Level */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <FaBook className="text-[#B9FF66]" />
                    Degree Level <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="UniversityprogramLevel"
                  value={formData.UniversityprogramLevel}
                  onChange={onChangeHandler}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                  required
                >
                  <option value="">Select Degree</option>
                  <option value="Bachelor">Bachelor's</option>
                  <option value="Master">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              {/* Current Semester */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <FaClipboardList className="text-[#B9FF66]" />
                    Current Semester <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="UniversityschoolDiscipline"
                  value={formData.UniversityschoolDiscipline}
                  onChange={onChangeHandler}
                  placeholder="Current Semester"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                  required
                />
              </div>

              {/* University Name */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <FaUniversity className="text-[#B9FF66]" />
                    University Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="UniversityinstituteName"
                  value={formData.UniversityinstituteName}
                  onChange={onChangeHandler}
                  placeholder="University Name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                  required
                />
              </div>



              {/* CGPA Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Obtained CGPA <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="UniversityschoolObtaintedMarks"
                    value={formData.UniversityschoolObtaintedMarks}
                    onChange={onChangeHandler}
                    placeholder="Obtained CGPA"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Total CGPA <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="UniversityschoolTotalMarks"
                    value={formData.UniversityschoolTotalMarks}
                    onChange={onChangeHandler}
                    placeholder="Total CGPA"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Percentage */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <FaPercentage className="text-[#B9FF66]" />
                    Percentage <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="UniversitypercentageOfMarks"
                  value={formData.UniversitypercentageOfMarks}
                  onChange={onChangeHandler}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition shadow-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
            <Link
              href="/address"
              className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition shadow-sm"
            >
              <FaChevronLeft /> Previous
            </Link>
            <div className="flex gap-4 justify-center sm:justify-end">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#B9FF66] hover:bg-[#A5E55C] text-gray-900 font-medium py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
              >
                <FaSave /> Save
              </button>
              <Link
                href="/gettinguserdata/Project"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
              >
                Next <FaChevronRight />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Educational;