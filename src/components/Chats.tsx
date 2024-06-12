import React, { useState } from "react";
import { Button, Placeholder } from "@telegram-apps/telegram-ui";
import ChatTable from "./ChatTable";
import ChatTableUserB from "./ChatTableUserB";
// import AgreeSale from "./Modals/AgreeSale";
import Login from "./Login"; // Import the Login component
import { useUserContext } from "./UserContext"; // Import the custom hook

const Chats: React.FC = () => {
  const { user } = useUserContext(); // Access the user context
  const [selectedChats, setSelectedChats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //in this tab:
  // if user is not logged in && user.chats is empty (he is not a userB) show the Login component
  // if user is not logged in but user.chats is not empty (he is a userB) show the ChatTableUserB component
  // if user is logged in show the ChatTable component

  //the ChatTableUserB component will be similar to ChatTable
  //but it will have a button to agree to the sale
  //that will open a modal with the sale success and details
  //and prompt the user into selling more
  //and a button to ignore to the sale

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://daniilbot-k9qlu.ondigitalocean.app";

  const handleLoginSuccess = () => {
    // No need to set isLoggedIn state, as it will be determined by user.chats
  };

  const handleChatSelectionChange = (selected: string[]) => {
    setSelectedChats(selected);
  };

  const handleSubmit = (selected: string[]) => {
    console.log("Form submitted with selected values:", selected);
    // Implement further submit logic if needed
  };

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
          <ChatTable onSelectionChange={handleChatSelectionChange} onSubmit={handleSubmit} />
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
      )}
    </div>
  );
};

export default Chats;
