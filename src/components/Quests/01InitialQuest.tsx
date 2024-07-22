import React, {useState} from "react";
import {Text, Input, Button} from "@telegram-apps/telegram-ui"; // Assuming you have these components available

const InitialQuest: React.FC = () => {
  const [mothertongue, setMothertongue] = useState("");
  const [languagesSpoken, setLanguagesSpoken] = useState("");
  const [cryptoSince, setCryptoSince] = useState("");
  const [telegramSince, setTelegramSince] = useState("");

  const handleSubmit = () => {
    // Handle the form submission logic here
    console.log({
      mothertongue,
      languagesSpoken,
      cryptoSince,
      telegramSince,
    });
  };

  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-4xl font-bold mb-8'>Initial quest</h1>
      <Text className='font-medium mb-4'>
        In this quest we want to know a little more about you
      </Text>
      <Text className='text-7xl mb-4'>🚀</Text>
      <Text className='font-small mb-4'>
        These questions are mostly to create metadata on the content that you
        will create <br />
      </Text>
      <label className='mb-2'>Mothertongue:</label>
      <Input
        className='mb-4'
        value={mothertongue}
        onChange={e => setMothertongue(e.target.value)}
        placeholder='Enter your mothertongue'
      />
      <label className='mb-2'>Languages Spoken and proficiency:</label>
      <Input
        className='mb-4'
        value={languagesSpoken}
        onChange={e => setLanguagesSpoken(e.target.value)}
        placeholder='Enter languages spoken and proficiency'
      />
      <label className='mb-2'>In crypto since:</label>
      <Input
        className='mb-4'
        value={cryptoSince}
        onChange={e => setCryptoSince(e.target.value)}
        placeholder='Enter the year you started with crypto'
      />
      <label className='mb-2'>In Telegram since:</label>
      <Input
        className='mb-4'
        value={telegramSince}
        onChange={e => setTelegramSince(e.target.value)}
        placeholder='Enter the year you started using Telegram'
      />
      <Button className='mt-4' onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default InitialQuest;
