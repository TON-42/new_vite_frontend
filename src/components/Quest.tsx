import React from "react";
import {Text} from "@telegram-apps/telegram-ui";

const Quest: React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen p-5'>
      <h1 className='text-4xl font-bold mb-8'>Quest</h1>
      <Text className='font-medium mb-4'>
        Quests for content creation coming soon!
      </Text>
      <Text className='text-7xl mb-4'>🚀</Text>
      <Text className='font-small italic mb-4'>
        <br />
        <br />
        We will run quests such as: <br />
        Record a 4 turn, 2 person conversation about crypto
      </Text>
    </div>
  );
};

export default Quest;
