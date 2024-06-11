import React, { useState } from "react";
import { Button, Placeholder } from "@telegram-apps/telegram-ui";
import ChatTable from "./ChatTable";
// import AgreeSale from "./Modals/AgreeSale";
import Login from "./Login"; // Import the Login component
import { useUserContext } from "./UserContext"; // Import the custom hook

const Chats: React.FC = () => {
  const { user } = useUserContext(); // Access the user context
  const [selectedChats, setSelectedChats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "https://daniilbot-k9qlu.ondigitalocean.app";

  const handleLoginSuccess = () => {
    // No need to set isLoggedIn state, as it will be determined by user.chats
  };

  const handleChatSelectionChange = (selected: string[]) => {
    setSelectedChats(selected);
  };

  // const handleMonetize = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`${backendUrl}/send-message`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ selected_chats: selectedChats }),
  //     });

  //     if (!response.ok) {
  //       const errorMessage = await response.text();
  //       console.error("Error message:", errorMessage);
  //       throw new Error(errorMessage);
  //     }

  //     const data = await response.json();
  //     console.log("Chats sent successfully:", data);
  //     // Display a success message or handle successful response
  //   } catch (error) {
  //     console.error("Error sending chats:", error);
  //     // Display an error message or handle the error
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      {user.chats && user.chats.length > 0 ? (
        <div>
          <h2>Your data, your consent, your money</h2>
          <ChatTable onSelectionChange={handleChatSelectionChange} />
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
      )}
    </div>
  );
};

export default Chats;
