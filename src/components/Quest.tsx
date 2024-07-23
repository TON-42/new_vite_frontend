import React from "react";
import {Text} from "@telegram-apps/telegram-ui";
import InitialQuest from "./Quests/01InitialQuest";
import CustomCard from "./HomeCard";

const Quest: React.FC = () => {
  const [showInitialQuest, setShowInitialQuest] = React.useState(false);

  const photoUrl = window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url;

  const handleOpenFirstQuest = () => {
    setShowInitialQuest(true);
  };

  return (
    <div className='flex flex-col p-4'>
      {!showInitialQuest ? (
        <>
          <h1 className='text-4xl font-bold mb-4'>Quests</h1>
          <Text className='text-7xl mb-4'>🚀</Text>
          <Text className='font-small mb-8'>
            When ChatGPT comes to ChatPay with a request for a specific type of
            content, <br />
            we share it with you and you can earn some points by creating
            content for their needs.
            <br />
            <br />
            Watch out our socials for quests announcements!
            <br />
          </Text>
          <div className='flex flex-col space-y-1'>
            <CustomCard
              header='Nice to meet you'
              subheader='In this quest we want to know a little more about you'
              points={1000}
              iconSrc={photoUrl || "./emoji/walking.png"}
              buttonText='Go'
              buttonMode='filled'
              buttonOnClick={handleOpenFirstQuest}
            />

            <CustomCard
              header='Crypto know'
              subheader='This quest is coming soon. Check back later!'
              points={3400}
              iconSrc='./emoji/writing_hand.png'
              buttonText='Go'
              buttonMode='filled'
              isActive={false}
              buttonOnClick={() => {}}
            />
            <CustomCard
              header='Audio'
              subheader='This quest is coming soon. Check back later!'
              points={6800}
              iconSrc='./emoji/microphone.png'
              buttonText='Go'
              buttonMode='filled'
              isActive={false}
              buttonOnClick={() => {}}
            />
          </div>
          <div className='mb-16'></div>
        </>
      ) : (
        <InitialQuest />
      )}
    </div>
  );
};

export default Quest;
