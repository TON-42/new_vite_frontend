import React, {useState, useEffect} from "react";
import {Button, Blockquote, Timeline, Text} from "@telegram-apps/telegram-ui";
import {TonConnectUIProvider, TonConnectButton} from "@tonconnect/ui-react";
import SaleInfo from "./SaleInfo"; // Ensure you import the SaleInfo component
import Login from "./Login";

interface HomeProps {
  initialUserName?: string | null;
  setCurrentTab: (tabId: string) => void; // Add this prop
}

const Home: React.FC<HomeProps> = ({initialUserName, setCurrentTab}) => {
  const [userName, setUserName] = useState<string | null>(
    initialUserName ?? "User",
  );
  const [showSaleInfo, setShowSaleInfo] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const backendUrl = "https://daniilbot-k9qlu.ondigitalocean.app";

  // Fetch user ID from the backend
  // We need to know if user exists in the database
  // If he exists, we can highlight the chats tab, or switch to it with a modal
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();

      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      console.log("Telegram WebApp user object:", user); // Log the entire user object

      if (user && user.id) {
        setUserName(user.first_name);
        const requestBody = {userId: user.id, username: user.first_name};
        console.log("Sending to /get-user:", requestBody); // Log the request body
        fetch(`${backendUrl}/get-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })
          .then(response => response.json())
          .then(data => console.log("Fetched user ID:", data.userId))
          .catch(error => console.error("Error fetching user ID:", error));
      }
    }
  }, [backendUrl]);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setCurrentTab("chats");
  };

  const handleLoginButtonClick = () => {
    setShowLogin(true);
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
                {userName ? `Hello, ${userName}!` : "Heiya!"} 👋
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
              {/* <Button
            onClick={handleLoginButtonClick}
            style={{marginBottom: "16px", padding: "16px"}}
          >
            Login
          </Button> */}
              <Timeline active={4} style={{textAlign: "left"}}>
                <Timeline.Item header='Check chats value'>
                  Your chats are worth money
                </Timeline.Item>
                <Timeline.Item header='Pick chats you want to sell'>
                  All data is anonimised
                </Timeline.Item>
                <Timeline.Item header='Wait for friends to accept'>
                  Everyone has to accept
                </Timeline.Item>
                <Timeline.Item header='Get the money'>
                  Profits are shared equally
                </Timeline.Item>
              </Timeline>
              {showSaleInfo && <SaleInfo />}
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
