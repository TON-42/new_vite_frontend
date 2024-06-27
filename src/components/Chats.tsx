import React, {useState, useEffect} from "react";
import ChatTable from "./ChatTable";
import ChatTableUserB from "./ChatTableUserB";
import Login from "./Login";
import {useUserContext} from "../utils/utils";
import {List, Chip} from "@telegram-apps/telegram-ui";

const Chats: React.FC<{backendUrl: string}> = ({backendUrl}) => {
  const {user, isLoggedIn} = useUserContext(); // Access the user context
  const [showChatTable, setShowChatTable] = useState<boolean>(false);
  const [showChatTableUserB, setShowChatTableUserB] = useState<boolean>(true);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  // Update state based on user profile and chats
  useEffect(() => {
    if (user) {
      if (!user.has_profile && user.chats.length > 0) {
        setShowChatTableUserB(true);
        setShowChatTable(false);
        console.log(
          "User doesn't have a profile but has at least one chat, showing ChatTableUserB",
        );
      } else if (user.has_profile) {
        setShowChatTable(true);
        setShowChatTableUserB(false);
        console.log("User has a profile, showing ChatTable");
      } else {
        setShowChatTable(false);
        setShowChatTableUserB(true); // Show ChatTableUserB by default for non-logged-in users
      }
    }
  }, [user]);

  const handleLoginSuccess = () => {
    console.log("Login successful");
    setShowLogin(false);
    setShowChatTable(true);
    setShowChatTableUserB(false);
  };

  const handleMyChatsClick = () => {
    console.log("My chats clicked");
    if (isLoggedIn) {
      console.log("User is logged in");
      setShowChatTable(true);
      setShowChatTableUserB(false);
    } else {
      console.log("User is not logged in");
      setShowLogin(true);
    }
  };

  const handleMyInvitationsClick = () => {
    console.log("My invitations clicked");
    setShowChatTableUserB(true);
    setShowChatTable(false);
    setShowLogin(false);
  };

  return (
    <div className='p-5 max-w-xl mx-auto text-center'>
      <List
        className='p-5 rounded-lg shadow mb-4 '
        style={{background: "var(--tgui--secondary_bg_color)"}}
      >
        <div className='flex gap-4'>
          <Chip
            mode={showChatTable ? "elevated" : "mono"}
            after={<span className='chip-icon'>👉</span>}
            onClick={handleMyChatsClick}
          >
            My chats
          </Chip>
          <Chip
            mode={showChatTableUserB ? "elevated" : "mono"}
            after={<span className='chip-icon'>📧</span>}
            onClick={handleMyInvitationsClick}
          >
            My invitations
          </Chip>
        </div>
      </List>
      <div className='w-full'>
        {showChatTable && <ChatTable user={user} backendUrl={backendUrl} />}
        {showChatTableUserB && <ChatTableUserB backendUrl={backendUrl} />}
      </div>
      {showLogin && (
        <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
      )}
    </div>
  );
};

export default Chats;
