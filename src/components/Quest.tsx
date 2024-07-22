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
          <h1 className='text-4xl font-bold mb-8'>Quest</h1>
          <Text className='font-medium mb-4'>
            Quests for content creation coming soon!
          </Text>
          <Text className='text-7xl mb-4'>🚀</Text>
          <Text className='font-small mb-8'>
            <br />
            <br />
            When Clients come to ChatPay with a request for a specific type of
            content, <br />
            We will share it and you will be able to make even more money by
            creating specific content for their needs.
            <br />
            <br />
            Just watch out our socials!
            <br />
          </Text>
          <div className='flex flex-col space-y-1'>
            <CustomCard
              header='Nice to meet you'
              subheader='In this quest we want to know a little more about you'
              iconSrc={photoUrl || "./emoji/standin_person.png"}
              buttonText='Go'
              buttonMode='filled'
              buttonOnClick={handleOpenFirstQuest}
            />

            <CustomCard
              header='Content creation'
              subheader='This quest is coming soon. Check back later!'
              iconSrc='./emoji/writing-hand.png'
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
