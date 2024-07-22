import React, {useEffect, useRef, useState, useCallback} from "react";
import {useTWAEvent} from "@tonsolutions/telemetree-react";
import {TwaAnalyticsProvider} from "@tonsolutions/telemetree-react";
import Home from "./components/Home";
import Chats from "./components/Chats";
import Social from "./components/Social";
import Quest from "./components/Quest";
import OnboardUserB from "./components/Modals/OnboardUserB";
import OnboardUserN from "./components/Modals/OnboardUserN";
import {Tabbar} from "@telegram-apps/telegram-ui";
import {Icon28Chat} from "@telegram-apps/telegram-ui/dist/icons/28/chat";
import {Icon28Heart} from "@telegram-apps/telegram-ui/dist/icons/28/heart";
import {Icon28Stats} from "@telegram-apps/telegram-ui/dist/icons/28/stats";
import {useUserContext} from "./utils/utils";
import {UserProvider} from "./components/UserContext";
import {RiHomeLine} from "react-icons/ri";

const isProduction =
  import.meta.env.VITE_IS_PRODUCTION === "true" ||
  import.meta.env.VITE_IS_PRODUCTION === "1";

interface Tab {
  id: string;
  text: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {id: "home", text: "Home", icon: <RiHomeLine className='size-7' />},
  {id: "chats", text: "Chats", icon: <Icon28Chat />},
  {id: "social", text: "Social", icon: <Icon28Heart />},
  {id: "quest", text: "Quest", icon: <Icon28Stats />},
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

  const trackEvent = useCallback(
    (eventName: string, eventData: Record<string, unknown>) => {
      if (isProduction) {
        eventBuilder.track(eventName, eventData);
      } else {
        console.log(`Event tracked (dev mode): ${eventName}`, eventData);
      }
    },
    [eventBuilder],
  );

  useEffect(() => {
    if (!hasTrackedAppEntered.current && isProduction) {
      console.log("Tracking App Entered event");
      trackEvent("App Entered", {
        userId: user.id,
        category: "App Usage",
      });
      hasTrackedAppEntered.current = true;
    }

    const hasRedirectedToChats = sessionStorage.getItem("hasRedirectedToChats");
    const hasShownOnboardUserB = sessionStorage.getItem("hasShownOnboardUserB");

    if (user.chats.length > 0 && !hasRedirectedToChats) {
      console.log("User has chats, showing user's chats");
      setCurrentTab(tabs[1].id);
      sessionStorage.setItem("hasRedirectedToChats", "true");
    }

    if (!user.has_profile) {
      if (user.chats.length > 0 && !hasShownOnboardUserB) {
        console.log(
          "User has no profile, but has chats, switching to chats tab",
        );
        sessionStorage.setItem("hasShownOnboardUserB", "true");
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
  }, [user.id, user.chats.length, user.has_profile, setCurrentTab, trackEvent]);

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
    trackEvent("Tab Clicked", {
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
      <div className='flex flex-col items-center p-4 max-w-full mx-auto text-center'>
        <div className='flex-1 w-full max-w-4xl'>
          {currentTab === "home" && <Home />}
          {currentTab === "chats" && <Chats backendUrl={backendUrl} />}
          {currentTab === "social" && <Social />}
          {currentTab === "quest" && <Quest />}
        </div>
      </div>
      <div className='fixed bottom-0 w-full z-40'>
        <Tabbar
          style={{
            padding: "2px",
            background: "var(--tgui--secondary_bg_color)",
          }}
        >
          {tabs.map(({id, text, icon}) => (
            <Tabbar.Item
              key={id}
              text={text}
              selected={id === currentTab}
              onClick={() => handleTabClick(id)}
            >
              {icon}
            </Tabbar.Item>
          ))}
        </Tabbar>
      </div>
      {showOnboardUserN && <OnboardUserN onClose={handleOnboardClose} />}
      {showOnboardUserB && <OnboardUserB onClose={handleOnboardClose} />}
    </div>
  );
};

export const App: React.FC = () => {
  console.log("isProduction: ", isProduction);

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
};

export default App;
