// App.tsx
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Chats from "./components/Chats";
import Social from "./components/Social";
import Word from "./components/Word";
import AgreeSale from "./components/Modals/AgreeSale";
import { Tabbar, IconButton } from "@telegram-apps/telegram-ui";
import { VscAccount } from "react-icons/vsc";
import logo from "./assets/logo_blink_whitebackground.gif";
import { UserProvider, useUserContext } from "./components/UserContext";
import ApiButtons from "./components/ApiButtons";

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
    // This DB entry should/could be a level:
    // 0. First time connecting,
    // 1. Verified phone number,
    // 2. Got invited
  }, [user]);

  // I want to print user data here
  console.log("Auser data:", user);
  console.log("Auser id:", user.id);
  console.log("Auser chats:", user.chats);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "0",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          zIndex: 1000,
          padding: "10px",
        }}
      >
        <div style={{ flex: "0 1 auto" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "150px", height: "auto" }}
          />
        </div>
        <div style={{ flex: "0 1 auto", textAlign: "right" }}>
          <IconButton mode="plain" size="l">
            <VscAccount size={48} />
          </IconButton>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          maxWidth: "100%",
          margin: "auto",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <div style={{ flex: 1, width: "100%", maxWidth: "1000px" }}>
          {currentTab === "home" && <Home />}
          {currentTab === "chats" && <Chats />}
          {currentTab === "social" && <Social />}
          {currentTab === "word" && <Word />}
        </div>
        <div style={{ marginTop: "20px" }}>
          <AgreeSale />
        </div>
        <div style={{ marginTop: "20px" }}>
          <ApiButtons />
        </div>
        <div style={{ marginTop: "auto", width: "100%" }}>
          <Tabbar>
            {tabs.map(({ id, text }) => (
              <Tabbar.Item
                key={id}
                text={text}
                selected={id === currentTab}
                onClick={() => setCurrentTab(id)}
              />
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
