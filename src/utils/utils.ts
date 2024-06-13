import {User, Chat} from "../components/UserContext";

// const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://daniilbot-k9qlu.ondigitalocean.app";
const backendUrl = "https://daniilbot-k9qlu.ondigitalocean.app";

export const getUserDataFromTelegram = (): Partial<User> => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
  }
  const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
  if (tgUser && tgUser.id) {
    return {
      id: tgUser.id,
      telephoneNumber: tgUser.phone_number || "",
    };
  } else {
    alert("Failed to fetch user ID, you are on a browser.");
  }
  return {
    id: 0,
    telephoneNumber: "",
  };
};

export const getUserDataFromBackend = async (
  userId: number,
): Promise<Partial<User>> => {
  const hardcodedUserId = "843373640"; // Hardcoded user ID for testing
  userId = parseInt(hardcodedUserId); // Convert the hardcoded user ID to a number
  try {
    const response = await fetch(`${backendUrl}/get-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId}),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data from the backend");
    }
    const data = await response.json();
    console.log("user data", data);
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
      telephoneNumber: "",
    };
  }
};
