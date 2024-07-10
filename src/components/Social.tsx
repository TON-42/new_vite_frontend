import React from "react";
import {Banner, Button, Image} from "@telegram-apps/telegram-ui";
import telegramLogo from "../assets/logo/telegram.png";
import discordLogo from "../assets/logo/discord-logo.png";
import twitterLogo from "../assets/logo/x.png";
import zealyLogo from "../assets/logo/zealy-logo.png";

const Social: React.FC = () => {
  return (
    <>
      <h3 className='text-black dark:text-white bg-gray text-lg italic'>
        Give us a shoutout and follow us on socials
      </h3>

      <div className='flex flex-col items-center justify-center space-y-4 p-4 w-full pb-20 text-left'>
        <Banner
          style={{
            background: "var(--tgui--secondary_bg_color)",
            width: "300px",
            borderRadius: "1rem",
          }}
          before={<Image src={zealyLogo} size={48} />}
          header='Check our Zealy'
          subheader='Engage in our campaign for some alpha'
          type='section'
        >
          <React.Fragment key='.0'>
            <Button
              size='s'
              onClick={() =>
                window.open("https://zealy.io/cw/chatpay/", "_blank")
              }
            >
              Join Now
            </Button>
          </React.Fragment>
        </Banner>
        <Banner
          style={{
            background: "var(--tgui--secondary_bg_color)",
            width: "300px",
            borderRadius: "1rem",
          }}
          before={<Image src={telegramLogo} size={48} />}
          header='Join the chat group'
          subheader='Stay updated with our latest news'
          type='section'
        >
          <React.Fragment key='.0'>
            <Button
              size='s'
              onClick={() =>
                window.open("https://t.me/ChatPayCommunity", "_blank")
              }
            >
              Join Now
            </Button>
          </React.Fragment>
        </Banner>
        <Banner
          style={{
            background: "var(--tgui--secondary_bg_color)",
            width: "300px",
            borderRadius: "1rem",
          }}
          before={<Image src={discordLogo} size={48} />}
          header='Join us on Discord'
          subheader='Engage with our community'
          type='section'
        >
          <React.Fragment key='.0'>
            <Button
              size='s'
              onClick={() =>
                window.open("https://discord.gg/y4Sg3MaGCt", "_blank")
              }
            >
              Join Now
            </Button>
          </React.Fragment>
        </Banner>
        <Banner
          style={{
            background: "var(--tgui--secondary_bg_color)",
            width: "300px",
            borderRadius: "1rem",
          }}
          before={<Image src={twitterLogo} size={48} />}
          header='Follow us on X'
          subheader='Get the latest updates'
          type='section'
        >
          <React.Fragment key='.0'>
            <Button
              size='s'
              onClick={() => window.open("https://x.com/chatpay_app", "_blank")}
            >
              Follow
            </Button>
          </React.Fragment>
        </Banner>
      </div>
    </>
  );
};

export default Social;
