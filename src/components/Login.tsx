import React, {useState, useEffect} from "react";
import {
  Button,
  Checkbox,
  Placeholder,
  PinInput,
  Spinner,
  Title,
} from "@telegram-apps/telegram-ui";
import {useUserContext} from "../utils/utils";
import {loginHandler} from "../utils/api/loginHandler";
import {UserContextProps} from "../components/UserContext";
import BackendError from "../utils/BackendError";
import PhoneNumberInput from "./PhoneNumberInput"; // Import the new component
import {AiOutlineClose} from "react-icons/ai";

interface CustomError extends Error {
  status?: number;
}

interface LoginProps {
  onLoginSuccess: () => void;
  backendUrl: string;
}

const transformChatsToSell = (data: {
  [key: string]: number;
}): Array<{userId: number; userName: string; words: number}> => {
  const unfoldedChats: Array<{
    userId: number;
    userName: string;
    words: number;
  }> = [];

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const keyParts = key.match(/\((\d+), '(.+?)'\)/);
      if (keyParts && keyParts.length === 3) {
        const userId = parseInt(keyParts[1], 10); // Parse id as number
        const userName = keyParts[2];
        const words = data[key];

        unfoldedChats.push({userId, userName, words});
      }
    }
  }

  return unfoldedChats;
};

const Login: React.FC<LoginProps> = ({onLoginSuccess, backendUrl}) => {
  const [phone, setPhone] = useState("");
  const [, setPin] = useState<number[]>([]);
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [pinString, setPinString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPinLoading, setIsPinLoading] = useState(false);
  const [error, setError] = useState<{
    message: string;
    errorCode: number;
  } | null>(null);
  const [isPinInputVisible, setIsPinInputVisible] = useState(true);

  const {user, setUser, setIsLoggedIn} = useUserContext() as UserContextProps;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handlePinChange = (value: number[]) => {
    setPin(value);
    setPinString(value.join(""));
  };

  const sendPhoneNumber = async () => {
    setIsLoading(true);
    try {
      console.log("Sending phone number:", phone);
      console.log("Sending user id:", user.id);
      const response = await fetch(`${backendUrl}/send-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phone,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error message:", errorMessage);
        throw new Error(errorMessage);
      }

      setIsPhoneSubmitted(true);
      setResponseMessage("Verification code sent. Please check your phone.");
      console.log("Verification code sent successfully");
    } catch (error) {
      console.error("Error sending phone number:", error);
      setResponseMessage("Error sending phone number");
      setError({message: "Error sending phone number", errorCode: 400});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const verifyCode = async () => {
      setIsPinLoading(true);
      try {
        console.log("Verifying code:", pinString);
        const chatsToSell = await loginHandler({
          phone: user.auth_status === "auth_code" ? "" : phone,
          pinString,
          backendUrl,
          userId: user.id,
        });

        const chatsToSellUnfolded = transformChatsToSell(chatsToSell);

        setUser(prevUser => ({
          ...prevUser,
          telephoneNumber: phone,
          chatsToSell: chatsToSell,
          chatsToSellUnfolded: chatsToSellUnfolded,
          has_profile: true,
        }));
        setIsLoggedIn(true);
        setResponseMessage("Success");
        onLoginSuccess();
      } catch (error) {
        const customError = error as CustomError;
        setResponseMessage("Error verifying code: " + customError.message);
        setError({
          message: "Error verifying code: " + customError.message,
          errorCode: customError.status || 666,
        });
      } finally {
        setIsPinLoading(false);
      }
    };

    if (pinString.length === 5) {
      verifyCode();
    }
  }, [
    pinString,
    phone,
    backendUrl,
    setUser,
    setIsLoggedIn,
    onLoginSuccess,
    user.id,
    user.auth_status,
  ]);

  return (
    <div
      style={{
        padding: "2px",
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
        position: "relative",
      }}
    >
      {error && (
        <BackendError
          message={error.message}
          errorCode={error.errorCode}
          onClose={() => setError(null)}
          onRedirect={() => setIsPhoneSubmitted(false)}
        />
      )}
      {!isPhoneSubmitted && user.auth_status !== "auth_code" ? (
        <>
          <Placeholder
            description='Log in to check the value of your chats'
            header='Login'
          />
          <PhoneNumberInput phone={phone} onChange={handleInputChange} />
          <Placeholder>
            <div style={{display: "flex", alignItems: "center"}}>
              <Checkbox
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                style={{marginRight: "8px"}}
              />
              <span style={{whiteSpace: "nowrap"}}>
                I agree to the{" "}
                <a
                  href='https://www.chatpay.app/user-agreement.pdf'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  terms and conditions
                </a>
                .
              </span>
            </div>
          </Placeholder>
          <Button
            onClick={sendPhoneNumber}
            size='m'
            disabled={!agreed || isLoading}
          >
            {isLoading ? <Spinner size='s' /> : "Submit"}
          </Button>
        </>
      ) : (
        <>
          {user.auth_status !== "auth_code" && <Placeholder />}
          {isPinInputVisible && (
            <div style={{position: "relative"}}>
              <PinInput
                pinCount={5}
                onChange={handlePinChange}
                label='Enter the code sent to your Telegram'
              />
              <Button
                size='s'
                before={<AiOutlineClose />}
                style={{
                  // position: "absolute",
                  // top: "-10px",
                  // right: "-10px",
                  zIndex: 1,
                  backgroundColor: "red",
                  color: "white",
                }}
                onClick={() => setIsPinInputVisible(false)}
              >
                Close
              </Button>
            </div>
          )}
        </>
      )}
      {isPinLoading && (
        <div className='fixed inset-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50'>
          <div className='text-center w-10/12 max-w-md'>
            <Placeholder
              style={{
                background: "#32A9E0",
                borderRadius: "1rem",
                padding: 24,
              }}
            >
              <img
                alt='ChatPay logo loading'
                src='https://new-vite-frontend.vercel.app/chatpay_loading.gif'
              />
              <Title level='3' weight='3'>
                Loading your chats ...
              </Title>
            </Placeholder>
          </div>
        </div>
      )}
      {responseMessage && <p className='mt-4 text-white'>{responseMessage}</p>}
    </div>
  );
};

export default Login;
