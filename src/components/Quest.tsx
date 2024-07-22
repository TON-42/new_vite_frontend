import React from "react";
import {Text, Button} from "@telegram-apps/telegram-ui";
import InitialQuest from "./Quests/01InitialQuest";

const Quest: React.FC = () => {
  const [showInitialQuest, setShowInitialQuest] = React.useState(false);

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
          <Text className='font-small mb-4'>
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
          <div className='card bg-white shadow-md rounded-lg p-4 mb-4'>
            <div className='flex items-center mb-4'>
              <span className='text-7xl'>🧍</span>
              <div className='ml-4'>
                <Text className='font-medium'>Nice to meet you</Text>
                <Text className='font-small text-gray-500'>
                  In this quest we want to know a little more about you
                </Text>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <Text className='font-medium text-lg'>1000 points</Text>
              <Button mode='filled' size='m' onClick={handleOpenFirstQuest}>
                Go
              </Button>
            </div>
          </div>
        </>
      ) : (
        <InitialQuest />
      )}
    </div>
  );
};

export default Quest;
