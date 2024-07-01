import React, {useRef, useEffect, useCallback} from "react";
import {Timeline, Button} from "@telegram-apps/telegram-ui";

interface OnboardUserNProps {
  onClose: () => void;
}

const OnboardUserN: React.FC<OnboardUserNProps> = ({onClose}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
      <div
        ref={modalRef}
        className='p-6 rounded-lg shadow-lg'
        style={{background: "var(--tgui--bg_color)"}}
      >
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
        <Button
          className='bg-blue-500 text-white px-4 py-2 rounded'
          onClick={onClose}
        >
          Got it!
        </Button>
      </div>
    </div>
  );
};

export default OnboardUserN;
