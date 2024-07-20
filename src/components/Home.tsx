import React from "react";
import {Banner} from "@telegram-apps/telegram-ui";
// import {TonConnectUIProvider, TonConnectButton} from "@tonconnect/ui-react";
import logo from "../assets/logo_whitebackground.png";
import {useUserContext} from "../utils/utils";

const Home: React.FC = () => {
  const {user} = useUserContext();
  const balance = user.words ? user.words : 0;

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
        <Banner
          className='rounded-xl h-24 text-left'
          header='Daily Claim'
          subheader='Claim 10 points every 24h'
          before={
            <span className='w-16 h-16 rounded-xl bg-white/[8%] flex items-center justify-center leading-none'>
              <img
                src='./fire.png'
                className='flex items-center justify-center leading-none h-8'
              />
            </span>
          }
          style={{
            background: "var(--tgui--secondary_bg_color)",
          }}
        ></Banner>
        <Banner
          className='rounded-xl h-24 text-left'
          header='Daily Quest'
          subheader='Make quests to earn more'
          before={
            <span className='w-16 h-16 rounded-xl bg-white/[8%] flex items-center justify-center leading-none'>
              <img
                src='./mag_right.png'
                className='flex items-center justify-center leading-none h-8'
              />
            </span>
          }
          style={{
            background: "var(--tgui--secondary_bg_color)",
          }}
        ></Banner>
        <Banner
          className='rounded-xl h-24 text-left'
          header='Sell Chats'
          subheader='Earn rewards for your chat data'
          before={
            <span className='w-16 h-16 rounded-xl bg-white/[8%] flex items-center justify-center leading-none'>
              <img
                src='./speech_balloon.png'
                className='flex items-center justify-center leading-none h-8'
              />
            </span>
          }
          style={{
            background: "var(--tgui--secondary_bg_color)",
          }}
        ></Banner>
        <Banner
          className='rounded-xl h-24 text-left'
          header='Invite Frens'
          subheader='Earn 10% more for each fren'
          before={
            <span className='w-16 h-16 rounded-xl bg-white/[8%] flex items-center justify-center leading-none'>
              <img
                src='./handshake.png'
                className='flex items-center justify-center leading-none h-8'
              />
            </span>
          }
          style={{
            background: "var(--tgui--secondary_bg_color)",
          }}
        ></Banner>
        <Banner
          className='rounded-xl h-24 text-left'
          header='FAQ'
          subheader='Learn more about us'
          before={
            <span className='w-16 h-16 rounded-xl bg-white/[8%] flex items-center justify-center leading-none'>
              <img
                src='./question.png'
                className='flex items-center justify-center leading-none h-8'
              />
            </span>
          }
          style={{
            background: "var(--tgui--secondary_bg_color)",
          }}
        ></Banner>
      </div>
      {/* <div className='mt-auto flex justify-center items-center'>
        <TonConnectUIProvider
          manifestUrl='https://yourappurl.com/tonconnect-manifest.json'
          actionsConfiguration={{
            twaReturnUrl: "https://t.me/chatpayapp_bot/chatpayapp",
          }}
        >
          <TonConnectButton className='my-button-class' />
        </TonConnectUIProvider>
      </div> */}
    </div>
  );
};

export default Home;
