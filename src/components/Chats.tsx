import React, {useState} from "react";
// import { Button, Placeholder } from "@telegram-apps/telegram-ui";
import ChatTable from "./ChatTable";
// import ChatTableUserB from "./ChatTableUserB";
// import AgreeSale from "./Modals/AgreeSale";
import Login from "./Login"; // Import the Login component
import {useUserContext} from "./UserContext"; // Import the custom hook

const Chats: React.FC = () => {
  const {user} = useUserContext(); // Access the user context
  const [_, setSelectedChats] = useState<string[]>([]);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "https://daniilbot-k9qlu.ondigitalocean.app";

  const handleLoginSuccess = () => {
    console.log("Login successful");
    ChatTable;
    console.log("ChatTable rendered");
  };

  const handleChatSelectionChange = (
    selected: {id: string; value: number}[],
  ) => {
    setSelectedChats(selected.map(chat => chat.id));
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
          <ChatTable
            onSelectionChange={handleChatSelectionChange}
            onAgreeSale={handleSubmit} // Change this line
          />
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
      )}
    </div>
  );
};

export default Chats;
