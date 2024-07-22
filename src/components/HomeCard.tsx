import React from "react";
import {Button} from "@telegram-apps/telegram-ui";

interface CustomCardProps {
  header: string;
  subheader: string;
  iconSrc: string;
  buttonText?: string;
  buttonMode?: "filled" | "outline" | "gray" | "white" | "bezeled" | "plain";
  buttonOnClick?: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({
  header,
  subheader,
  iconSrc,
  buttonText,
  buttonMode = "outline",
  buttonOnClick,
}) => {
  return (
    <div
      className='rounded-xl h-24 flex text-left items-center justify-between p-4'
      style={{
        background: "var(--tgui--secondary_bg_color)",
      }}
    >
      <div className='flex items-center'>
        <span className='w-16 h-16 rounded-xl bg-white/[80%] dark:bg-white/[8%] flex items-center justify-center leading-none'>
          <img src={iconSrc} className='h-8' />
        </span>
        <div className='ml-4'>
          <div className='text-lg font-bold'>{header}</div>
          <div className='text-sm text-gray-500'>{subheader}</div>
        </div>
      </div>
      {buttonText && buttonOnClick && (
        <Button onClick={buttonOnClick} className='ml-auto' mode={buttonMode}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default CustomCard;
