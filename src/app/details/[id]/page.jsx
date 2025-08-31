"use client";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/src/app/Context/ContextApi";
import { useParams } from "next/navigation"; // ✅ Correct import for Next.js
import SimilarJobs from "@/src/app/Components/SimilarJobs";
import JobSectionFooter from "@/src/app/Components/JObSectionFooter"; // ✅ fixed typo in import name
import Link from "next/link"; // ✅ Correct import

const JobDetails = () => {
  const { jobData } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [similar, setSimilar] = useState([]);

  // ✅ Next.js params
  const params = useParams();
  const id = params?.id; // extract job id

  useEffect(() => {
    if (!id || !jobData?.length) return;

    const currentJob = jobData.find((item) => item._id === id);
    setData(currentJob);

    if (currentJob) {
      const similarJobs = jobData.filter(
        (item) =>
          item._id !== currentJob._id &&
          (item.jobName === currentJob.jobName ||
            item.location === currentJob.location ||
            item.jobStatus === currentJob.jobStatus)
      );
      setSimilar(similarJobs);
    }
  }, [id, jobData]);

  if (!data) return <div className="text-center text-lg mt-10">Loading...</div>;

  const shareBtnLogic = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Job link copied to clipboard!");
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap gap-4 sm:gap-6">
        {/* Left Section */}
        <div>
          {/* Job Title */}
          <p className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            {data.jobName}
          </p>

          {/* Breadcrumbs */}
          <div className="flex flex-wrap my-5 justify-start items-center text-sm text-gray-500 font-medium space-x-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link href="/jobs" className="hover:underline">
              Jobs
            </Link>
            <span>/</span>
            <Link href={`/details/${data._id}`} className="text-indigo-500">
              {data.jobName}
            </Link>
          </div>
        </div>

        {/* Right Section (Buttons) */}
        <div className="hidden sm:flex flex-col items-end gap-3 sm:gap-4">
          <div className="flex gap-4 sm:gap-6">
            <button className="px-7 py-2.5 rounded-md bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 shadow-sm">
              Save
            </button>
            <button
              className="px-7 py-2.5 rounded-md bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 shadow-sm"
              onClick={shareBtnLogic}
            >
              Share
            </button>
          </div>
          <button className="px-10 py-3 rounded-md bg-green-600 hover:bg-green-700 text-white text-base md:text-lg transition-colors duration-200 shadow-md">
            Apply For This Position
          </button>
        </div>
      </div>

      <hr className="mt-8 mb-6" />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        {/* Job Info Section */}
        <div className="w-full md:w-[65%] lg:w-[70%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
            {[
              { title: "Job Type", value: data.jobType },
              { title: "Job Setup", value: data.jobStatus },
              { title: "Experience", value: data.experienceLevel },
              { title: "Salary", value: `$${data.salary}` },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-green-100 py-4 px-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h1 className="text-xl pb-2 text-green-800">{item.title}</h1>
                <p className="text-base text-gray-700">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Job Description, Responsibilities, Requirements */}
          <div className="mt-8 space-y-8">
            <div>
              <h1 className="text-2xl mb-3 text-green-700">Job Description:</h1>
              <p className="text-gray-700 leading-relaxed">
                {data.description}
              </p>
            </div>
            <div>
              <h1 className="text-2xl mb-3 text-green-700">
                Job Responsibilities:
              </h1>
              <p className="text-gray-700 leading-relaxed">
                {data.responsibilities}
              </p>
            </div>
            <div>
              <h1 className="text-2xl mb-3 text-green-700">
                Job Requirements:
              </h1>
              <p className="text-gray-700 leading-relaxed">
                {data.requirements}
              </p>
              <button className="px-10 py-3 mt-6 text-base md:text-lg rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors duration-200 shadow-md">
                Apply For This Position
              </button>
            </div>
          </div>
        </div>

        {/* Similar Jobs Sidebar (Desktop) */}
        <div className="w-full md:w-[45%] lg:w-[30%] bg-green-100 py-2 px-2 space-y-3 rounded-lg shadow-sm max-h-[calc(100vh-100px)] overflow-y-auto hidden md:block sticky top-6">
          <h2 className="text-2xl mb-5 text-green-800">Similar Jobs</h2>
          {similar.length > 0 ? (
            similar.map((job, index) => <SimilarJobs key={index} {...job} />)
          ) : (
            <p className="text-gray-600">No similar jobs found.</p>
          )}
        </div>
      </div>

      {/* Mobile Similar Jobs */}
      <div className="block md:hidden mt-10 space-y-5">
        <h2 className="text-xl font-semibold mb-3 text-green-700">
          Similar Jobs
        </h2>
        <div className="overflow-x-auto flex gap-4 py-3">
          {similar.length > 0 ? (
            similar.map((job, index) => (
              <div
                key={index}
                className="min-w-[280px] sm:min-w-[320px] bg-green-100 p-4 rounded-lg shadow-sm"
              >
                <SimilarJobs {...job}  />
              </div>
            ))
          ) : (
            <p className="text-gray-600">No similar jobs found.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12">
        <JobSectionFooter />
      </div>
    </div>
  );
};

export default JobDetails;
