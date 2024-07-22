import React from "react";
import {Text} from "@telegram-apps/telegram-ui";

const InitialQuest: React.FC = () => {
  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-4xl font-bold mb-8'> Initial quest</h1>
      <Text className='font-medium mb-4'>This is a quest about... </Text>
      <Text className='text-7xl mb-4'>🚀</Text>
      <Text className='font-small mb-4'>
        <br />
        Several forms and a submit button <br />
      </Text>
    </div>
  );
};

export default InitialQuest;
