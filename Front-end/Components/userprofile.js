import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/api";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      const profile = await fetchUserProfile();
      setUserProfile(profile);
      setLoading(false);
    };

    getUserProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userProfile) {
    return <p>No user profile found.</p>;
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload(); // Or redirect to login page
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-semibold">{userProfile.name}</h2>
      <p className="text-gray-600">Email: {userProfile.email}</p>
      <p className="text-gray-600">Skills: {userProfile.skills.join(", ")}</p>
      <p className="text-gray-600">Location: {userProfile.location}</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
