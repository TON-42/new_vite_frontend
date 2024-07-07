import React, {useState, useEffect, useCallback} from "react";
import ChatTable from "./ChatTable";
import ChatTableInvitations from "./ChatTableInvitations";
import ChatTableSummary from "./ChatTableSummary";
import Login from "./Login";
import {useUserContext} from "../utils/utils";
import {List, Chip} from "@telegram-apps/telegram-ui";

const Chats: React.FC<{backendUrl: string}> = ({backendUrl}) => {
  const {user, isLoggedIn} = useUserContext();
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (!isLoggedIn) {
      setActiveTab("login");
    } else if (user) {
      if (!user.has_profile) {
        setActiveTab(user.chats.length > 0 ? "invitations" : "login");
      } else {
        setActiveTab("chats");
      }
    }
  }, [user, isLoggedIn]);

  const handleTabClick = useCallback(
    (tab: string) => {
      if (!isLoggedIn) {
        setActiveTab("login");
      } else {
        setActiveTab(tab);
      }
    },
    [isLoggedIn],
  );

  const handleLoginSuccess = useCallback(() => {
    handleTabClick("chats");
  }, [handleTabClick]);

  const renderContent = () => {
    switch (activeTab) {
      case "chats":
        return <ChatTable backendUrl={backendUrl} />;
      case "invitations":
        return <ChatTableInvitations backendUrl={backendUrl} />;
      case "summary":
        return <ChatTableSummary />;
      case "login":
      default:
        return (
          <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
        );
    }
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
            mode={activeTab === "chats" ? "elevated" : "mono"}
            onClick={() => handleTabClick("chats")}
          >
            My chats 💬
          </Chip>
          <Chip
            className='w-30 h-20'
            mode={activeTab === "invitations" ? "elevated" : "mono"}
            onClick={() => handleTabClick("invitations")}
          >
            My invitations 📩
          </Chip>
          <Chip
            className='w-30 h-20'
            mode={activeTab === "summary" ? "elevated" : "mono"}
            onClick={() => handleTabClick("summary")}
          >
            My Summary 📝
          </Chip>
        </List>
      </div>
      <div className='w-full'>{renderContent()}</div>
    </>
  );
};

export default Chats;
