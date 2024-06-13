import React, { useState, useEffect } from "react";
import { Button, Blockquote, Timeline, Text } from "@telegram-apps/telegram-ui";
import SaleInfo from "./SaleInfo"; // Ensure you import the SaleInfo component
import Login from "./Login";

interface HomeProps {
  initialUserName?: string | null;
  setCurrentTab: (tabId: string) => void; // Add this prop
}

const Home: React.FC<HomeProps> = ({ initialUserName, setCurrentTab }) => {
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
      if (user && user.id) {
        setUserName(user.first_name);
        fetch(`${backendUrl}/get-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
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
    <div style={{ padding: "20px" }}>
      {showLogin ? (
        <Login onLoginSuccess={handleLoginSuccess} backendUrl={backendUrl} />
      ) : (
        <>
          <h1
            className='text-4xl font-bold text-left'
            style={{ marginBottom: "32px" }}
          >
            {userName ? `Hello, ${userName}!` : "Heiya!"} 👋
          </h1>
          <Text weight='3' style={{ marginBottom: "16px", padding: "16px" }}>
            ChatPay provides users an easy way to earn money from their existing
            Telegram chats by bundling them into AI training datasets.
          </Text>

          <div style={{ marginBottom: "32px", padding: "16px" }}>
            <Blockquote type='text'>
              🙅 NO personal data is collected.
            </Blockquote>
          </div>
          <Button
            onClick={handleLoginButtonClick}
            style={{ marginBottom: "16px", padding: "16px" }}
          >
            Login
          </Button>
          <Timeline active={4} style={{ textAlign: "left" }}>
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
        </>
      )}
    </div>
  );
};

export default Home;
