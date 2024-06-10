import { useState } from "react";
import Home from "./components/Home.tsx";
import Profile from "./components/Profile.tsx";
import Social from "./components/Social.tsx"; 
import Referal from "./components/Referal.tsx";
import { Tabbar } from "@telegram-apps/telegram-ui";
import logo from "./assets/logo_blink_whitebackground.gif"; // Ensure the correct path to your logo image

const tabs = [
  { id: "home", text: "Home" },
  { id: "profile", text: "Profile" },
  { id: "social", text: "Social" },
  { id: "referral", text: "Referral" },
];

const App = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  return (
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
      <div style={{ position: "fixed", top: "20px", zIndex: 1000 }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "300px", height: "auto" }}
        />
      </div>
      <div style={{ flex: 1, width: "100%", maxWidth: "1000px", marginTop: "100px" }}>
        {currentTab === "home" && <Home />}
        {currentTab === "profile" && <Profile />}
        {currentTab === "social" && <Social />}
        {currentTab === "referral" && <Referal />}
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
  );
};

export default App;
