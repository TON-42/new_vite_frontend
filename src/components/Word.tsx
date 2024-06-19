import React from "react";
import {Banner, Text, Button} from "@telegram-apps/telegram-ui";
import {useUserContext} from "../utils/utils";
import {TonConnectUIProvider} from "@tonconnect/ui-react";

const Word: React.FC = () => {
  const {user} = useUserContext();

  // Assuming user.words is the balance
  const balance = user.words
    ? user.words.reduce((acc, curr) => acc + curr, 0)
    : 0;
  const underReview = 500; // This value should come from the context or a calculation

  return (
    <TonConnectUIProvider
      manifestUrl='https://yourappurl.com/tonconnect-manifest.json'
      actionsConfiguration={{
        twaReturnUrl: "https://t.me/chatpayapp_bot/chatpayapp",
      }}
    >
      <div className='p-5'>
        <header className='flex-1 mb-8'>
          <h1 className='text-4xl font-bold'>Balance</h1>
          {/* <TonConnectButton
            className='my-button-class'
            style={{float: "right"}}
          /> */}
        </header>
        <Text className='font-medium mb-4 p-4'>
          Your balance is the amount of $WORDS you have earned by selling your
          chats.
        </Text>
        <div className='flex justify-center overflow-x-auto'>
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
          <Button onClick={() => alert("Get more words clicked")}>
            Get More Words
          </Button>
        </div>
      </div>
    </TonConnectUIProvider>
  );
};

export default Word;
