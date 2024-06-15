import React, {useState} from "react";
import ChatTable from "./ChatTable";
import Login from "./Login";
import {useUserContext} from "../utils/utils";

const Chats: React.FC = () => {
  const {user} = useUserContext();
  const [selectedChats, setSelectedChats] = useState<{[key: string]: number}[]>(
    [],
  );

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "https://daniilbot-k9qlu.ondigitalocean.app";

  const handleLoginSuccess = () => {
    console.log("Login successful");
    console.log("ChatTable rendered");
  };

  const handleChatSelectionChange = (selected: {[key: string]: number}[]) => {
    setSelectedChats(selected);
  };
  console.log("Chats rendered with selected chats:", selectedChats);
  return (
    <div className='p-5 max-w-xl mx-auto text-center'>
      {user.chats && user.chats.length > 0 ? (
        <div>
          <h2>Your data, your consent, your money</h2>
          <ChatTable
            onSelectionChange={handleChatSelectionChange}
            selectedChats={selectedChats}
          />
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
      )}
    </div>
  );
};

export default Chats;
