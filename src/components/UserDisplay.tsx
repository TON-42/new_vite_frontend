// UserDisplay.tsx
import React from "react";
import { useUserContext } from "./UserContext";

const UserDisplay: React.FC = () => {
  const { user } = useUserContext();

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <div style={{ textAlign: "left", margin: "20px 0" }}>
      <h2>User Information</h2>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Chats:</strong> {user.chats && user.chats.join(", ")}
      </p>
    </div>
  );
};

export default UserDisplay;
