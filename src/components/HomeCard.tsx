import React from "react";
import {Button} from "@telegram-apps/telegram-ui";

interface CustomCardProps {
  header: string;
  subheader: string;
  iconSrc: string;
  buttonText?: string;
  buttonMode?: "filled" | "outline" | "gray" | "white" | "bezeled" | "plain";
  buttonOnClick?: () => void;
  isActive?: boolean;
}

const CustomCard: React.FC<CustomCardProps> = ({
  header,
  subheader,
  iconSrc,
  buttonText,
  buttonMode = "outline",
  buttonOnClick,
  isActive = true,
}) => {
  return (
    <div
      className={`rounded-xl h-24 flex text-left items-center justify-between p-4 ${isActive ? "" : "opacity-50"}`}
      style={{
        background: "var(--tgui--secondary_bg_color)",
      }}
    >
      <div className='flex items-center'>
        <span className='w-16 h-16 rounded-xl bg-white/[80%] dark:bg-white/[8%] flex items-center justify-center leading-none'>
          <img src={iconSrc} className='h-8' />
        </span>
        <div className='ml-4 flex-grow'>
          <div className='text-lg font-bold'>{header}</div>
          <div className='text-sm text-gray-500'>{subheader}</div>
        </div>
      </div>
      {buttonText && buttonOnClick && (
        <div className='flex-shrink-0 ml-4'>
          <Button
            onClick={buttonOnClick}
            mode={buttonMode}
            disabled={!isActive}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomCard;
