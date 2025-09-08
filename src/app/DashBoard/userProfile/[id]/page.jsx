"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  FaUser,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaSpinner,
  FaSchool,
  FaUniversity,
  FaExclamationTriangle,
  FaGlobe,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { AppContext } from "../../../Context/ContextApi";
const page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {setUserProfile, userProfile} = useContext(AppContext);
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
        toast.success("Getting Data Successfully");
  setUserProfile(response.data.status)
  console.log("Just called setUserProfile with:", response.data.status);
  console.log("Current userProfile (still old):", userProfile);

      }
    } catch (error) {
      toast.error("Error in getting data");
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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md w-full rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <FaExclamationTriangle className="text-xl" />
            <h2 className="font-bold text-lg">Error Loading Profile</h2>
          </div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Profile <span className="text-[#B9FF66]">Overview</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review all your profile details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden lg:col-span-2 border border-gray-200">
            {/* Personal Information Section */}
            <div className="bg-[#B9FF66] px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                <FaUser className="text-gray-800" />
                Personal Information
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoItem
                  label="Full Name"
                  value={`${userData.firstName} ${userData.lastName}`}
                />
                <InfoItem
                  label="Date of Admission"
                  value={
                    userData.dateOfBirth
                      ? new Date(userData.dateOfAdmission)
                          .toISOString()
                          .split("T")[0]
                      : "Not provided"
                  }
                />
                <InfoItem label="Religion" value={userData.religion} />
                <InfoItem label="Domicile" value={userData.domicle} />
              </div>
              <div className="space-y-4">
                <InfoItem
                  label="Contact Number"
                  value={userData.contactNumber}
                />
                <InfoItem
                  label="Passport Number"
                  value={userData.passportNumber || "Not provided"}
                />
                <InfoItem label="Family Income" value={userData.familyIncome} />
              </div>
            </div>

            {/* Current Academic Information */}
            <div className="bg-[#B9FF66] px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                <FaUniversity className="text-gray-800" />
                Current Academic Information
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoItem
                  label="Institute Type"
                  value={userData.instituteType}
                />
                <InfoItem
                  label="University/Institute"
                  value={userData.universityName}
                />
                <InfoItem
                  label="Program/Discipline"
                  value={userData.programDiscipline}
                />
              </div>
              <div className="space-y-4">
                <InfoItem
                  label="Date of Admission"
                  value={
                    userData.dateOfAdmission
                      ? new Date(userData.dateOfAdmission)
                          .toISOString()
                          .split("T")[0]
                      : "Not provided"
                  }
                />
                <InfoItem
                  label="Program Level"
                  value={userData.UniversityprogramLevel}
                />
              </div>
            </div>

            {/* Education History */}
            <div className="bg-[#B9FF66] px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                <FaGraduationCap className="text-gray-800" />
                Education History
              </h2>
            </div>

            {/* Matriculation */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-3 mb-4">
                <FaSchool className="text-[#B9FF66]" />
                Matriculation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <InfoItem
                    label="Institute Name"
                    value={userData.instituteName}
                  />
                  <InfoItem
                    label="Discipline"
                    value={userData.schoolDiscipline}
                  />
                </div>
                <div className="space-y-4">
                  <InfoItem
                    label="Obtained Marks"
                    value={userData.schoolObtaintedMarks}
                  />
                  <InfoItem
                    label="Total Marks"
                    value={userData.schoolTotalMarks}
                  />
                  <InfoItem
                    label="Percentage"
                    value={userData.percentageOfMarks}
                  />
                </div>
              </div>
            </div>

            {/* Higher Secondary */}
            {userData.secondaryInstituteName && (
              <div className="p-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-3 mb-4">
                  <FaSchool className="text-[#B9FF66]" />
                  Higher Secondary/Intermediate
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <InfoItem
                      label="Institute Name"
                      value={userData.secondaryInstituteName}
                    />
                    <InfoItem
                      label="Discipline"
                      value={userData.secondaryDiscipline}
                    />
                  </div>
                  <div className="space-y-4">
                    <InfoItem
                      label="Obtained Marks"
                      value={userData.secondaryObtaintedMarks}
                    />
                    <InfoItem
                      label="Total Marks"
                      value={userData.secondaryTotalMarks}
                    />
                    <InfoItem
                      label="Percentage"
                      value={userData.secondaryPercentageOfMarks}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* University (Previous) */}
            {userData.UniversityinstituteName &&
              userData.UniversityinstituteName !== userData.universityName && (
                <div className="p-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-3 mb-4">
                    <FaUniversity className="text-[#B9FF66]" />
                    Previous University Education
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <InfoItem
                        label="Institute Name"
                        value={userData.UniversityinstituteName}
                      />
                      <InfoItem
                        label="Discipline"
                        value={userData.UniversityschoolDiscipline}
                      />
                    </div>
                    <div className="space-y-4">
                      <InfoItem
                        label="Obtained Marks/CGPA"
                        value={userData.UniversityschoolObtaintedMarks}
                      />
                      <InfoItem
                        label="Total Marks/CGPA"
                        value={userData.UniversityschoolTotalMarks}
                      />
                      <InfoItem
                        label="Percentage"
                        value={userData.UniversitypercentageOfMarks}
                      />
                    </div>
                  </div>
                </div>
              )}

            {/* Address Information */}
            <div className="bg-[#B9FF66] px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                <FaMapMarkerAlt className="text-gray-800" />
                Address Information
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoItem label="Country" value={userData.countryName} />
                <InfoItem label="Province/State" value={userData.province} />
                <InfoItem label="District" value={userData.district} />
              </div>
              <div className="space-y-4">
                <InfoItem label="City" value={userData.city} />
                <InfoItem label="Full Address" value={userData.fullAddress} />
              </div>
            </div>

            {/* Project Information */}
            {userData.projectTitle && (
              <>
                <div className="bg-[#B9FF66] px-6 py-4">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <FaGlobe className="text-gray-800" />
                    Project Information
                  </h2>
                </div>
                <div className="p-6">
                  <InfoItem
                    label="Project Title"
                    value={userData.projectTitle}
                  />
                  <InfoItem
                    label="Description"
                    value={userData.projectDescription}
                  />
                  <InfoItem
                    label="Technologies Used"
                    value={userData.technologiesUsed}
                  />

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.liveUrl && (
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 w-40">
                          Live URL:
                        </span>
                        <a
                          href={userData.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Project
                        </a>
                      </div>
                    )}

                    {userData.gitHubLink && (
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 w-40">
                          GitHub:
                        </span>
                        <a
                          href={userData.gitHubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <FaGithub className="mr-1" /> GitHub Profile
                        </a>
                      </div>
                    )}

                    {userData.linkdinUrl && (
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 w-40">
                          LinkedIn:
                        </span>
                        <a
                          href={userData.linkdinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <FaLinkedin className="mr-1" /> LinkedIn Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200 p-6">
              <Link href={"/DashBoard/userDashboard"} className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition shadow-sm">
                <ChevronLeft className="h-5 w-5" /> Back
              </Link>
              <Link href={`/DashBoard/EditeUserProfile/${id}`} className="flex items-center justify-center gap-2 bg-[#B9FF66] hover:bg-[#A5E55C] text-gray-900 font-medium py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg">
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-6">
            {/* Profile Preview */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-[#B9FF66] px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Profile Preview
                </h2>
              </div>
              <div className="p-6 flex flex-col items-center">
                {userData.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="h-32 w-32 rounded-full object-cover border-4 border-[#B9FF66] mb-4"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <FaUser className="text-4xl text-gray-400" />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-800">
                  {userData.firstName} {userData.lastName}
                </h3>
                <p className="text-gray-600">{userData.universityName}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {userData.programDiscipline}
                </p>
              </div>
            </div>

            {/* Academic Summary */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-[#B9FF66] px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Academic Summary
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700">Matriculation</h4>
                  <p className="text-gray-600">{userData.percentageOfMarks}%</p>
                </div>

                {userData.secondaryPercentageOfMarks && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700">Intermediate</h4>
                    <p className="text-gray-600">
                      {userData.secondaryPercentageOfMarks}%
                    </p>
                  </div>
                )}

                {userData.UniversitypercentageOfMarks && (
                  <div>
                    <h4 className="font-medium text-gray-700">University</h4>
                    <p className="text-gray-600">
                      {userData.UniversitypercentageOfMarks}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Info Item Component
const InfoItem = ({ label, value }) => (
  <div className="flex items-start">
    <span className="font-medium text-gray-700 w-40">{label}:</span>
    <span className="text-gray-800 flex-1">{value || "Not provided"}</span>
  </div>
);

export default page;
