import React from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) return <p>No user logged in.</p>;

  return (
    <div>
      <h2>My Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
}

export default Profile;
