import React from "react";
import {Placeholder, Button} from "@telegram-apps/telegram-ui";

interface OnboardUserBProps {
  onClose: () => void;
}

const OnboardUserB: React.FC<OnboardUserBProps> = ({onClose}) => {
  return (
    <div className='fixed inset-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50'>
      <div className='text-center w-4/5 max-w-md'>
        <Placeholder
          style={{
            background: "var(--tgui--bg_color)",
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
