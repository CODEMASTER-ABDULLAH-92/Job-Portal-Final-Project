"use client"
import { createContext, useState } from "react";
import { jobData } from "../assets/assets";
export const AppContext = createContext();

export const AppContextProvider = (props) =>{
    const [token, setToken] = useState(true); 
    const [adminToken, setAdminToken] = useState(false); 
    const [userProfile, setUserProfile] = useState(false); 
    const url ="";
    const value = {jobData,url, userProfile, token, adminToken}
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
