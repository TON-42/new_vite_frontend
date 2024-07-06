import {useState, useRef, useEffect, useCallback, FC} from "react";
import {Button} from "@telegram-apps/telegram-ui";
import duckHello from "@/assets/stickers/duck_hello.tgs";
import durovImage from "@/assets/img/durov.webp";
import duckLove from "@/assets/stickers/duck_love.tgs";
import duckSpy from "@/assets/stickers/duck_spy.tgs";
import spongebobVideo from "@/assets/videos/spongebob.mp4";
import spongebobPoster from "@/assets/img/spongebob_poster.webp";
import duckJuggling from "@/assets/stickers/duck_juggling.tgs";
import guideIcon from "@/assets/icons/guide.svg";
import trackIcon from "@/assets/icons/track.svg";
import timeIcon from "@/assets/icons/time.svg";
import duckXray from "@/assets/stickers/duck_xray.tgs";
import duckCool from "@/assets/stickers/duck_cool.tgs";
import duckKnife from "@/assets/stickers/duck_knife.tgs";

interface OnboardUserNProps {
  onClose: () => void;
}

interface Media {
  type: string;
  src: string;
  size?: number;
  style?: string;
  poster?: string;
}

interface ListItem {
  media?: {
    type: string;
    src: string;
    size: number;
  };
  text: string;
}

interface FormItem {
  id: string;
  placeholder: string;
  type: string;
}

interface Slide {
  media: Media;
  shape: string;
  pagination: string;
  title: string;
  description: string;
  button: string | {content: string; to: string};
  list?: Array<string | ListItem>;
  form?: Array<FormItem>;
  textAlign?: string;
}

const slides: Slide[] = [
  {
    media: {
      type: "sticker",
      src: duckHello,
      size: 250,
    },
    shape: "square",
    pagination: "count",
    title: "Welcome to Telegram Onboarding Kit",
    description:
      "Create stunning onboarding and paywall for your Telegram Bot using the full power of Mini Apps<br><br>It's <b>simple</b>, <b>fast</b>, highly <b>customizable</b> and <a href='https://github.com/Easterok/telegram-onboarding-kit' target='_blank'>open-source</a>!",
    button: "Next",
  },
  {
    media: {
      type: "image",
      src: durovImage,
    },
    shape: "rounded",
    pagination: "count",
    title: "Onboarding supports many types of content",
    description:
      "Here you can see <b>Image</b>. But it's just the beginning...",
    button: "Next",
  },
  {
    media: {
      type: "sticker",
      src: duckLove,
      size: 250,
    },
    shape: "square",
    pagination: "count",
    title: "Telegram stickers",
    description:
      "Just download any <b>.tgs</b> sticker from Telegram and use it in your onboardings",
    button: "Next",
  },
  {
    media: {
      type: "sticker",
      src: duckSpy,
      size: 150,
    },
    shape: "square",
    pagination: "count",
    title: "Forms",
    description: "User fills in the form – the bot receives the data",
    form: [
      {
        id: "text_from_form",
        placeholder: "Text input",
        type: "text",
      },
      {
        id: "number_from_form",
        placeholder: "Number input",
        type: "number",
      },
      {
        id: "checkbox_from_form",
        placeholder: "Checkbox",
        type: "checkbox",
      },
    ],
    button: "Next",
  },
  {
    media: {
      type: "video",
      src: spongebobVideo,
      poster: spongebobPoster,
      style: "aspect-ratio: 400/287",
    },
    shape: "rounded",
    pagination: "count",
    title: "Videos",
    description:
      "Typically, video starts <b>automatically</b><br><br>However, on iOS, it will only autoplay upon any prior tap on the page ('Next' button doesn't count). If video doesn't autoplay, user will see preview and pretty animation, inviting them to tap to play the video",
    button: "Next",
  },
  {
    media: {
      type: "sticker",
      src: duckJuggling,
      size: 150,
    },
    shape: "square",
    pagination: "count",
    title: "Lists",
    description:
      "Lists can be used to showcase <b>features</b> of your product. Items support customizable icons",
    list: [
      {
        media: {
          type: "icon",
          src: guideIcon,
          size: 30,
        },
        text: "Some cool feature",
      },
      {
        media: {
          type: "icon",
          src: trackIcon,
          size: 30,
        },
        text: "Some very cool feature",
      },
      {
        media: {
          type: "icon",
          src: timeIcon,
          size: 30,
        },
        text: "Some extremely cool feature",
      },
    ],
    button: "Next",
  },
  {
    media: {
      type: "sticker",
      src: duckXray,
      size: 250,
    },
    shape: "square",
    pagination: "count",
    title: "Everything is customizable",
    description: "",
    textAlign: "center",
    list: [
      "<b>CSS styles</b>: extend primary colors from Telegram or set yours",
      "Button text and actions (look down)",
      "Use our carefully crafted <b>presets</b> or easily create your own",
    ],
    button: "Super-Duper Next",
  },
  {
    media: {
      type: "sticker",
      src: duckCool,
      size: 150,
    },
    shape: "square",
    pagination: "count",
    title: "Some other features:",
    description: "",
    list: [
      "One-click 0$ <b>deploy</b> on GitHub Pages",
      "Language and currency localization",
      "Buttons with <b>haptic</b> feedback",
      "Content pre-loading for high speed",
      "<b>Low-code</b> approach to building onboardings",
      "Many examples/presets",
      "And many more... (see <a href='https://github.com/Easterok/telegram-onboarding-kit' target='_blank'>GitHub</a>)",
    ],
    button: "Next",
  },
  {
    media: {
      type: "sticker",
      src: duckKnife,
      size: 250,
    },
    shape: "square",
    pagination: "count",
    textAlign: "center",
    title: "But onboarding slides are not enough...",
    description: "Let's go to Paywall",
    button: {
      content: "Go to Paywall",
      to: "/paywall",
    },
  },
];

const OnboardUserN: FC<OnboardUserNProps> = ({onClose}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const renderSlide = (slide: Slide) => {
    return (
      <div className='slide'>
        {slide.media.type === "sticker" && (
          <img src={slide.media.src} alt='' style={{width: slide.media.size}} />
        )}
        {slide.media.type === "image" && (
          <img
            src={slide.media.src}
            alt=''
            style={{borderRadius: slide.shape === "rounded" ? "10px" : "0"}}
          />
        )}
        {slide.media.type === "video" && (
          <video
            src={slide.media.src}
            poster={slide.media.poster}
            style={{aspectRatio: slide.media.style}}
            controls
          />
        )}
        <h2>{slide.title}</h2>
        <p dangerouslySetInnerHTML={{__html: slide.description}}></p>
        {slide.list && (
          <ul>
            {slide.list.map((item, index) => (
              <li key={index}>{typeof item === "string" ? item : item.text}</li>
            ))}
          </ul>
        )}
        {slide.form && (
          <form>
            {slide.form.map(field => (
              <div key={field.id}>
                {field.type === "text" && (
                  <input type='text' placeholder={field.placeholder} />
                )}
                {field.type === "number" && (
                  <input type='number' placeholder={field.placeholder} />
                )}
                {field.type === "checkbox" && (
                  <label>
                    <input type='checkbox' />
                    {field.placeholder}
                  </label>
                )}
              </div>
            ))}
          </form>
        )}
        <Button onClick={handleNextSlide}>
          {typeof slide.button === "string"
            ? slide.button
            : slide.button.content}
        </Button>
      </div>
    );
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
      <div
        ref={modalRef}
        className='p-6 rounded-lg shadow-lg'
        style={{background: "var(--tgui--bg_color)"}}
      >
        {renderSlide(slides[currentSlide])}
      </div>
    </div>
  );
};

export default OnboardUserN;
