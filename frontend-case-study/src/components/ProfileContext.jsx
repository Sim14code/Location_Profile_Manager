import { createContext, useState, useEffect } from "react";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);

  // Load profiles from localStorage when the app starts
  useEffect(() => {
    const savedProfiles = JSON.parse(localStorage.getItem("profiles"));
    if (savedProfiles) {
      setProfiles(savedProfiles);
    }
  }, []);

  // Save profiles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  // Function to add a new profile
  const addProfile = (profileData) => {
    const newProfile = {
      id: profiles.length + 1,
      ...profileData, // includes name, description, photo, latitude, longitude
    };

    setProfiles((prevProfiles) => {
      const updatedProfiles = [...prevProfiles, newProfile];
      localStorage.setItem("profiles", JSON.stringify(updatedProfiles));
      return updatedProfiles;
    });
  };

  return (
    <ProfileContext.Provider value={{ profiles, addProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
