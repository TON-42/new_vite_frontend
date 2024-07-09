import React, {useEffect, useRef, useState} from "react";
import {useTWAEvent} from "@tonsolutions/telemetree-react";
import {TwaAnalyticsProvider} from "@tonsolutions/telemetree-react";
import Home from "./components/Home";
import Chats from "./components/Chats";
import Social from "./components/Social";
import Quest from "./components/Quest";
import OnboardUserB from "./components/Modals/OnboardUserB";
import OnboardUserN from "./components/Modals/OnboardUserN";
import {Tabbar} from "@telegram-apps/telegram-ui";
import {useUserContext} from "./utils/utils";
import {UserProvider} from "./components/UserContext";

const isProduction =
  import.meta.env.VITE_IS_PRODUCTION === "true" ||
  import.meta.env.VITE_IS_PRODUCTION === "1";

interface Tab {
  id: string;
  text: string;
}

const tabs: Tab[] = [
  {id: "home", text: "Home"},
  {id: "chats", text: "Chats"},
  {id: "social", text: "Social"},
  {id: "quest", text: "Quest"},
];

const AppContent: React.FC = () => {
  const {user, currentTab, setCurrentTab} = useUserContext();
  const eventBuilder = useTWAEvent();
  const hasTrackedAppEntered = useRef(false);

  const [showOnboardUserB, setShowOnboardUserB] = useState(false);
  const [showOnboardUserN, setShowOnboardUserN] = useState(true);

  const handleOnboardClose = () => {
    setShowOnboardUserB(false);
    setShowOnboardUserN(false);
    setCurrentTab("chats");
  };

  const getBackendUrl = (): string => {
    const url = import.meta.env.VITE_BACKEND_URL;
    if (!url || typeof url !== "string") {
      throw new Error(
        "VITE_BACKEND_URL is not defined. Please set it in your environment variables.",
      );
    }
    return url;
  };

  const backendUrl: string = getBackendUrl();

  useEffect(() => {
    if (!hasTrackedAppEntered.current) {
      console.log("Tracking App Entered event");
      eventBuilder.track("App Entered", {
        userId: user.id,
        category: "App Usage",
      });
      hasTrackedAppEntered.current = true;
    }

    const hasRedirectedToChats = sessionStorage.getItem("hasRedirectedToChats");

    if (user.chats.length > 0 && !hasRedirectedToChats) {
      console.log("User has chats, showing user's chats");
      setCurrentTab(tabs[1].id);
      sessionStorage.setItem("hasRedirectedToChats", "true");
    }

    if (!user.has_profile) {
      if (user.chats.length > 0) {
        console.log(
          "User has no profile, but has chats, switching to chats tab",
        );
        setCurrentTab(tabs[1].id);
        setShowOnboardUserB(true);
      } else {
        const onboardUserNSeen = sessionStorage.getItem("onboardUserNSeen");
        console.log(`onboardUserNSeen: ${onboardUserNSeen}`);
        if (!onboardUserNSeen) {
          console.log("Setting showOnboardUserN to true");
          setShowOnboardUserN(true);
          sessionStorage.setItem("onboardUserNSeen", "true");
        } else {
          console.log(
            "onboardUserNSeen is already true, not showing OnboardUserN",
          );
        }
      }
    }
  }, [
    eventBuilder,
    user.chats.length,
    user.has_profile,
    user.id,
    setCurrentTab,
  ]);

  useEffect(() => {
    if (user.auth_status === "auth_code") {
      console.log(user.auth_status);
      console.log(
        "auth_status is auth_code, (means user went through /send-code) redirecting to login tab",
      );
      setCurrentTab(tabs[1].id);
    }
  }, [user.auth_status, setCurrentTab]);

  const handleTabClick = (id: string) => {
    setCurrentTab(id);
    eventBuilder.track("Tab Clicked", {
      userId: user.id,
      tabId: id,
      category: "Navigation",
    });
    console.log(
      `Tab Clicked event tracked: { userId: ${user.id}, tabId: ${id} }`,
    );
  };

  return (
    <div>
      <div className='flex flex-col items-center p-5 max-w-full mx-auto text-center mt-24'>
        <div className='flex-1 w-full max-w-4xl'>
          {currentTab === "home" && <Home />}
          {currentTab === "chats" && <Chats backendUrl={backendUrl} />}
          {currentTab === "social" && <Social />}
          {currentTab === "quest" && <Quest />}
        </div>
      </div>
      <div className='fixed bottom-0 w-full bg-white z-1100'>
        <Tabbar>
          {tabs.map(({id, text}) => (
            <Tabbar.Item
              key={id}
              text={text}
              selected={id === currentTab}
              onClick={() => handleTabClick(id)}
            />
          ))}
        </Tabbar>
      </div>
      {showOnboardUserN && <OnboardUserN onClose={handleOnboardClose} />}
      {showOnboardUserB && <OnboardUserB onClose={handleOnboardClose} />}
    </div>
  );
};

export function App() {
  console.log("isProduction: ", isProduction);
  if (isProduction) {
    console.log("Tracking enabled");
    return (
      <TwaAnalyticsProvider
        projectId={import.meta.env.VITE_TELEMETREE_PROJECT_ID}
        apiKey={import.meta.env.VITE_TELEMETREE_KEY}
        appName='ChatPay'
      >
        <UserProvider>
          <AppContent />
        </UserProvider>
      </TwaAnalyticsProvider>
    );
  } else {
    return (
      <UserProvider>
        <AppContent />
      </UserProvider>
    );
  }
}

export default App;
