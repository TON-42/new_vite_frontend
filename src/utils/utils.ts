import { User, Chat } from "../components/UserContext";

// const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://daniilbot-k9qlu.ondigitalocean.app";
const backendUrl = "https://daniilbot-k9qlu.ondigitalocean.app";

export const getUserDataFromTelegram = (): Partial<User> => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
  }
  const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
  if (tgUser && tgUser.id) {
    alert(`User ID: ${tgUser.id}`); // Display an alert with the user ID
    return {
      id: tgUser.id,
      telephoneNumber: tgUser.phone_number || "",
    };
  }
  else {
    alert("Failed to fetch user ID, you are on a browser.");
  }
  return {
    id: 0,
    telephoneNumber: "",
  };
};

export const getUserDataFromBackend = async (userId: number): Promise<Partial<User>> => {
  // Hardcoded user ID for testing
  const hardcodedUserId = "843373640";
  try {
    const response = await fetch(`${backendUrl}/get-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({ userId }),
      body: JSON.stringify({ userId: hardcodedUserId }), // Use hardcoded user ID
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data from the backend");
    }
    const data = await response.json();
    console.log("user data", data);
    return {
      balance: data.balance,
      chats: data.chats,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      balance: 0,
      chats: [],
    };
  }
};
