import { useState, useContext, useEffect } from "react";
import { ProfileContext } from "../components/ProfileContext";

const AddProfileForm = () => {
  const { addProfile } = useContext(ProfileContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Check system preference for dark mode on component mount
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDarkMode);

    // Set a timeout to trigger the form entrance animation
    setTimeout(() => setIsFormVisible(true), 100);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !photo || !location) {
      alert("Please fill in all fields and allow location access.");
      return;
    }

    // Add the new profile with location
    addProfile({ name, description, photo, ...location });

    // Clear the form
    setName("");
    setDescription("");
    setPhoto("");
    setLocation(null);

    // Animation effect for successful submission
    const form = document.querySelector(".form-container");
    form.classList.add("success-animation");
    setTimeout(() => {
      form.classList.remove("success-animation");
    }, 1000);
  };

  return (
    <div
      className={`form-container ${darkMode ? "dark-mode" : ""} ${
        isFormVisible ? "visible" : ""
      }`}
    >
      <div className="theme-toggle">
        <button onClick={toggleDarkMode} className="theme-button">
          {darkMode ? "☀️ " : "🌙 "}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo URL</label>
          <input
            type="text"
            id="photo"
            placeholder="Image URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>

        <div className="form-group location-group">
          <button
            type="button"
            className="location-button"
            onClick={handleGetLocation}
          >
            Get My Location
          </button>

          {location && (
            <div className="location-info fade-in">
              <p>
                <strong>Location:</strong> {location.latitude.toFixed(4)},{" "}
                {location.longitude.toFixed(4)}
              </p>
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">
          Add Profile
        </button>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(74, 144, 226, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(74, 144, 226, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(74, 144, 226, 0);
          }
        }

        @keyframes success {
          0% {
            background-color: ${darkMode ? "#2a2a2a" : "#f9f9f9"};
          }
          50% {
            background-color: rgba(39, 174, 96, 0.2);
          }
          100% {
            background-color: ${darkMode ? "#2a2a2a" : "#f9f9f9"};
          }
        }

        .form-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 25px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease-out;
          position: relative;
        }

        .form-container.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .form-container.success-animation {
          animation: success 1s ease;
        }

        .form-container.dark-mode {
          background-color: #2a2a2a;
          color: #e0e0e0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .theme-toggle {
          position: absolute;
          top: 15px;
          right: 15px;
        }

        .theme-button {
          background: none;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 5px 10px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .dark-mode .theme-button {
          border-color: #555;
          color: #e0e0e0;
        }

        .theme-button:hover {
          background-color: #f0f0f0;
        }

        .dark-mode .theme-button:hover {
          background-color: #444;
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 25px;
          animation: fadeIn 0.6s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }

        .dark-mode h2 {
          color: #e0e0e0;
        }

        .form-group {
          margin-bottom: 20px;
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .form-group:nth-child(1) {
          animation-delay: 0.3s;
        }
        .form-group:nth-child(2) {
          animation-delay: 0.4s;
        }
        .form-group:nth-child(3) {
          animation-delay: 0.5s;
        }
        .form-group:nth-child(4) {
          animation-delay: 0.6s;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #555;
          transition: color 0.3s ease;
        }

        .dark-mode label {
          color: #b0b0b0;
        }

        input,
        textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          transition: all 0.3s ease;
          background-color: #fff;
          color: #333;
        }

        .dark-mode input,
        .dark-mode textarea {
          background-color: #3a3a3a;
          border-color: #444;
          color: #e0e0e0;
        }

        input:focus,
        textarea:focus {
          border-color: #4a90e2;
          outline: none;
          box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
          transform: translateY(-2px);
        }

        .dark-mode input:focus,
        .dark-mode textarea:focus {
          border-color: #5a9cf2;
          box-shadow: 0 0 0 3px rgba(90, 156, 242, 0.2);
        }

        .location-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .location-button {
          background-color: #f0f0f0;
          color: #333;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .dark-mode .location-button {
          background-color: #444;
          color: #e0e0e0;
          border-color: #555;
        }

        .location-button:hover {
          background-color: #e0e0e0;
          transform: translateY(-2px);
        }

        .dark-mode .location-button:hover {
          background-color: #555;
        }

        .location-button:active {
          transform: translateY(0);
        }

        .location-info {
          background-color: rgba(74, 144, 226, 0.1);
          border-radius: 4px;
          padding: 10px 14px;
          margin-top: 12px;
          width: 100%;
          transition: all 0.3s ease;
        }

        .dark-mode .location-info {
          background-color: rgba(90, 156, 242, 0.15);
        }

        .fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .location-info p {
          margin: 0;
          font-size: 14px;
        }

        .submit-button {
          display: block;
          width: 100%;
          padding: 14px;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 15px;
          animation: fadeIn 0.6s ease-out forwards;
          animation-delay: 0.7s;
          opacity: 0;
        }

        .dark-mode .submit-button {
          background-color: #5a9cf2;
        }

        .submit-button:hover {
          background-color: #3a80d2;
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .dark-mode .submit-button:hover {
          background-color: #4a8ce2;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
        }

        .submit-button:active {
          transform: translateY(-1px);
          animation: pulse 1s;
        }
      `}</style>
    </div>
  );
};

export default AddProfileForm;
