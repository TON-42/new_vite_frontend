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
          <Button mode='filled' size='m' onClick={handleOpenFirstQuest}>
            Open the first quest
          </Button>
        </>
      ) : (
        <InitialQuest />
      )}
    </div>
  );
};

export default Quest;
