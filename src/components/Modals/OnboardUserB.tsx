import React from "react";
import {Placeholder, Button} from "@telegram-apps/telegram-ui";

interface OnboardUserBProps {
  onClose: () => void;
}

const OnboardUserB: React.FC<OnboardUserBProps> = ({onClose}) => {
  return (
    <div
      className='fixed inset-0 w-full h-full bg-gray-400 dark:bg-black bg-opacity-80 flex justify-center items-center z-50'
      onClick={onClose}
    >
      <div className='text-center w-4/5 max-w-md'>
        <Placeholder
          style={{
            background: "var(--tgui--secondary_bg_color)",
            borderRadius: "1rem",
          }}
          action={
            <Button size='l' mode='filled' onClick={onClose} stretched>
              Go to chats
            </Button>
          }
          description='You got invited to sell your chats, checkout who invited you and how much you can earn.'
          header='Welcome to ChatPay!'
        ></Placeholder>
      </div>
    </div>
  );
};

export default OnboardUserB;
