"use client";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [token, setToken] = useState(true);
  const [adminToken, setAdminToken] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [jobData, setJobData] = useState([]);

const fetchAllJobs = async () => {
  try {
    const response = await axios.get("/api/Job/getAllJobs", { withCredentials: true });

    if (response.data.success) {
      setJobData(response.data.jobs);
      toast.success("Fetch all jobs");
      console.log(response.data.jobs); // ✅ log correct jobs
    }
  } catch (error) {
    console.error("Err in job fetching", error);
    toast.error("Err in job fetching");
  }
};

useEffect(() => {
  fetchAllJobs();
}, []);



  const value = { jobData, userProfile, token, adminToken };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
