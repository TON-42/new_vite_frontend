import { useState } from "react";
import Home from "./components/Home.tsx";
import Chats from "./components/Chats.tsx";
import Social from "./components/Social.tsx"; 
import $WORD from "./components/$WORD.tsx";
import { Navigation, Tabbar } from "@telegram-apps/telegram-ui";
import { IconButton } from "@telegram-apps/telegram-ui"; // Make sure to import IconButton
import { VscAccount } from "react-icons/vsc"; // Import the VscAccount icon from react-icons/vsc
import logo from "./assets/logo_blink_whitebackground.gif"; // Ensure the correct path to your logo image

const tabs = [
  { id: "home", text: "Home" },
  { id: "chats", text: "Chats" },
  { id: "social", text: "Social" },
  { id: "$WORD", text: "$WORD" },
];

const App = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  return (
    <div>
      <div style={{ 
        position: "fixed", 
        top: "0", 
        width: "100%", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        // padding: "20px",
        backgroundColor: "#fff", // Optional: add a background color
        zIndex: 1000 // Optional: ensure it stays above other content
      }}>
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
        }}
      >
        <div style={{ flex: 1, width: "100%", maxWidth: "1000px", marginTop: "100px" }}>
          {currentTab === "home" && <Home />}
          {currentTab === "chats" && <Chats />}
          {currentTab === "social" && <Social />}
          {currentTab === "$WORD" && <$WORD />}
          {/* Add more conditions for other tabs if needed */}
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

export default App;
