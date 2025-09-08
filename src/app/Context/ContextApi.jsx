"use client";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [adminToken, setAdminToken] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // ⬅ start as null
  const [jobData, setJobData] = useState([]);
  const [adminId, setAdminId] = useState(null);

  // ✅ Check cookies inside useEffect
  useEffect(() => {
    const userToken = Cookies.get("userToken");
    console.log("User Token:", userToken);
    if (userToken) setToken(true);

    const admToken = Cookies.get("adminToken");
    console.log("Admin Token:", admToken);
    if (admToken) setAdminToken(true);

    const storedAdminId = localStorage.getItem("adminId");
    setAdminId(storedAdminId);

    fetchAllJobs(); // call jobs fetching
  }, []);

  useEffect(() => {
    console.log("AppContext userProfile updated:", userProfile);
  }, [userProfile]);

  const fetchAllJobs = async () => {
    try {
      const response = await axios.get("/api/Job/getAllJobs", { withCredentials: true });
      if (response.data.success) {
        setJobData(response.data.jobs);
        toast.success("Fetched all jobs");
        console.log(response.data.jobs);
      }
    } catch (error) {
      console.error("Error in job fetching:", error);
      toast.error("Error in job fetching");
    }
  };

  const value = {
    jobData,
    userProfile,
    setUserProfile,
    token,
    adminToken,
    adminId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
