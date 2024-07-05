import React, {useState, useEffect} from "react";
import ChatTable from "./ChatTable";
import ChatTableInvitations from "./ChatTableInvitations";
import ChatTableSummary from "./ChatTableSummary";
import Login from "./Login";
import {useUserContext} from "../utils/utils";
import {List, Chip} from "@telegram-apps/telegram-ui";

const Chats: React.FC<{backendUrl: string}> = ({backendUrl}) => {
  const {user, isLoggedIn} = useUserContext();
  const [showChatTable, setShowChatTable] = useState<boolean>(false);
  const [showChatTableInvitations, setShowChatTableInvitations] =
    useState<boolean>(false);
  const [showChatTableSummary, setShowChatTableSummary] =
    useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  // Update state based on user profile and chats
  useEffect(() => {
    if (user) {
      if (!user.has_profile) {
        if (user.chats.length > 0) {
          console.log(
            "User doesn't have a profile but has at least one chat, showing ChatTableInvitations",
          );
          setShowChatTableInvitations(true);
          setShowChatTable(false);
          setShowChatTableSummary(false);
        } else {
          console.log(
            "User doesn't have a profile and has no chats, showing Login",
          );
          setShowChatTable(false);
          setShowChatTableInvitations(false);
          setShowChatTableSummary(false);
          setShowLogin(true);
          console.log(
            "User doesn't have a profile and has no chats, showing Login",
          );
        }
      } else if (user.has_profile) {
        if (isLoggedIn) {
          console.log("User has a profile, showing ChatTable");
          setShowChatTable(true);
          setShowChatTableInvitations(false);
          setShowChatTableSummary(true);
        } else {
          setShowChatTable(false);
          setShowChatTableInvitations(false);
          setShowChatTableSummary(false);
          setShowLogin(true);
        }
        setShowChatTableInvitations(false);
        setShowChatTableSummary(false);
      }
    }
  }, [user, isLoggedIn]);
  const handleLoginSuccess = () => {
    console.log("Login successful");
    setShowLogin(false);
    setShowChatTable(true);
    setShowChatTableInvitations(false);
    setShowChatTableSummary(true);
  };

  const handleMyChatsClick = () => {
    console.log("My chats clicked");
    if (isLoggedIn) {
      console.log("User is logged in");
      setShowChatTable(true);
      setShowChatTableInvitations(false);
      setShowChatTableSummary(false);
    } else {
      console.log("User is not logged in");
      setShowChatTableInvitations(false);
      setShowChatTableSummary(false);
      setShowLogin(true);
    }
  };

  const handleMyInvitationsClick = () => {
    console.log("My invitations clicked");
    if (user.chats.length === 0) {
      console.log("User has no chats, NOT showing ChatTableInvitations");
      setShowChatTableInvitations(false);
    } else {
      setShowChatTableInvitations(true);
      setShowChatTable(false);
      setShowChatTableSummary(false);
      setShowLogin(false);
    }
  };

  const handleMySummaryClick = () => {
    console.log("My Summary clicked");
    setShowChatTableSummary(true);
    setShowChatTable(false);
    setShowLogin(false);
    setShowChatTableInvitations(false);
  };

  return (
    <>
      <div className='overflow-x-auto'>
        <List
          className='inline-flex rounded-lg shadow space-x-4 px-2 pt-2'
          style={{background: "var(--tgui--secondary_bg_color)"}}
        >
          <Chip
            className='w-30 h-20'
            mode={showChatTable ? "elevated" : "mono"}
            onClick={handleMyChatsClick}
          >
            My chats 💬
          </Chip>
          <Chip
            className='w-30 h-20'
            mode={showChatTableInvitations ? "elevated" : "mono"}
            onClick={handleMyInvitationsClick}
          >
            My invitations 📩
          </Chip>
          <Chip
            className='w-30 h-20'
            mode={showChatTableSummary ? "elevated" : "mono"}
            onClick={handleMySummaryClick}
          >
            My Summary 📝
          </Chip>
        </List>
      </div>
      <div className='w-full'>
        {showChatTable && <ChatTable backendUrl={backendUrl} />}
        {showChatTableInvitations && (
          <ChatTableInvitations backendUrl={backendUrl} />
        )}
        {showChatTableSummary && <ChatTableSummary />}
      </div>
      {showLogin && (
        <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
      )}
    </>
  );
};

export default Chats;
