import {useState, useRef, forwardRef, useImperativeHandle} from "react";
import {Button} from "@telegram-apps/telegram-ui";
import {useSwipeable} from "react-swipeable";

import moneyMouthFace from "../../assets/TG_animated_emoji/Money_Mouth_Face.webp";
import lockedWithKey from "../../assets/TG_animated_emoji/Locked_With_Key.webp";
import handshake from "../../assets/TG_animated_emoji/Handshake.webp";
import clinkingGlasses from "../../assets/TG_animated_emoji/Clinking_Glasses.webp";
import speechBalloon from "../../assets/TG_animated_emoji/Speech_Balloon.webp";
import logo from "../../assets/logo_whitebackground.png";

interface OnboardUserNProps {
  onClose: () => void;
}

const screens = [
  {
    header: "Welcome to ChatPay!",
    content: "Got chats? Earn from them!",
    image: logo,
  },
  {
    header: "Check chats value",
    content: "Got chats? Earn from them!",
    image: moneyMouthFace,
  },
  {
    header: "Pick chats you want to sell",
    content: "All data is anonymized",
    image: lockedWithKey,
  },
  {
    header: "Wait for friends to accept",
    content: "Everyone has to accept",
    image: handshake,
  },
  {
    header: "Get the money",
    content: "Profits are shared equally",
    image: clinkingGlasses,
  },
  {
    header: "And don't forget",
    content: "Your chats are worth money!",
    image: speechBalloon,
  },
];

const OnboardUserN = forwardRef<HTMLDivElement, OnboardUserNProps>(
  ({onClose}, ref) => {
    const [currentScreen, setCurrentScreen] = useState(0);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => modalRef.current!, [modalRef]);

    const swipeHandlers = useSwipeable({
      onSwipedLeft: () =>
        setCurrentScreen(prev => Math.min(prev + 1, screens.length - 1)),
      onSwipedRight: () => setCurrentScreen(prev => Math.max(prev - 1, 0)),
    });

    const setRefs = (el: HTMLDivElement | null) => {
      modalRef.current = el;
      swipeHandlers.ref(el);
    };

    return (
      <div
        ref={setRefs}
        className='fixed inset-0 flex flex-col'
        style={{background: "var(--tgui--bg_color)"}}
      >
        <div className='flex-grow flex flex-col justify-center items-center p-6'>
          <img
            src={screens[currentScreen].image}
            alt={screens[currentScreen].header}
            className={`${
              screens[currentScreen].image === logo ? "w-58 h-58" : "w-24 h-24"
            } mb-6 object-contain`}
          />
          <div className='text-center mb-8'>
            <h2 className='text-2xl font-bold mb-4'>
              {screens[currentScreen].header}
            </h2>
            <p className='text-lg'>{screens[currentScreen].content}</p>
          </div>
          <div className='flex space-x-2 mb-8'>
            {screens.map((_, index) => (
              <span
                key={index}
                className={`inline-block w-2 h-2 rounded-full ${
                  index === currentScreen ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div className='p-6'>
          <Button
            className='w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold'
            onClick={onClose}
          >
            Skip
          </Button>
        </div>
      </div>
    );
  },
);

OnboardUserN.displayName = "OnboardUserN";

export default OnboardUserN;
