import { useState } from "react";
import Home from "./components/Home.tsx";
import { Tabbar } from "@telegram-apps/telegram-ui";
import logo from "./assets/logo_blink_whitebackground.gif"; // Ensure the correct path to your logo image

const tabs = [
  { id: "home", text: "Home", Icon: () => <svg width="24" height="24"><circle cx="12" cy="12" r="10" fill="blue" /></svg> },
  { id: "profile", text: "Profile", Icon: () => <svg width="24" height="24"><circle cx="12" cy="12" r="10" fill="green" /></svg> },
  { id: "social", text: "Social", Icon: () => <svg width="24" height="24"><circle cx="12" cy="12" r="10" fill="red" /></svg> },
  { id: "referral", text: "Referral", Icon: () => <svg width="24" height="24"><circle cx="12" cy="12" r="10" fill="yellow" /></svg> },
];

const App = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  return (
    <div style={{ padding: "20px", maxWidth: "100%", margin: "auto", textAlign: "center" }}>
      <img src={logo} alt="Logo" style={{ width: "300px", height: "auto", marginBottom: "20px" }} />
      <Home />
      <Tabbar>
        {tabs.map(({ id, text, Icon }) => (
          <Tabbar.Item key={id} text={text} selected={id === currentTab} onClick={() => setCurrentTab(id)}>
            <Icon />
          </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  );
};

export default App;
