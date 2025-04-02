import { Link } from "react-router-dom";

const ProfileCard = ({ profile }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img
        src={profile.photo}
        alt={profile.name}
        className="w-32 h-32 rounded-full mx-auto"
      />
      <h2 className="text-xl text-center mt-2">{profile.name}</h2>
      <p className="text-center">{profile.description}</p>
      <div className="flex justify-center mt-4">
        <Link
          to={`/profile/${profile.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
