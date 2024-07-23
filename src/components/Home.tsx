import React from "react";
import HomeCard from "./HomeCard";
import {useUserContext} from "../utils/utils";
import logo from "../assets/logo_whitebackground.png";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Home: React.FC = () => {
  const {user, setCurrentTab, updateUserBalance} = useUserContext();
  const balance = user.words ? user.words : 0;

  const handleClaimClick = async () => {
    const lastClaimTimestamp = localStorage.getItem("lastClaimTimestamp");
    const now = new Date().getTime();

    if (
      lastClaimTimestamp &&
      now - parseInt(lastClaimTimestamp) < 24 * 60 * 60 * 1000
    ) {
      alert("You can only claim points once every 24 hours.");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/quests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          points: 10,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Points successfully claimed:", result);
      // Update user balance or handle the result accordingly
      updateUserBalance(10); // Add points to user's balance
      localStorage.setItem("lastClaimTimestamp", now.toString());
    } catch (error) {
      console.error("Error claiming daily points:", error);
    }
  };

  const handleQuestClick = () => {
    setCurrentTab("quest");
  };

  const handleSellChatsClick = () => {
    setCurrentTab("chats");
  };

  const handleInviteFrensClick = () => {
    window.location.href =
      "https://t.me/share/url?url=https://t.me/chatpayapp_bot&text=Check%20out%20ChatPay";
  };

  const handleFaqClick = () => {
    window.location.href = "https://www.chatpay.app/faq";
  };

  return (
    <div className='flex flex-col mb-20'>
      <header className='flex justify-center items-center mb-4'>
        <img src={logo} alt='Logo' className='w-28' />
      </header>
      <h1 className='text-2xl font-bold mb-4 text-center'>
        {user.name ? `Hello, ${user.name}!` : "Heiya!"} 👋
      </h1>
      <div className='h-24 align-center'>
        <p className='text-5xl font-black'>{balance}</p>
        <p>Your Chat Points</p>
      </div>
      <div className='flex flex-col space-y-1'>
        <HomeCard
          header='Daily Claim'
          subheader='Claim 10 points every 24h'
          iconSrc='./fire.png'
          buttonText='Claim'
          buttonMode='filled'
          buttonOnClick={handleClaimClick}
          // isActive={false}
        />
        <HomeCard
          header='Daily Quest'
          subheader='Make quests to earn more'
          iconSrc='./mag_right.png'
          buttonText='👉'
          buttonOnClick={handleQuestClick}
        />
        <HomeCard
          header='Sell Chats'
          subheader='Earn rewards for your chat data'
          iconSrc='./speech_balloon.png'
          buttonText='👉'
          buttonOnClick={handleSellChatsClick}
        />
        <HomeCard
          header='Invite Frens'
          subheader='Earn 10% more for each fren'
          iconSrc='./handshake.png'
          buttonText='👉'
          buttonOnClick={handleInviteFrensClick}
        />
        <HomeCard
          header='FAQ'
          subheader='Learn more about us'
          iconSrc='./question.png'
          buttonText='soon'
          buttonMode='bezeled'
          buttonOnClick={handleFaqClick}
          isActive={false}
        />
      </div>
    </div>
  );
};

export default Home;
