import React, {useState, useEffect} from "react";
import ChatTable from "./ChatTable";
import ChatTableUserB from "./ChatTableUserB";
import Login from "./Login";
import {useUserContext} from "../utils/utils";
import {List, Chip} from "@telegram-apps/telegram-ui";

const Chats: React.FC = () => {
  const {user} = useUserContext(); // Access the user context
  const [showChatTable, setShowChatTable] = useState<boolean>(false);
  const [showChatTableUserB, setShowChatTableUserB] = useState<boolean>(false);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "https://daniilbot-k9qlu.ondigitalocean.app";

  // Important note: has_profile needs to be updated in the user context when the user creates a profile
  // this logic is slightly flawed

  useEffect(() => {
    if (!user.has_profile && user.chats.length > 0) {
      setShowChatTableUserB(true);
      console.log(
        "User doesn't have a profile but has at least one chat, showing ChatTableUserB",
      );
    } else if (user.has_profile) {
      setShowChatTable(true);
      console.log("User has a profile, showing ChatTable");
    }
  }, [user, setShowChatTableUserB, setShowChatTable]);

  const handleLoginSuccess = () => {
    console.log("Login successful");
    setShowChatTable(true);
  };

  return (
    <div className='p-5 max-w-xl mx-auto text-center'>
      {user.chats && user.chats.length > 0 ? (
        <div className='items-center '>
          <List className='p-5 bg-gray-100 rounded-lg shadow mb-4 '>
            <h2 className='text-lg font-semibold mb-4'>Show the chats...</h2>
            <div className='flex flex-col gap-4'>
              <Chip
                mode={showChatTable ? "elevated" : "mono"}
                after={<span className='chip-icon'>👉</span>}
              >
                ...I can sell
              </Chip>
              <Chip
                mode={showChatTableUserB ? "elevated" : "mono"}
                after={<span className='chip-icon'>📧</span>}
              >
                ...I have been invited to sell
              </Chip>
            </div>
          </List>
          <div className='w-full'>
            {showChatTable && <ChatTable user={user} />}
            {showChatTableUserB && <ChatTableUserB />}
          </div>
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
      )}
    </div>
  );
};

export default Chats;
