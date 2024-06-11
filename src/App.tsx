import { useState } from "react";
import Home from "./components/Home";
import Chats from "./components/Chats";
import Social from "./components/Social";
import $WORD from "./components/Word";
import AgreeSale from "./components/Modals/AgreeSale";
import { Tabbar } from "@telegram-apps/telegram-ui";
import { IconButton } from "@telegram-apps/telegram-ui";
import { VscAccount } from "react-icons/vsc";
import logo from "./assets/logo_blink_whitebackground.gif";

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

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>(tabs[0].id);

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
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            maxWidth: "1000px",
            marginTop: "100px",
          }}
        >
          {currentTab === "home" && <Home />}
          {currentTab === "chats" && <Chats />}
          {currentTab === "social" && <Social />}
          {currentTab === "word" && <$WORD />}
        </div>
        {/* <div style={{ marginTop: "20px" }}>
          <AgreeSale />
        </div> */}
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
