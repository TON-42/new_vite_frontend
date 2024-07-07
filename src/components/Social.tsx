import React from "react";
import {Banner, Button, Image} from "@telegram-apps/telegram-ui";
import telegramLogo from "../assets/logo/telegram.png";
import discordLogo from "../assets/logo/discord-logo.png";
import twitterLogo from "../assets/logo/x.png";
import qrCode from "../assets/qrcode.png"; // Import your QR code image here

const Social: React.FC = () => {
  const openQrCodePopup = () => {
    const popup = window.open("", "QR Code", "width=300,height=300");
    if (popup) {
      popup.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>QR Code</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #fff;
            }
            img {
              width: 80%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <img src="${qrCode}" alt="QR Code">
        </body>
        </html>
      `);
      popup.document.close();
    }
  };

  return (
    <div>
      <h3 className='text-gray-600 bg-gray- text-sm italic'>
        Give us a shoutout and follow us on socials
      </h3>
      <p className='text-gray-600 bg-gray- text-sm'>
        Checkout our{" "}
        <a
          href='https://zealy.io/c/chatpay/invite/WdGzWAjNHWukD1V7X0nPo'
          target='_blank'
          rel='noopener noreferrer'
        >
          Zealy campaign
        </a>{" "}
        for some alpha
      </p>

      {/* Main Content */}
      <div className='flex flex-col items-center justify-center space-y-4 p-4 w-full pb-32'>
        {" "}
        {/* Adjusted padding */}
        <Banner
          before={<Image src={telegramLogo} size={48} />}
          header='Join the official channel'
          onCloseIcon={() => {}}
          subheader='Stay updated with our latest news'
          type='section'
        >
          <React.Fragment key='.0'>
            <Button
              size='s'
              onClick={() => window.open("https://t.me/ChatPayApp", "_blank")}
            >
              Join Now
            </Button>
          </React.Fragment>
        </Banner>
        <Banner
          before={<Image src={telegramLogo} size={48} />}
          header='Join the chat group'
          onCloseIcon={() => {}}
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
          before={<Image src={discordLogo} size={48} />}
          header='Join us on Discord'
          onCloseIcon={() => {}}
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
          before={<Image src={twitterLogo} size={48} />}
          header='Follow us on X (Twitter)'
          onCloseIcon={() => {}}
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
        <Banner
          before={<Image src={qrCode} size={48} />}
          header='Scan the QR Code'
          onCloseIcon={() => {}}
          subheader='Share it with your neighbor'
          type='section'
        >
          <React.Fragment key='.0'>
            <Button size='s' onClick={openQrCodePopup}>
              Scan Now
            </Button>
          </React.Fragment>
        </Banner>
      </div>
    </div>
  );
};

export default Social;
