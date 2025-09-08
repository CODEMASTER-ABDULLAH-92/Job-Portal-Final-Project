"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {
  FaUser,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaSpinner,
  FaSchool,
  FaUniversity,
  FaExclamationTriangle,
  FaGlobe,
  FaSave,
} from "react-icons/fa";
const EditProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Sample data structure based on your schema
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    religion: "",
    contactNumber: "",

    // Academic Details
    instituteType: "",
    dateOfAdmission: "",
    programDiscipline: "",
    universityName: "",
    dateOfBirth: "",
    domicle: "",
    familyIncome: "",
    passportNumber: "",
    profileImage: "",

    // Address
    countryName: "",
    province: "",
    district: "",
    city: "",
    fullAddress: "",

    // Matric
    programLevel: "",
    instituteName: "",
    schoolDiscipline: "",
    schoolObtaintedMarks: "",
    schoolTotalMarks: "",
    percentageOfMarks: "",

    // Higher Secondary
    secondaryProgramLevel: "",
    secondaryInstituteName: "",
    secondaryDiscipline: "",
    secondaryObtaintedMarks: "",
    secondaryTotalMarks: "",
    secondaryPercentageOfMarks: "",

    // University
    UniversityprogramLevel: "",
    UniversityinstituteName: "",
    UniversityschoolDiscipline: "",
    UniversityschoolObtaintedMarks: "",
    UniversityschoolTotalMarks: "",
    UniversitypercentageOfMarks: "",

    // Project
    projectTitle: "",
    projectDescription: "",
    technologiesUsed: "",
    liveUrl: "",
    linkdinUrl: "",
    gitHubLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await axios.put(
        `/api/userCompleteInfo/updateUserDetailsInfo/${id}`,
        userData,
        { withCredentials: true }
      );
      if (response.data.success) {
        setUserData({
          firstName: "",
          lastName: "",
          religion: "",
          contactNumber: "",
          instituteType: "",
          dateOfAdmission: "",
          programDiscipline: "",
          universityName: "",
          dateOfBirth: "",
          domicle: "",
          familyIncome: "",
          passportNumber: "",
          profileImage: "",
          countryName: "",
          province: "",
          district: "",
          city: "",
          fullAddress: "",
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

          // University
          UniversityprogramLevel: "",
          UniversityinstituteName: "",
          UniversityschoolDiscipline: "",
          UniversityschoolObtaintedMarks: "",
          UniversityschoolTotalMarks: "",
          UniversitypercentageOfMarks: "",

          // Project
          projectTitle: "",
          projectDescription: "",
          technologiesUsed: "",
          liveUrl: "",
          linkdinUrl: "",
          gitHubLink: "",
        });
        toast.success("Success");
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const { id } = useParams();
  const gettingUserData = async (e) => {
    try {
      const response = await axios.get(
        `/api/userCompleteInfo/getSingleUserDetailsInfo/${id}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setUserData({
          firstName: response.data.singleUserDetails.firstName,
          lastName: response.data.singleUserDetails.lastName,
          religion: response.data.singleUserDetails.religion,
          contactNumber: response.data.singleUserDetails.contactNumber,
          dateOfBirth: response.data.singleUserDetails.dateOfBirth,
          familyIncome: response.data.singleUserDetails.familyIncome,
          passportNumber: response.data.singleUserDetails.passportNumber,
          profileImage: response.data.singleUserDetails.profileImage,
          domicle: response.data.singleUserDetails.domicle,
          instituteType: response.data.singleUserDetails.instituteType,
          dateOfAdmission: response.data.singleUserDetails.dateOfAdmission,
          programDiscipline: response.data.singleUserDetails.programDiscipline,
          universityName: response.data.singleUserDetails.universityName,
          countryName: response.data.singleUserDetails.countryName,
          province: response.data.singleUserDetails.province,
          district: response.data.singleUserDetails.district,
          city: response.data.singleUserDetails.city,
          fullAddress: response.data.singleUserDetails.fullAddress,
          programLevel: response.data.singleUserDetails.programLevel,
          instituteName: response.data.singleUserDetails.instituteName,
          schoolDiscipline: response.data.singleUserDetails.schoolDiscipline,
          schoolObtaintedMarks:
            response.data.singleUserDetails.schoolObtaintedMarks,
          schoolTotalMarks: response.data.singleUserDetails.schoolTotalMarks,
          percentageOfMarks: response.data.singleUserDetails.percentageOfMarks,
          secondaryProgramLevel:
            response.data.singleUserDetails.secondaryProgramLevel,
          secondaryInstituteName:
            response.data.singleUserDetails.secondaryInstituteName,
          secondaryDiscipline:
            response.data.singleUserDetails.secondaryDiscipline,
          secondaryObtaintedMarks:
            response.data.singleUserDetails.secondaryObtaintedMarks,
          secondaryTotalMarks:
            response.data.singleUserDetails.secondaryTotalMarks,
          secondaryPercentageOfMarks:
            response.data.singleUserDetails.secondaryPercentageOfMarks,
          UniversityprogramLevel:
            response.data.singleUserDetails.UniversityprogramLevel,
          UniversityinstituteName:
            response.data.singleUserDetails.UniversityinstituteName,
          UniversityschoolTotalMarks:
            response.data.singleUserDetails.UniversityschoolTotalMarks,
          UniversitypercentageOfMarks:
            response.data.singleUserDetails.UniversitypercentageOfMarks,
          projectTitle: response.data.singleUserDetails.projectTitle,
          projectDescription:
            response.data.singleUserDetails.projectDescription,
          technologiesUsed: response.data.singleUserDetails.technologiesUsed,
          liveUrl: response.data.singleUserDetails.liveUrl,
          linkdinUrl: response.data.singleUserDetails.linkdinUrl,
          gitHubLink: response.data.singleUserDetails.gitHubLink,
          UniversityschoolDiscipline:
            response.data.singleUserDetails.UniversityschoolDiscipline,
          UniversityschoolObtaintedMarks:
            response.data.singleUserDetails.UniversityschoolObtaintedMarks,
        });
        toast.success("Hii");
      }
    } catch (error) {
      toast.error("hddhd");
    }
  };

  useEffect(() => {
    gettingUserData();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
        <FaSpinner className="animate-spin text-4xl text-[#B9FF66] mb-4" />
        <p className="text-lg text-gray-600">Loading your profile data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Edit <span className="text-[#B9FF66]">Profile</span>
          </h1>
          <p className="text-lg text-gray-600">
            Update your profile information
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <div className="flex items-center gap-2">
              <FaExclamationTriangle className="text-xl" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
            <p>Profile updated successfully!</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
        >
          {/* Personal Information Section */}
          <div className="bg-[#B9FF66] px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              <FaUser className="text-gray-800" />
              Personal Information
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="First Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              required
            />
            <FormField
              label="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              required
            />
            <FormField
              label="Religion"
              name="religion"
              value={userData.religion}
              onChange={handleChange}
            />
            <FormField
              label="Contact Number"
              name="contactNumber"
              value={userData.contactNumber}
              onChange={handleChange}
              type="tel"
              required
            />
            <FormField
              label="Date of Birth"
              name="dateOfBirth"
              value={userData.dateOfBirth}
              onChange={handleChange}
              type="date"
            />
            <FormField
              label="Family Income"
              name="familyIncome"
              value={userData.familyIncome}
              onChange={handleChange}
              type="number"
            />
            <FormField
              label="Passport Number"
              name="passportNumber"
              value={userData.passportNumber}
              onChange={handleChange}
            />
            <FormField
              label="Domicile"
              name="domicle"
              value={userData.domicle}
              onChange={handleChange}
            />
          </div>

          {/* Current Academic Information */}
          <div className="bg-[#B9FF66] px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              <FaUniversity className="text-gray-800" />
              Current Academic Information
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Institute Type"
              name="instituteType"
              value={userData.instituteType}
              onChange={handleChange}
            />
            <FormField
              label="University/Institute"
              name="universityName"
              value={userData.universityName}
              onChange={handleChange}
            />
            <FormField
              label="Program/Discipline"
              name="programDiscipline"
              value={userData.programDiscipline}
              onChange={handleChange}
            />
            <FormField
              label="Date of Admission"
              name="dateOfAdmission"
              value={userData.dateOfAdmission}
              onChange={handleChange}
              type="date"
            />
          </div>

          {/* Education History */}
          <div className="bg-[#B9FF66] px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              <FaGraduationCap className="text-gray-800" />
              Education History
            </h2>
          </div>

          {/* Matriculation */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-3 mb-4">
              <FaSchool className="text-[#B9FF66]" />
              Matriculation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Institute Name"
                name="instituteName"
                value={userData.instituteName}
                onChange={handleChange}
              />
              <FormField
                label="Discipline"
                name="schoolDiscipline"
                value={userData.schoolDiscipline}
                onChange={handleChange}
              />
              <FormField
                label="Obtained Marks"
                name="schoolObtaintedMarks"
                value={userData.schoolObtaintedMarks}
                onChange={handleChange}
                type="number"
              />
              <FormField
                label="Total Marks"
                name="schoolTotalMarks"
                value={userData.schoolTotalMarks}
                onChange={handleChange}
                type="number"
              />
              <FormField
                label="Percentage"
                name="percentageOfMarks"
                value={userData.percentageOfMarks}
                onChange={handleChange}
                type="number"
                step="0.01"
              />
            </div>
          </div>

          {/* Higher Secondary */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-3 mb-4">
              <FaSchool className="text-[#B9FF66]" />
              Higher Secondary/Intermediate
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Institute Name"
                name="secondaryInstituteName"
                value={userData.secondaryInstituteName}
                onChange={handleChange}
              />
              <FormField
                label="Discipline"
                name="secondaryDiscipline"
                value={userData.secondaryDiscipline}
                onChange={handleChange}
              />
              <FormField
                label="Obtained Marks"
                name="secondaryObtaintedMarks"
                value={userData.secondaryObtaintedMarks}
                onChange={handleChange}
                type="number"
              />
              <FormField
                label="Total Marks"
                name="secondaryTotalMarks"
                value={userData.secondaryTotalMarks}
                onChange={handleChange}
                type="number"
              />
              <FormField
                label="Percentage"
                name="secondaryPercentageOfMarks"
                value={userData.secondaryPercentageOfMarks}
                onChange={handleChange}
                type="number"
                step="0.01"
              />
            </div>
          </div>

          {/* University (Previous) */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-3 mb-4">
              <FaUniversity className="text-[#B9FF66]" />
              Previous University Education
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Institute Name"
                name="UniversityinstituteName"
                value={userData.UniversityinstituteName}
                onChange={handleChange}
              />
              <FormField
                label="Discipline"
                name="UniversityschoolDiscipline"
                value={userData.UniversityschoolDiscipline}
                onChange={handleChange}
              />
              <FormField
                label="Obtained Marks/CGPA"
                name="UniversityschoolObtaintedMarks"
                value={userData.UniversityschoolObtaintedMarks}
                onChange={handleChange}
                type="number"
                step="0.01"
              />
              <FormField
                label="Total Marks/CGPA"
                name="UniversityschoolTotalMarks"
                value={userData.UniversityschoolTotalMarks}
                onChange={handleChange}
                type="number"
                step="0.01"
              />
              <FormField
                label="Percentage"
                name="UniversitypercentageOfMarks"
                value={userData.UniversitypercentageOfMarks}
                onChange={handleChange}
                type="number"
                step="0.01"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-[#B9FF66] px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              <FaMapMarkerAlt className="text-gray-800" />
              Address Information
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Country"
              name="countryName"
              value={userData.countryName}
              onChange={handleChange}
            />
            <FormField
              label="Province/State"
              name="province"
              value={userData.province}
              onChange={handleChange}
            />
            <FormField
              label="District"
              name="district"
              value={userData.district}
              onChange={handleChange}
            />
            <FormField
              label="City"
              name="city"
              value={userData.city}
              onChange={handleChange}
            />
            <FormField
              label="Full Address"
              name="fullAddress"
              value={userData.fullAddress}
              onChange={handleChange}
              className="md:col-span-2"
              textarea
            />
          </div>

          {/* Project Information */}
          <div className="bg-[#B9FF66] px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              <FaGlobe className="text-gray-800" />
              Project Information
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Project Title"
              name="projectTitle"
              value={userData.projectTitle}
              onChange={handleChange}
            />
            <FormField
              label="Technologies Used"
              name="technologiesUsed"
              value={userData.technologiesUsed}
              onChange={handleChange}
            />
            <FormField
              label="Live URL"
              name="liveUrl"
              value={userData.liveUrl}
              onChange={handleChange}
              type="url"
            />
            <FormField
              label="GitHub Link"
              name="gitHubLink"
              value={userData.gitHubLink}
              onChange={handleChange}
              type="url"
            />
            <FormField
              label="LinkedIn URL"
              name="linkdinUrl"
              value={userData.linkdinUrl}
              onChange={handleChange}
              type="url"
            />
            <FormField
              label="Project Description"
              name="projectDescription"
              value={userData.projectDescription}
              onChange={handleChange}
              className="md:col-span-2"
              textarea
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200 p-6">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 bg-[#B9FF66] hover:bg-[#A5E55C] disabled:bg-gray-400 text-gray-900 font-medium py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
            >
              {saving ? (
                <>
                  <FaSpinner className="animate-spin h-4 w-4" /> Saving...
                </>
              ) : (
                <>
                  <FaSave className="h-4 w-4" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Form Field Component
const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  className = "",
  textarea = false,
  ...props
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] transition"
          required={required}
          {...props}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] transition"
          required={required}
          {...props}
        />
      )}
    </div>
  );
};

export default EditProfilePage;
