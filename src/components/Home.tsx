import React, {useState, useEffect} from "react";
import {Blockquote, Banner, Text} from "@telegram-apps/telegram-ui";
import OnboadUserB from "./Modals/OnboardUserB";
import {useUserContext} from "../utils/utils";
import {TonConnectUIProvider, TonConnectButton} from "@tonconnect/ui-react";

interface HomeProps {
  setCurrentTab: (tabId: string) => void;
  backendUrl: string;
}

const Home: React.FC<HomeProps> = ({setCurrentTab}) => {
  const {user} = useUserContext();
  const [showOnboardUserB, setShowOnboardUserB] = useState(false);

  const balance = user.words
    ? user.words.reduce((acc, curr) => acc + curr, 0)
    : 0;
  const underReview = 500;

  useEffect(() => {
    if (!user.has_profile && user.chats.length > 0) {
      console.log(
        "User doesn't have a profile but has at least one chat, showing OnboardUserB modal",
      );
      setShowOnboardUserB(true);
    } else if (!user.has_profile && user.chats.length <= 0) {
      console.log(
        "User doesn't have a profile and doesn't have chats, Showing him the OnboardUserN",
      );
      setShowOnboardUserB(true);
    }
  }, [user]);

  //TODO: OnboardUserN should be a component that replace the current Timeline

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
        {/* <Timeline active={4} style={{textAlign: "left"}}>
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
        </Timeline> */}
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
            <div className='flex justify-center overflow-x-auto p-8'>
              <Banner
                description=''
                header='Balance'
                subheader={`${balance} $WORDS`}
                type='inline'
              >
                <React.Fragment key='.0'></React.Fragment>
              </Banner>
            </div>

            <div className='mt-5 flex flex-col items-center'>
              <Banner
                description='Your chats are under review for quality and compliance.'
                header='Under Review'
                subheader={`${underReview} $WORDS`}
                type='inline'
                className='mb-4'
              >
                <React.Fragment key='.0'></React.Fragment>
              </Banner>
              {/* <Button onClick={() => alert("Get more words clicked")}>
            Get More Words
          </Button> */}
            </div>
          </div>
        </TonConnectUIProvider>
      </div>
      {showOnboardUserB && <OnboadUserB onClose={handleOnboardClose} />}
    </div>
  );
};

export default Home;
