import {User} from "../types";
import {UserContext} from "../components/UserContext";
import {useContext} from "react";
// const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://daniilbot-k9qlu.ondigitalocean.app";
const backendUrl = "https://daniilbot-k9qlu.ondigitalocean.app";

export const getUserDataFromTelegram = (): Partial<User> => {
  //   return {
  //     id: 5358771958,
  //     name: "Léonard",
  //     telephoneNumber: "0048537606403",
  //     chats: []  // empty array for the mandatory 'chats' field
  //   };
  // }
  //     hardcoded: otherwise has to push to main

  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
  }
  const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
  if (tgUser && tgUser.id) {
    return {
      id: tgUser.id,
      name: tgUser.first_name,
      // We should remove this cause the phone number is not a property of the user
      telephoneNumber: "",
    };
  } else {
    console.error("Failed to fetch user data from Telegram API");
  }
  return {
    id: 0,
    name: "",
    telephoneNumber: "",
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
      users: [],
      words: [],
      has_profile: false,
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
