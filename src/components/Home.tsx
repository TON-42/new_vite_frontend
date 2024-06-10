import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  Input,
  Blockquote,
  Cell,
  Badge,
  Avatar,
  Info,
} from "@telegram-apps/telegram-ui";
import SaleInfo from "./SaleInfo"; // Ensure you import the SaleInfo component

interface HomeProps {
  initialUserName?: string | null;
}

const Home: React.FC<HomeProps> = ({ initialUserName }) => {
  const [userName, setUserName] = useState<string | null>(
    initialUserName ?? "User"
  );
  const [showSaleInfo, setShowSaleInfo] = useState(false);

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
          .then((response) => response.json())
          .then((data) => console.log("Fetched user ID:", data.userId))
          .catch((error) => console.error("Error fetching user ID:", error));
      }
    }
  }, [backendUrl]);

  const handleButtonClick = () => {
    setShowSaleInfo(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-4xl font-bold mb-4">
        {userName ? `Hello, ${userName}!` : "Hello, User!"} 👋
      </h1>
      <div>
        <Info subtitle="Subtitle" type="text">
          Action
        </Info>
      </div>
      <div>
        <Blockquote type="text">
          ChatPay provides users an easy way to monetize their Telegram chats by
          bundling them into AI training datasets.
        </Blockquote>
      </div>
      <div>
        <Cell
          after={<Badge type="number">99</Badge>}
          before={<Avatar size={48} />}
          description="Sold 3 conversat for 99$"
          titleBadge={<Badge type="dot" />}
        >
          Daniil
        </Cell>
      </div>
      <div className="text-center">
        <Info subtitle="Subtitle" type="text">
          Action
        </Info>
      </div>
      <Button onClick={handleButtonClick}>Click Me</Button>

      {showSaleInfo && <SaleInfo />}
    </div>
  );
};

export default Home;
