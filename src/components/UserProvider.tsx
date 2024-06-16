import React, {createContext, useState, useEffect, ReactNode} from "react";
import {getUserDataFromTelegram, getUserDataFromBackend} from "../utils/utils";
import {User} from "../types";

interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    chats: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const tgUser = getUserDataFromTelegram();
      console.log("Telegram user data:", tgUser);
      if (tgUser && tgUser.id !== undefined) {
        const backendData = await getUserDataFromBackend(
          tgUser.id,
          tgUser.name || "",
        );

        console.log("Backend user data:", backendData); // Added console log
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
