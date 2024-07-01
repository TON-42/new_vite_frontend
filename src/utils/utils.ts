import {useContext} from "react";
import {UserContext} from "../components/UserContext";
import {User} from "../types/types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getUserDataFromTelegram = (): Partial<User> => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
  }
  const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
  if (tgUser && tgUser.id) {
    return {
      id: tgUser.id,
      name: tgUser.first_name,
    };
  } else {
    if (!window.Telegram) {
      console.log("App is not running in Telegram");
    } else if (!window.Telegram.WebApp) {
      console.log("Telegram WebApp is not available");
    }
  }
  return {
    id: 0,
    name: "",
  };
};

export const getUserDataFromBackend = async (
  userId: number,
  username: string,
): Promise<Partial<User>> => {
  try {
    const response = await fetch(`${backendUrl}/get-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId, username}),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data from the backend");
    }
    const data = await response.json();
    console.log("User data from backend:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      id: 0,
      chats: [],
      name: "",
      status: "",
      words: 0,
      has_profile: false,
      telephoneNumber: "",
      auth_status: "",
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
