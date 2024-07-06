import React, {createContext, useState, useEffect, ReactNode} from "react";
import {getUserDataFromTelegram, getUserDataFromBackend} from "../utils/utils";
import {User, CustomError} from "../types/types";
import BackendError from "../components/BackendError";

export interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

export interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    chats: [],
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tgUser = getUserDataFromTelegram();
        console.log("Telegram user data:", tgUser);
        if (tgUser && tgUser.id !== undefined) {
          const backendData = await getUserDataFromBackend(
            tgUser.id,
            tgUser.name || "",
          );

          console.log("Backend user data:", backendData);
          setUser(prevUser => ({
            ...prevUser,
            ...tgUser,
            ...backendData,
          }));
          setIsLoggedIn(true); // Set isLoggedIn to true if user data is fetched successfully
        } else {
          throw new Error("Failed to fetch user data from Telegram API");
        }
      } catch (error) {
        const customError = error as CustomError;
        customError.status = customError.status || 500;
        setError(customError);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  console.log("User before return in UserContext", user);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        currentTab,
        setCurrentTab,
      }}
    >
      {children}
      {error && (
        <BackendError
          message={error.message}
          errorCode={error.status || 500}
          onClose={() => setError(null)}
          onRedirect={() => setCurrentTab("home")}
        />
      )}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
