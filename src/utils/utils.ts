// utils.ts
import {User, Chat} from "../components/UserContext";

const backendUrl = "https://daniilbot-k9qlu.ondigitalocean.app";

export const getUserDataFromTelegram = (): Partial<User> => {
  return {
    id: 5358771958,
    name: "Léonard",
    telephoneNumber: "0048537606403",
    chats: []  // empty array for the mandatory 'chats' field
  };
}
//     hardcoded: otherwise has to push to main

//   if (window.Telegram && window.Telegram.WebApp) {
//     window.Telegram.WebApp.ready();
//   }
//   const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
//   if (tgUser && tgUser.id) {
//     return {
//       id: tgUser.id,
//       name: tgUser.first_name,
//       telephoneNumber: tgUser.phone_number || "",
//     };
//   } else {
//     console.error("Failed to fetch user data from Telegram API");
//   }
//   return {
//     id: 0,
//     name: "",
//     telephoneNumber: "",
//   };
// };

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
