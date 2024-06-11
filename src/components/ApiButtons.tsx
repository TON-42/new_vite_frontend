import React from "react";
import { getUserDataFromBackend, getUserDataFromTelegram } from "../utils/utils";
import { useUserContext } from "./UserContext";

const ApiButtons: React.FC = () => {
  const { user, setUser } = useUserContext();

  const handleTelegramApiCall = () => {
    const tgUser = getUserDataFromTelegram();
    if (tgUser.userId) {
      console.log("Telegram user data:", tgUser);
      // Optionally update the user context with data from Telegram
      setUser((prevUser) => ({
        ...prevUser,
        ...tgUser,
      }));
    } else {
      console.error("Failed to fetch user data from Telegram API");
    }
  };

  const handleServerApiCall = async () => {
    user.id = 843373640; // Ensure userId is a string if it's hardcoded like this

    if (!user.id) {
      console.error("User ID is not available");
      return;
    }

    const backendData = await getUserDataFromBackend(user.id);
    if (backendData) {
      console.log("Server API response:", backendData);

      // Access and log individual values
      if (backendData.chats && backendData.chats.length > 0) {
        backendData.chats.forEach((chat, index) => {
          console.log(`Chat ${index + 1}:`);
          console.log(`  Agreed Users: ${chat.agreed_users.join(", ")}`);
          console.log(`  ID: ${chat.id}`);
          console.log(`  Lead ID: ${chat.lead_id}`);
          console.log(`  Name: ${chat.name}`);
          console.log(`  Status: ${chat.status}`);
          if (chat.users) {
            console.log(`  Users: ${chat.users.join(", ")}`);
          }
          if (chat.words) {
            console.log(`  Words: ${chat.words}`);
          }
        });
      }

      // Optionally update the user context with data from the backend
      setUser((prevUser) => ({
        ...prevUser,
        ...backendData,
      }));
    } else {
      console.error("Failed to fetch data from server");
    }
  };

  return (
    <div>
      <button onClick={handleTelegramApiCall}>Call Telegram API</button>
      <button onClick={handleServerApiCall}>Call Server API</button>
    </div>
  );
};

export default ApiButtons;
