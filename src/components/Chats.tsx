import React from "react";
import ChatTable from "./ChatTable";
import Login from "./Login";
import {useUserContext} from "../utils/utils";

const Chats: React.FC = () => {
  const {user} = useUserContext();

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "https://daniilbot-k9qlu.ondigitalocean.app";

  // Needed for the other Login component
  const handleLoginSuccess = () => {
    console.log("Login successful");
    console.log("ChatTable rendered");
  };

  return (
    <div className='p-5 max-w-xl mx-auto text-center'>
      {user.chats && user.chats.length > 0 ? (
        <div>
          <h2>Your data, your consent, your money</h2>
          <ChatTable user={user} />
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
      )}
    </div>
  );
};

export default Chats;
