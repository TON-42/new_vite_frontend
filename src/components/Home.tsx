// Home.tsx
import React, {useState} from "react";
import {Blockquote, Timeline, Text} from "@telegram-apps/telegram-ui";
import {TonConnectUIProvider, TonConnectButton} from "@tonconnect/ui-react";
// import SaleInfo from "./SaleInfo";
import Login from "./Login";
import {useUserContext} from "../utils/utils";

interface HomeProps {
  setCurrentTab: (tabId: string) => void;
}

const backendUrl =
  import.meta.env.VITE_BACKEND_URL ||
  "https://daniilbot-k9qlu.ondigitalocean.app";

const Home: React.FC<HomeProps> = ({setCurrentTab}) => {
  const {user} = useUserContext();
  const [showSaleInfo] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setCurrentTab("chats");
  };

  return (
    <TonConnectUIProvider
      manifestUrl='https://yourappurl.com/tonconnect-manifest.json'
      actionsConfiguration={{
        twaReturnUrl: "https://t.me/chatpayapp_bot/chatpayapp",
      }}
    >
      <div className='flex flex-col min-h-screen p-5'>
        {showLogin ? (
          <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
        ) : (
          <>
            <div className='flex-1'>
              <h1 className='text-4xl font-bold mb-8'>
                {user.name ? `Hello, ${user.name}!` : "Heiya!"} 👋
              </h1>
              <Text className='font-medium mb-4 p-4'>
                ChatPay provides users an easy way to earn money from their
                existing Telegram chats by bundling them into AI training
                datasets.
              </Text>

              <div className='mb-8 p-4'>
                <Blockquote type='text'>
                  🙅 NO personal data is collected.
                </Blockquote>
              </div>
              <Timeline active={4} style={{textAlign: "left"}}>
                <Timeline.Item header='Check chats value'>
                  Your chats are worth money
                </Timeline.Item>
                <Timeline.Item header='Pick chats you want to sell'>
                  All data is anonymized
                </Timeline.Item>
                <Timeline.Item header='Wait for friends to accept'>
                  Everyone has to accept
                </Timeline.Item>
                <Timeline.Item header='Get the money'>
                  Profits are shared equally
                </Timeline.Item>
              </Timeline>
              {/* {showSaleInfo && <SaleInfo />} */}
              {showSaleInfo && <p> SaleInfo</p>}
            </div>
          </>
        )}
      </div>
      <div className='flex justify-center items-center mt-8'>
        <TonConnectButton className='my-button-class' />
      </div>
    </TonConnectUIProvider>
  );
};

export default Home;
