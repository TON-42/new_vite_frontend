import React, { useState } from "react";
import { Text, Input, Button } from "@telegram-apps/telegram-ui"; /

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const InitialQuest: React.FC = () => {
  const [mothertongue, setMothertongue] = useState("");
  const [languagesSpoken, setLanguagesSpoken] = useState("");
  const [cryptoSince, setCryptoSince] = useState("");
  const [telegramSince, setTelegramSince] = useState("");
  const questTitle = "Initial quest";

  const handleSubmit = async () => {
    console.log({
      title: questTitle,
      data: {
        mothertongue,
        languagesSpoken,
        cryptoSince,
        telegramSince,
      },
    });

    try {
      const response = await fetch(`${backendUrl}/quest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: questTitle,
          data: {
            mothertongue,
            languagesSpoken,
            cryptoSince,
            telegramSince,
          },
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Handle success response
      const result = await response.json();
      console.log("Data successfully submitted:", result);
    } catch (error) {
      // Handle error response
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-4xl font-bold mb-8'>{questTitle}</h1>
      <Text className='font-medium mb-4'>
        In this quest we want to know a little more about you
      </Text>
      <Text className='text-7xl mb-4'>🚀</Text>
      <Text className='font-small mb-4'>
        These questions are mostly to create metadata on the content that you
        will create <br />
      </Text>
      <div className='grid grid-cols-1 divide-y'>
        <div className='py-4'>
          <label className='mb-2'>Mothertongue:</label>
          <Input
            className='mb-4'
            value={mothertongue}
            onChange={e => setMothertongue(e.target.value)}
            placeholder='Enter your mothertongue'
          />
        </div>
        <div className='py-4'>
          <label className='mb-2'>Languages Spoken and proficiency:</label>
          <Input
            className='mb-4'
            value={languagesSpoken}
            onChange={e => setLanguagesSpoken(e.target.value)}
            placeholder='Enter languages spoken and proficiency'
          />
        </div>
        <div className='py-4'>
          <label className='mb-2'>In crypto since:</label>
          <Input
            className='mb-4'
            type='number'
            value={cryptoSince}
            onChange={e => setCryptoSince(e.target.value)}
            placeholder='Enter the year you started with crypto'
          />
        </div>
        <div className='py-4'>
          <label className='mb-2'>In Telegram since:</label>
          <Input
            className='mb-4'
            type='number'
            value={telegramSince}
            onChange={e => setTelegramSince(e.target.value)}
            placeholder='Enter the year you started using Telegram'
            max={new Date().getFullYear()}
          />
        </div>
      </div>
      <Button className='mt-4 mb-16' onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default InitialQuest;
