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
} from "@telegram-apps/telegram-ui"; // Ensure all components are imported

interface HomeProps {
  initialUserName?: string | null;
}

const Home: React.FC<HomeProps> = ({ initialUserName }) => {
  const [userName, setUserName] = useState<string | null>(
    initialUserName ?? "User"
  );
  //   const backendUrl =
  //     process.env.REACT_APP_BACKEND_URL ||
  //     "https://daniilbot-k9qlu.ondigitalocean.app";

  const backendUrl = "https://daniilbot-k9qlu.ondigitalocean.app";

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
          There is grandeur in this view of life, with its several powers,
          having been originally breathed by the Creator into a few forms or
          into one; and that, whilst this planet has gone circling on according
          to the fixed law of gravity, from so simple a beginning endless forms
          most beautiful and most wonderful have been, and are being evolved.
        </Blockquote>
      </div>
      <div>
        <Cell
          after={<Badge type="number">99</Badge>}
          before={<Avatar size={48} />}
          description="Sold 3 conversat for 99$"
          //   subhead="Subhead"
          //   subtitle="Subtitle"
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
      <Button>Click Me</Button>
    </div>
  );
};

export default Home;
