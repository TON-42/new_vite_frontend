import React, {useState, useEffect} from "react";
import {Blockquote, Text, Card} from "@telegram-apps/telegram-ui";
import OnboardUserB from "./Modals/OnboardUserB";
import OnboardUserN from "./Modals/OnboardUserN";
import {useUserContext} from "../utils/utils";
import {TonConnectUIProvider, TonConnectButton} from "@tonconnect/ui-react";

interface HomeProps {
  setCurrentTab: (tabId: string) => void;
  backendUrl: string;
}

const Home: React.FC<HomeProps> = ({setCurrentTab}) => {
  const {user} = useUserContext();
  const [showOnboardUserB, setShowOnboardUserB] = useState(false);
  const [showOnboardUserN, setShowOnboardUserN] = useState(false);

  const balance = user.words ? user.words : 0;

  useEffect(() => {
    if (!user.has_profile && user.chats.length > 0) {
      console.log(
        "User doesn't have a profile but has at least one chat, showing OnboardUserB modal",
      );
      setShowOnboardUserB(true);
    } else if (!user.has_profile && user.chats.length <= 0) {
      const onboardUserNSeen = localStorage.getItem("onboardUserNSeen");
      if (!onboardUserNSeen) {
        console.log(
          "User doesn't have a profile and doesn't have chats, showing OnboardUserN modal",
        );
        setShowOnboardUserN(true);
        localStorage.setItem("onboardUserNSeen", "true");
      }
    }
  }, [user]);

  const handleOnboardClose = () => {
    setShowOnboardUserB(false);
    setShowOnboardUserN(false);
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
        <div className='mb-8 p-4'></div>
        <TonConnectUIProvider
          manifestUrl='https://yourappurl.com/tonconnect-manifest.json'
          actionsConfiguration={{
            twaReturnUrl: "https://t.me/chatpayapp_bot/chatpayapp",
          }}
        >
          <div className='p-5'>
            <header className='flex justify-between items-center mb-8'>
              <h1 className='text-4xl font-bold'>Balance</h1>
              <TonConnectButton
                className='my-button-class'
                style={{float: "right"}}
              />
            </header>
            <Text className='font-medium mb-4'>
              Your balance is the amount of $WORDS you have earned by selling
              your chats.
            </Text>
            <div className='justify-center p-8'>
              <Card type='plain'>
                <React.Fragment key='.0'>
                  <Card.Cell readOnly subtitle={`${balance} $WORDS`}>
                    {/* Balance */}
                  </Card.Cell>
                </React.Fragment>
              </Card>
            </div>
          </div>
        </TonConnectUIProvider>
      </div>
      {showOnboardUserB && <OnboardUserB onClose={handleOnboardClose} />}
      {showOnboardUserN && <OnboardUserN onClose={handleOnboardClose} />}
    </div>
  );
};

export default Home;
