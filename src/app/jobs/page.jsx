"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import JobCard from "@/src/app/Components/JobCard";

import Navbar from "../Components/Navbar";
import JObSectionFooter from "../Components/JObSectionFooter";
import { AppContext } from "../Context/ContextApi";

const JobsSections = () => {

  const {jobData} = useContext(AppContext);


  const [hideJobType, setHideJobType] = useState(true);
  const [hideLocation, setHideLocation] = useState(false);
  const [hideCategory, setHideCategory] = useState(false);
  
  // Filter states
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6; // Number of jobs to show per page

  const jobTypeRef = useRef(null);
  const locationRef = useRef(null);
  const categoryRef = useRef(null);

  // Job Type Animation
  useGSAP(() => {
    if (jobTypeRef.current) {
      gsap.fromTo(
        jobTypeRef.current.querySelector("div:last-child"),
        { height: 0, opacity: 0, marginTop: 0 },
        {
          height: hideJobType ? 200 : 0,
          opacity: hideJobType ? 1 : 0,
          marginTop: hideJobType ? 12 : 0,
          duration: 0.5,
          ease: "linear",
        }
      );
    }
  }, [hideJobType]);

  // Location Animation
  useGSAP(() => {
    if (locationRef.current) {
      gsap.fromTo(
        locationRef.current.querySelector("div:last-child"),
        { height: 0, opacity: 0, marginTop: 0 },
        {
          height: hideLocation ? 200 : 0,
          opacity: hideLocation ? 1 : 0,
          marginTop: hideLocation ? 12 : 0,
          duration: 0.5,
          ease: "power2.inOut",
        }
      );
    }
  }, [hideLocation]);

  // Job Category Animation
  useGSAP(() => {
    if (categoryRef.current) {
      gsap.fromTo(
        categoryRef.current.querySelector("div:last-child"),
        { height: 0, opacity: 0, marginTop: 0 },
        {
          height: hideCategory ? 200 : 0,
          opacity: hideCategory ? 1 : 0,
          marginTop: hideCategory ? 12 : 0,
          duration: 0.5,
          ease: "power2.inOut",
        }
      );
    }
  }, [hideCategory]);

  // Handle filter selection
  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "jobType":
        setSelectedJobTypes(prev => 
          prev.includes(value) 
            ? prev.filter(type => type !== value)
            : [...prev, value]
        );
        break;
      case "location":
        setSelectedLocations(prev => 
          prev.includes(value) 
            ? prev.filter(loc => loc !== value)
            : [...prev, value]
        );
        break;
      case "category":
        setSelectedCategories(prev => 
          prev.includes(value) 
            ? prev.filter(cat => cat !== value)
            : [...prev, value]
        );
        break;
      default:
        break;
    }
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Normalize job type for comparison
  const normalizeJobType = (jobType) => {
    return jobType.toLowerCase().replace(/[-\s]/g, '');
  };

  // Filter jobs based on selected filters
  const filteredJobs = jobData.filter(job => {
    // If no filters are selected, show all jobs
    if (
      selectedJobTypes.length === 0 &&
      selectedLocations.length === 0 &&
      selectedCategories.length === 0
    ) {
      return true;
    }
    
    // Check if job matches any selected job types
    const matchesJobType = selectedJobTypes.length === 0 || 
      selectedJobTypes.some(type => 
        normalizeJobType(job.jobType) === normalizeJobType(type)
      );
    
    // Check if job matches any selected locations
    const matchesLocation = selectedLocations.length === 0 || 
      selectedLocations.some(loc => 
        job.location.toLowerCase().includes(loc.toLowerCase())
      );
    
    // Check if job matches any selected categories
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.some(cat => 
        job.jobName.toLowerCase().includes(cat.toLowerCase())
      );
    
    return matchesJobType && matchesLocation && matchesCategory;
  });

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedJobTypes, selectedLocations, selectedCategories]);

  return (
    <div className="mx-auto max-w-6xl">
      <Navbar />
      <div className="flex justify-between gap-5 mt-5">
        {/* Filters */}
        <div className="md:min-w-[23%] sm:block hidden bg-white py-3 px-3 rounded-lg h-full shadow-md">
          {/* Job Type */}
          <div ref={jobTypeRef}>
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setHideJobType(!hideJobType)}>
              <h1 className="text-xl font-semibold">Job Type</h1>
              {hideJobType ? <ChevronUp size={30} /> : <ChevronDown size={30} />}
            </div>

            <div className="overflow-y-scroll">
              {["Full Time", "Part Time", "Internship", "Freelance", "Contract", "Temporary", "Remote", "On-site", "Hybrid", "Flexible"].map((type) => (
                <div key={type} className="flex items-center gap-2 pt-3">
                  <input 
                    type="checkbox" 
                    className="h-5 w-5" 
                    value={type}
                    checked={selectedJobTypes.includes(type)}
                    onChange={(e) => handleFilterChange("jobType", e.target.value)}
                  />
                  <span className="text-lg hover:font-medium cursor-pointer">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div ref={locationRef} className="py-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setHideLocation(!hideLocation)}>
              <h1 className="text-xl font-semibold">Location</h1>
              {hideLocation ? <ChevronUp size={30} /> : <ChevronDown size={30} />}
            </div>

            <div className="overflow-y-scroll">
              {["Pakistan", "India", "USA", "UK", "Canada", "Australia", "Germany"].map((location) => (
                <div key={location} className="flex items-center gap-2 pt-3">
                  <input 
                    type="checkbox" 
                    className="h-5 w-5" 
                    value={location}
                    checked={selectedLocations.includes(location)}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                  <span className="text-lg hover:font-medium cursor-pointer">{location}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Job Category */}
          <div ref={categoryRef} className="py-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setHideCategory(!hideCategory)}>
              <h1 className="text-xl font-semibold">Category</h1>
              {hideCategory ? <ChevronUp size={30} /> : <ChevronDown size={30} />}
            </div>

            <div className="overflow-y-scroll">
              {["Frontend", "Backend", "Full Stack", "DevOps", "Business", "Data Scientist", "Home Worker"].map((category) => (
                <div key={category} className="flex items-center gap-2 pt-3">
                  <input 
                    type="checkbox" 
                    className="h-5 w-5" 
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                  />
                  <span className="text-lg hover:font-medium cursor-pointer">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {currentJobs.length > 0 ? (
              currentJobs.map((item, index) => (
                <JobCard
                  key={index}
                  id={item._id}
                  jobName={item.jobName}
                  location={item.location}
                  description={item.description}
                  jobStatus={item.jobStatus}
                  jobType={item.jobType}
                  salary={item.salary}
                  experienceLevel={item.experienceLevel}
                  responsibilities={item.responsibilities}
                  requirements={item.requirements}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-xl text-gray-500">No jobs found matching your filters.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredJobs.length > jobsPerPage && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  Previous
                </button>
                
                {pageNumbers.map(number => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`px-3 py-2 rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {number}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <JObSectionFooter />
    </div>
  );
};

export default JobsSections;