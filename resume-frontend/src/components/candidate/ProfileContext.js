// components/candidate/ProfileContext.js 
import React, { createContext, useState, useEffect } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfileState] = useState(null); // set to null initially

  // Load from localStorage on first load (safe parsing)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("candidateProfile");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          setProfileState(parsed);
        } else {
          console.warn("Invalid profile data in localStorage.");
          setProfileState(null);
        }
      }
    } catch (err) {
      console.error("Error parsing profile from localStorage:", err);
      setProfileState(null);
    }
  }, []);

  // Update both localStorage and state
  const setProfile = (data) => {
    if (data && typeof data === "object") {
      setProfileState(data);
      localStorage.setItem("candidateProfile", JSON.stringify(data));
    } else {
      console.warn("Attempted to store invalid profile data.");
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
