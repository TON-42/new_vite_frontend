import React from "react";
import telegramLogo from "../assets/logo/telegram.png";
import discordLogo from "../assets/logo/discord-logo.png";
import twitterLogo from "../assets/logo/x.png";

const Social: React.FC = () => {
  return (
    <div className="text-white min-h-screen flex items-center justify-center border-2 border-white ">
      <div className="container p-4 w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Social Page</h1>
        <p className="mb-4 text-center">Welcome to the social page!</p>
        <div className="flex items-center justify-center space-x-5 mt-4">
          <a
            href="https://t.me/ChatPayApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="Telegram logo"
              src={telegramLogo}
              width={35}
              height={35}
              className="m-2" // Add margin to the image
            />
          </a>
          <a
            href="https://discord.gg/y4Sg3MaGCt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="Discord logo"
              src={discordLogo}
              width={35}
              height={35}
              className="m-2" // Add margin to the image
            />
          </a>
          <a
            href="https://x.com/ChatPay82317"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="X logo"
              src={twitterLogo}
              width={35}
              height={35}
              className="m-2" // Add margin to the image
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Social;
