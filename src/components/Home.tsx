import React, {useState, useEffect} from "react";
import {Blockquote, Timeline, Text} from "@telegram-apps/telegram-ui";
import OnboadUserB from "./Modals/OnboardUserB";
import {useUserContext} from "../utils/utils";

interface HomeProps {
  setCurrentTab: (tabId: string) => void;
  backendUrl: string;
}

const Home: React.FC<HomeProps> = ({setCurrentTab}) => {
  const {user} = useUserContext();
  const [showSaleInfo] = useState(false);
  const [showOnboardUserB, setShowOnboardUserB] = useState(false);

  useEffect(() => {
    if (!user.has_profile && user.chats.length > 0) {
      console.log(
        "User doesn't have a profile but has at least one chat, showing OnboardUserB modal",
      );
      setShowOnboardUserB(true);
    }
  }, [user]);

  const handleOnboardClose = () => {
    setShowOnboardUserB(false);
    setCurrentTab("chats");
  };

  return (
    <div className='flex flex-col min-h-screen p-5'>
      <div className='flex-1'>
        <h1 className='text-4xl font-bold mb-8'>
          {user.name ? `Hello, ${user.name}!` : "Heiya!"} 👋
        </h1>
        <Text className='font-medium mb-4 p-4'>
          ChatPay provides users an easy way to earn money from their existing
          Telegram chats by bundling them into AI training datasets.
        </Text>

        <div className='mb-8 p-4'>
          <Blockquote type='text'>🙅 NO personal data is collected.</Blockquote>
        </div>
        <Timeline active={4} style={{textAlign: "left"}}>
          <Timeline.Item header='Check chats value'>
            Your chats are worth money
          </Timeline.Item>
          <Timeline.Item header='Pick chats you want to sell'>
            All data is anonymized
          </Timeline.Item>
          <Timeline.Item header='Wait for friends to accept'>
            Everyone has to accept
          </Timeline.Item>
          <Timeline.Item header='Get the money'>
            Profits are shared equally
          </Timeline.Item>
        </Timeline>
        {showSaleInfo && <p> SaleInfo</p>}
      </div>
      {showOnboardUserB && <OnboadUserB onClose={handleOnboardClose} />}
    </div>
  );
};

export default Home;
