import React, {useState, useEffect} from "react";
import Home from "./components/Home";
import Chats from "./components/Chats";
import Social from "./components/Social";
import Word from "./components/Word";
import OnboardUserB from "./components/Modals/OnboardUserB";
import {Tabbar, IconButton} from "@telegram-apps/telegram-ui";
import {VscAccount} from "react-icons/vsc";
import logo from "./assets/logo_blink_whitebackground.gif";
import {UserProvider, useUserContext} from "./components/UserContext";

interface Tab {
  id: string;
  text: string;
}

const tabs: Tab[] = [
  {id: "home", text: "Home"},
  {id: "chats", text: "Chats"},
  {id: "social", text: "Social"},
  {id: "word", text: "Word"},
];

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>(tabs[0].id);
  const [showOnboard, setShowOnboard] = useState<boolean>(false);
  const {user} = useUserContext();

  //user doesn’t have a profile and have at least one chat  => he has been invited to sell a chat
  //user have a profile => show his chats (+ in future show pending)
  //user doesn’t have a profile and doesn't have a chat  => he just opened the name

  useEffect(() => {
    if (!user.has_profile && user.chats.length > 0) {
      console.log(
        "User doesn't have a profile but has at least one chat, showing OnboardUserB modal",
      );
      setShowOnboard(true);
    } else if (user.has_profile) {
      console.log("User has a profile, showing user's chats");
      setCurrentTab(tabs[1].id);
    } else if (!user.has_profile && user.chats.length === 0) {
      console.log(
        "User doesn't have a profile and doesn't have any chats, he just opened the app",
      );
      setCurrentTab(tabs[0].id);
    }
  }, [user]);

  const handleOnboardClose = () => {
    setShowOnboard(false);
    setCurrentTab(tabs[1].id);
  };

  console.log("User data:", user);
  console.log("User id:", user.id);
  console.log("User chats:", user.chats);

  return (
    <div>
      <div className='fixed top-0 w-full flex justify-between items-center bg-white z-1000 p-2'>
        <div className='flex-shrink-0'>
          <img src={logo} alt='Logo' className='w-36 h-auto' />
        </div>
        <div className='flex-shrink-0 text-right'>
          <IconButton mode='plain' size='l'>
            <VscAccount size={48} />
          </IconButton>
        </div>
      </div>
      <div className='flex flex-col items-center p-5 max-w-full mx-auto text-center mt-24'>
        <div className='flex-1 w-full max-w-4xl'>
          {currentTab === "home" && <Home setCurrentTab={setCurrentTab} />}
          {currentTab === "chats" && <Chats />}
          {currentTab === "social" && <Social />}
          {currentTab === "word" && <Word />}
        </div>
        <div className='mt-auto w-full'>
          <Tabbar>
            {tabs.map(({id, text}) => (
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
      {showOnboard && <OnboardUserB onClose={handleOnboardClose} />}
    </div>
  );
};

const App: React.FC = () => (
  <UserProvider>
    <AppContent />
  </UserProvider>
);

export default App;
