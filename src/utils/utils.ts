import {useContext} from "react";
import {UserContext} from "../components/UserContext";
import {User, CustomError} from "../types/types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const mockedUser = import.meta.env.VITE_MOCKED_USER;

export const getUserDataFromTelegram = (): Partial<User> => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
  }

  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

  if (tgUser && tgUser.id && !mockedUser) {
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

    if (mockedUser) {
      return {
        id: Number(mockedUser), // Assuming mockedUser is a numeric ID
        name: "Mocked User",
      };
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
      const errorMessage = await response.text();
      const error: CustomError = new Error(
        `Failed to fetch user data from the backend: ${errorMessage}`,
      );
      error.status = response.status;
      throw error;
    }

    if (response.status === 404) {
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

    const data = await response.json();
    console.log("User data from backend:", data);

    return data;
  } catch (error) {
    const customError = error as CustomError;
    customError.status = customError.status || 400;
    console.error("Error fetching user data:", customError);
    throw customError; // Re-throw the error to be caught by UserContext
  }
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
