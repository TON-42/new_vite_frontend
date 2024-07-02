import React, {useState, useEffect} from "react";
import ChatTable from "./ChatTable";
import ChatTableUserB from "./ChatTableUserB";
import Login from "./Login";
import {useUserContext} from "../utils/utils";
import {List, Chip} from "@telegram-apps/telegram-ui";

const Chats: React.FC<{backendUrl: string}> = ({backendUrl}) => {
  const {user, isLoggedIn} = useUserContext();
  const [showChatTable, setShowChatTable] = useState<boolean>(false);
  const [showChatTableUserB, setShowChatTableUserB] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  // Update state based on user profile and chats
  useEffect(() => {
    if (user) {
      if (!user.has_profile) {
        if (user.chats.length > 0) {
          console.log(
            "User doesn't have a profile but has at least one chat, showing ChatTableUserB",
          );
          setShowChatTableUserB(true);
          setShowChatTable(false);
        } else {
          console.log(
            "User doesn't have a profile and has no chats, showing Login",
          );
          setShowChatTable(false);
          setShowChatTableUserB(false);
          setShowLogin(true);
          console.log(
            "User doesn't have a profile and has no chats, showing Login",
          );
        }
      } else if (user.has_profile) {
        if (isLoggedIn) {
          console.log("User has a profile, showing ChatTable");
          setShowChatTable(true);
          setShowChatTableUserB(false);
        } else {
          setShowChatTable(false);
          setShowChatTableUserB(false);
          setShowLogin(true);
        }
        setShowChatTableUserB(false);
      }
    }
  }, [user, isLoggedIn]);
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
    if (user.chats.length === 0) {
      console.log("User has no chats, NOT showing ChatTableUserB");
      setShowChatTableUserB(false);
    } else {
      setShowChatTableUserB(true);
      setShowChatTable(false);
      setShowLogin(false);
    }
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
