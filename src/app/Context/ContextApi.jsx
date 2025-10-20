"use client";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";


export const AppContext = createContext();
export const AppContextProvider = (props) => {
  const [token, setToken] = useState(false);
  const [adminToken, setAdminToken] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [jobData, setJobData] = useState([]);
  const [savedJob, setSavedJob] = useState([]);
  let adminId;
  // ✅ Check cookies inside useEffect
  useEffect(() => {
    const userToken = Cookies.get("userToken");
    console.log("User Token:", userToken);

    if (userToken) setToken(true);

    const admToken = Cookies.get("adminToken");
    console.log("Admin Token:", admToken);
    if (admToken) setAdminToken(true);

    fetchAllJobs(); // call jobs fetching
    adminId = localStorage.getItem("adminId");
    console.log("use", userProfile);
  }, []);

  useEffect(() => {
    console.log("Context userProfile updated:", userProfile);
  }, [userProfile]);
  const fetchAllJobs = async () => {
    try {
      const response = await axios.get("/api/Job/getAllJobs", {
        withCredentials: true,
      });

      if (response.data.success) {
        setJobData(response.data.jobs);
        toast.success("Fetched all jobs");
        console.log(response.data.jobs);
      }
      for (let i = 0; i < jobData.length; i++) {
        count = count + 1;
      }
    } catch (error) {
      console.error("Error in job fetching:", error);
      toast.error("Error in job fetching");
    }
  };
  let count = 0;
  for (let i = 0; i < jobData.length; i++) {
    count = count + 1;
  }
  console.log(count);



  const handleSaveJob = async () => {
  try {
    // Assume you have stored the logged-in userId somewhere (e.g. context or localStorage)
    const userId = localStorage.getItem("userId"); 
    if (!userId) return alert("You must be logged in to save jobs.");

    const response = await axios.post("/api/Job/savedJob", {
      userId,
    });

    if (response.status === 200) {
      toast.success("Job saved successfully!")
      setSavedJob(response.data.savedJobs); 
    }
  } catch (error) {
    console.error("Error saving job:", error);
    toast.error("Failed to save job. Please try again.")
  }
  };

  useEffect(()=>{
    handleSaveJob()
  },[])
  
  const value = {
    jobData,
    handleSaveJob,
    userProfile,
    token,
    adminToken,
    adminId,
    count,
    setUserProfile,
    savedJob
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
