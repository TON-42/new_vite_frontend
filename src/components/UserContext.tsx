// UserContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL ||
  "https://daniilbot-k9qlu.ondigitalocean.app";

// Define the Chat and User interfaces
interface Chat {
  name: string;
  id: string;
  status: string;
  value: string;
}

interface User {
  userId: string;
  telephoneNumber: string;
  balance: number;
  chats: Chat[];
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

const getUserDataFromTelegram = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
  }
  const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
  if (tgUser && tgUser.id) {
    return {
      userId: tgUser.id.toString().trim(),
      telephoneNumber: tgUser.phone_number || "",
    };
  }
  return {
    userId: "",
    telephoneNumber: "",
  };
};

const getUserDataFromBackend = async (userId: string) => {
  try {
    const response = await fetch(`${backendUrl}/get-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data from the backend");
    }
    const userData = await response.json();
    return {
      balance: userData.balance,
      chats: userData.chats,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      balance: 0,
      chats: [],
    };
  }
};

// Create the UserProvider component
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    userId: "",
    telephoneNumber: "",
    balance: 0,
    chats: [],
  });

  // Example of fetching user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const tgUser = getUserDataFromTelegram();
      if (tgUser.userId) {
        const backendData = await getUserDataFromBackend(tgUser.userId);
        setUser((prevUser) => ({
          ...prevUser,
          ...tgUser,
          ...backendData,
        }));
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
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
