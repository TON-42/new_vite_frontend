// components/UserContext.tsx

import React, {createContext, useState, useEffect, ReactNode} from "react";
import {getUserDataFromTelegram, getUserDataFromBackend} from "../utils/utils";
import {User, CustomError, UserContextProps} from "../types/types";
import BackendError from "../components/BackendError";

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    chats: [],
    status: "",
    words: 0,
    has_profile: false,
    telephoneNumber: "",
    auth_status: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [error, setError] = useState<CustomError | null>(null);

  const updateUserBalance = (points: number) => {
    setUser(prevUser => ({
      ...prevUser,
      words: (prevUser.words || 0) + points,
    }));
  };

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
        updateUserBalance,
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
