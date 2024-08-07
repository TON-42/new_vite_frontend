import React, {useState} from "react";
import {Text, Input, Button} from "@telegram-apps/telegram-ui";
import {useUserContext} from "../../utils/utils";
import SuccessModalInitialQuest from "../Modals/SuccessModalInitialQuest";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Quest01: React.FC = () => {
  const {user, updateUserBalance} = useUserContext();
  const [mothertongue, setMothertongue] = useState("");
  const [age, setAge] = useState("");
  const [languagesSpoken, setLanguagesSpoken] = useState("");
  const [cryptoSince, setCryptoSince] = useState("");
  const [telegramSince, setTelegramSince] = useState("");
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isQuestSubmitted, setIsQuestSubmitted] = useState(false);

  const questTitle = "Initial quest";

  const handleSubmit = async () => {
    if (
      !mothertongue.trim() ||
      !age.trim() ||
      !languagesSpoken.trim() ||
      !cryptoSince.trim() ||
      !telegramSince.trim()
    ) {
      alert("Please fill out all the fields.");
      return;
    }

    console.log({
      title: questTitle,
      data: {
        mothertongue,
        age,
        languagesSpoken,
        cryptoSince,
        telegramSince,
      },
    });

    try {
      const response = await fetch(`${backendUrl}/quests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: questTitle,
          points: 1000,
          user_id: user.id,
          data: {
            mothertongue,
            age,
            languagesSpoken,
            cryptoSince,
            telegramSince,
          },
        }),
      });

      if (response.status === 400) {
        alert("Quest already submitted.");
        setIsQuestSubmitted(true);
        return;
      }

      if (!response.ok) {
        throw new Error("Catched an error");
      }

      const result = await response.json();
      console.log("Data successfully submitted:", result);

      // Update the user balance in the context
      updateUserBalance(1000);

      setIsSuccessModalVisible(true);
      setIsQuestSubmitted(true);
    } catch (error) {
      // TODO: Handle error response => have to be enhanced with custom error
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-4xl font-bold mb-4'>{questTitle}</h1>
      <Text className='font-medium mb-4'>
        With this quest we are curious about you
      </Text>
      <Text className='text-7xl mb-4'>🚀</Text>
      <Text className='font-small mb-4'>
        These questions will help creating metadata on the content that you will
        create in the later quests
        <br />
      </Text>
      <div className='grid grid-cols-1 divide-y'>
        <div className='py-4'>
          <label className='mb-2'>Mothertongue:</label>
          <Input
            className='mb-4'
            value={mothertongue}
            onChange={e => setMothertongue(e.target.value)}
            placeholder='Enter your mothertongue'
            disabled={isQuestSubmitted}
          />
        </div>
        <div className='py-4'>
          <label className='mb-2'>Age:</label>
          <Input
            type='number'
            className='mb-4'
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder='Please enter your age'
            disabled={isQuestSubmitted}
          />
        </div>
        <div className='py-4'>
          <label className='mb-2'>Languages Spoken and proficiency:</label>
          <Input
            className='mb-4'
            value={languagesSpoken}
            onChange={e => setLanguagesSpoken(e.target.value)}
            placeholder='Enter languages spoken and proficiency'
            disabled={isQuestSubmitted}
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
            disabled={isQuestSubmitted}
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
            disabled={isQuestSubmitted}
          />
        </div>
      </div>
      <Button
        className='mt-4 mb-16'
        onClick={handleSubmit}
        disabled={isQuestSubmitted}
      >
        {isQuestSubmitted ? "Quest Submitted" : "Submit"}
      </Button>

      {isSuccessModalVisible && (
        <SuccessModalInitialQuest
          onClose={() => setIsSuccessModalVisible(false)}
        />
      )}
    </div>
  );
};

export default Quest01;
