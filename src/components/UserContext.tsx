import React, {createContext, useState, useEffect, ReactNode} from "react";
import {getUserDataFromTelegram, getUserDataFromBackend} from "../utils/utils";
import {User} from "../types";

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
const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>({
    id: 0,
    chats: [],
    // isLoggedIn: false, // Initialize isLoggedIn
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const tgUser = getUserDataFromTelegram();
      console.log("Telegram user data:", tgUser);
      if (tgUser && tgUser.id !== undefined) {
        // Check if tgUser.id is defined
        const backendData = await getUserDataFromBackend(tgUser.id);
        setUser(prevUser => ({
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
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
