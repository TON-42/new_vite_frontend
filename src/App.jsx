import { useState } from "react";
import Home from "./components/Home.tsx";
import Social from "./components/Social.tsx"; // Import the Social component
import LoginModal from "./components/LoginModal"; // Import the LoginModal component
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a state for login status

  return (
    <div style={{ padding: "20px", maxWidth: "100%", margin: "auto", textAlign: "center" }}>
      {!isLoggedIn && <LoginModal />} {/* Conditionally render the LoginModal */}
      <img src={logo} alt="Logo" style={{ width: "300px", height: "auto", marginBottom: "20px" }} />
      {currentTab === "home" && <Home />}
      {currentTab === "social" && <Social />}
      {/* Add more conditions for other tabs if needed */}
      <Tabbar>
        {tabs.map(({ id, text }) => (
          <Tabbar.Item key={id} text={text} selected={id === currentTab} onClick={() => setCurrentTab(id)} />
        ))}
      </Tabbar>
    </div>
  );
};

export default App;
