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
    </div>
  );
};

export default Quest;
