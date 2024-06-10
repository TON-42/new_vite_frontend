import React from "react";
import { Banner, Button, Image } from "@telegram-apps/telegram-ui";
import telegramLogo from "../assets/logo/telegram.png";
import discordLogo from "../assets/logo/discord-logo.png";
import twitterLogo from "../assets/logo/x.png";

const Social: React.FC = () => {
  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center border-2 border-white space-y-4 p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Social Page</h1>
      <p className="mb-4 text-center">Welcome to the social page!</p>

      <Banner
        before={<Image src={telegramLogo} size={48} />}
        header="Join us on Telegram"
        onCloseIcon={() => {}}
        subheader="Stay updated with our latest news"
        type="section"
      >
        <React.Fragment key=".0">
          <Button
            size="s"
            onClick={() => window.open("https://t.me/ChatPayApp", "_blank")}
          >
            Join Now
          </Button>
        </React.Fragment>
      </Banner>

      <Banner
        before={<Image src={discordLogo} size={48} />}
        header="Join us on Discord"
        onCloseIcon={() => {}}
        subheader="Engage with our community"
        type="section"
      >
        <React.Fragment key=".0">
          <Button
            size="s"
            onClick={() =>
              window.open("https://discord.gg/y4Sg3MaGCt", "_blank")
            }
          >
            Join Now
          </Button>
        </React.Fragment>
      </Banner>

      <Banner
        before={<Image src={twitterLogo} size={48} />}
        header="Follow us on X (Twitter)"
        onCloseIcon={() => {}}
        subheader="Get the latest updates"
        type="section"
      >
        <React.Fragment key=".0">
          <Button
            size="s"
            onClick={() => window.open("https://x.com/ChatPay82317", "_blank")}
          >
            Follow
          </Button>
        </React.Fragment>
      </Banner>
    </div>
  );
};

export default Social;
