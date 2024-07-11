import React from "react";
import {Text, Card} from "@telegram-apps/telegram-ui";
import {TonConnectUIProvider, TonConnectButton} from "@tonconnect/ui-react";
import logo from "../assets/logo_whitebackground.png";
import {useUserContext} from "../utils/utils";

const Home: React.FC = () => {
  const {user} = useUserContext();
  const balance = user.words ? user.words : 0;

  return (
    <div className='flex flex-col p-4'>
      <header className='flex justify-center items-center mb-4'>
        <img src={logo} alt='Logo' className='w-42' />
      </header>
      <h1 className='text-4xl font-bold mb-4 text-center'>
        {user.name ? `Hello, ${user.name}!` : "Heiya!"} 👋
      </h1>
      <Text className='font-medium mb-2 text-center'>
        ChatPay empowers you to sell your Telegram chat data
      </Text>
      <div className='text-2xl mb-4 text-center'>💬 = 💰</div>
      <div className='flex justify-between items-center mb-4'>
        <div className='text-left'>
          Your points Balance is the amount you earn by selling your chat data.
        </div>
        <div className='flex-1 ml-4'>
          <Card type='plain'>
            <React.Fragment key='.0'>
              <Card.Cell readOnly subtitle={`${balance} $WORDS`}>
                {/* Balance */}
              </Card.Cell>
            </React.Fragment>
          </Card>
        </div>
      </div>
      <div className='mt-auto flex justify-center items-center'>
        <TonConnectUIProvider
          manifestUrl='https://yourappurl.com/tonconnect-manifest.json'
          actionsConfiguration={{
            twaReturnUrl: "https://t.me/chatpayapp_bot/chatpayapp",
          }}
        >
          <TonConnectButton className='my-button-class' />
        </TonConnectUIProvider>
      </div>
    </div>
  );
};

export default Home;
