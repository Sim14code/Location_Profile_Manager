import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../components/ProfileContext";
import MapComponent from "../components/MapComponent";

const ProfileDetails = () => {
  const { profiles } = useContext(ProfileContext);
  const { id } = useParams();
  const profile = profiles.find((p) => p.id.toString() === id);

  if (!profile) return <p>Profile not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl">{profile.name}</h1>
      <p>{profile.description}</p>
      <MapComponent location={profile.location} />
    </div>
  );
};

export default ProfileDetails;
