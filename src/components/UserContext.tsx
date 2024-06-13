import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  getUserDataFromTelegram,
  getUserDataFromBackend,
} from "../utils/utils";

// Define the Chat and User interfaces
export interface Chat {
  lead_id: number;
  agreed_users: number[];
  name: string;
  id: string;
  status: string;
  words: number;
  users: User[];
}

export interface User {
  id: number;
  name?: string;
  status?: string;
  users?: number[];
  words?: number[];
  telephoneNumber?: string;
  chats: Chat[];
  // isLoggedIn: boolean;
}

// Define the context props interface
interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

interface UserProviderProps {
  children: ReactNode;
}

// Create the UserContext with default values
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create the UserProvider component
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: 0,
    chats: [],
    // isLoggedIn: false, // Initialize isLoggedIn
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const tgUser = getUserDataFromTelegram();
      console.log("Telegram user data:", tgUser);
      if (tgUser) {
        const backendData = await getUserDataFromBackend(tgUser.id);
        setUser((prevUser) => ({
          ...prevUser,
          ...tgUser,
          ...backendData,
        }));
      } else {
        console.error("Failed to fetch user data from Telegram API");
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
