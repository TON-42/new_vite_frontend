import {User} from "../types";
import {UserContext} from "../components/UserContext";
import {useContext} from "react";
// const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://daniilbot-k9qlu.ondigitalocean.app";
const backendUrl = "https://daniilbot-k9qlu.ondigitalocean.app";

export const getUserDataFromTelegram = (): Partial<User> => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
  }
  const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
  if (tgUser && tgUser.id) {
    return {
      id: tgUser.id,
      // We should remove this cause the phone number is not a property of the user
      telephoneNumber: "",
    };
  } else {
    // alert("Failed to fetch user ID, you are on a browser.");
  }
  return {
    id: 0,
    telephoneNumber: "",
  };
};

export const getUserDataFromBackend = async (
  userId: number,
): Promise<Partial<User>> => {
  // const hardcodedUserId = "843373640"; // Hardcoded user ID for testing
  // userId = parseInt(hardcodedUserId); // Convert the hardcoded user ID to a number
  try {
    const response = await fetch(`${backendUrl}/get-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId}),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data from the backend");
    }
    const data = await response.json();
    console.log("user data", data);
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      id: 0,
      chats: [],
      name: "",
      status: "",
      users: [],
      words: [],
      telephoneNumber: "",
    };
  }
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
