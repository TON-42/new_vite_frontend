import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Chats from "./components/Chats";
import Social from "./components/Social";
import Word from "./components/Word";
import { Tabbar, IconButton } from "@telegram-apps/telegram-ui";
import { VscAccount } from "react-icons/vsc";
import logo from "./assets/logo_blink_whitebackground.gif";
import { UserProvider, useUserContext } from "./components/UserContext";

interface Tab {
  id: string;
  text: string;
}

const tabs: Tab[] = [
  { id: "home", text: "Home" },
  { id: "chats", text: "Chats" },
  { id: "social", text: "Social" },
  { id: "word", text: "Word" },
];

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>(tabs[0].id);
  const { user } = useUserContext();

  useEffect(() => {
    if (user.id) {
      console.log("User exists in the database, switching to Chats tab");
      setCurrentTab(tabs[1].id); // Set to "Chats" if user exists
    } else {
      console.log("User does not exist in the database");
      setCurrentTab(tabs[0].id); // Set to "Home" if user does not exist
    }
  }, [user]);

  console.log("User data:", user);
  console.log("User id:", user.id);
  console.log("User chats:", user.chats);

  return (
    <div>
      <div className="fixed top-0 w-full flex justify-between items-center bg-white z-50 p-2">
        {/* The outer div might not be necessary */}
        <div className="flex-shrink-0 flex-grow-0">
          <img src={logo} alt="Logo" className="h-auto w-36" />
        </div>
        <div style={{ flex: "0 1 auto", textAlign: "right" }}>
          <IconButton mode="plain" size="l">
            <VscAccount size={48} />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col items-center p-5 max-w-full mx-auto text-center mt-24">
        <div className="flex-1 w-full max-w-4xl">
          {currentTab === "home" && <Home setCurrentTab={setCurrentTab} />}
          {currentTab === "chats" && <Chats />}
          {currentTab === "social" && <Social />}
          {currentTab === "word" && <Word />}
        </div>
        <div className="mt-auto w-full">
          <Tabbar>
            {tabs.map(({ id, text }) => (
              <Tabbar.Item key={id} text={text} selected={id === currentTab} onClick={() => setCurrentTab(id)} />
            ))}
          </Tabbar>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <UserProvider>
    <AppContent />
  </UserProvider>
);

export default App;
