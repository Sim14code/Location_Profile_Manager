import { useContext, useState } from "react";
import { ProfileContext } from "../components/ProfileContext";
import MapComponent from "./MapComponent";

const ProfileList = () => {
  const { profiles } = useContext(ProfileContext);
  const [locations, setLocations] = useState([]);

  // Function to group profiles by approximate location
  const groupProfilesByLocation = () => {
    const groupedLocations = {};

    profiles.forEach((profile) => {
      const roundedLat = profile.latitude.toFixed(1); // Round to 1 decimal for grouping
      const roundedLng = profile.longitude.toFixed(1);
      const locationKey = `${roundedLat}, ${roundedLng}`;

      if (!groupedLocations[locationKey]) {
        groupedLocations[locationKey] = [];
      }
      groupedLocations[locationKey].push(profile.name);
    });

    return groupedLocations;
  };

  const handleShowLocations = () => {
    const extractedLocations = profiles.map((profile) => ({
      lat: profile.latitude,
      lng: profile.longitude,
    }));
    setLocations(extractedLocations);
  };

  const groupedLocations = groupProfilesByLocation();

  return (
    <div>
      <h2>Profiles</h2>
      <button onClick={handleShowLocations}>Show Locations</button>
      <MapComponent locations={locations} />

      {/* Display summary of grouped locations */}
      <div>
        <h3>Location Summary</h3>
        {Object.entries(groupedLocations).map(([location, names]) => (
          <div key={location} className="border p-2 my-2 rounded shadow">
            <strong>Location: {location}</strong>
            <p>People: {names.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileList;
