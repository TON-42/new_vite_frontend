import React, {useState, useEffect, useCallback, useRef} from "react";
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
import {UserContextProps} from "../types/types";
import BackendError from "./BackendError";
import {CustomError} from "../types/types";
import PhoneNumberInput from "./PhoneNumberInput";

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
        const userId = parseInt(keyParts[1], 10);
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
  const [twoFACode, setTwoFACode] = useState("");
  const [isTwoFARequired, setIsTwoFARequired] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(true);

  const {user, setUser, setIsLoggedIn} = useUserContext() as UserContextProps;

  const pinStringRef = useRef(pinString);
  useEffect(() => {
    pinStringRef.current = pinString;
  }, [pinString]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handlePinChange = (value: number[]) => {
    setPinString(value.join(""));
  };

  const handleTwoFAInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTwoFACode(event.target.value);
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

      setIsPinModalOpen(true);

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error message:", errorMessage);
        throw new Error(errorMessage);
      }

      setIsPhoneSubmitted(true);
      setResponseMessage("Loading your chats ...");
      console.log("Verification code sent successfully");
    } catch (error) {
      console.error("Error sending phone number:", error);
      setResponseMessage("Error sending phone number");
      setError({message: "Error sending phone number", errorCode: 400});
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPinCode = useCallback(async () => {
    setIsPinLoading(true);
    try {
      const chatsToSell = await loginHandler({
        phone: user.auth_status === "auth_code" ? "" : phone,
        pinString: pinStringRef.current,
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
      setIsPinModalOpen(false);
      onLoginSuccess();
    } catch (error) {
      const customError = error as CustomError;
      if (customError.status === 401) {
        setIsTwoFARequired(true);
        setResponseMessage("With 2FA you need to enter your password");
      } else {
        setResponseMessage("Error verifying code: " + customError.message);
        setError({
          message: "Error verifying code: " + customError.message,
          errorCode: customError.status || 666,
        });
        setIsPinModalOpen(false);
      }
    } finally {
      setIsPinLoading(false);
    }
  }, [
    phone,
    backendUrl,
    user.id,
    user.auth_status,
    setUser,
    setIsLoggedIn,
    onLoginSuccess,
  ]);

  const verifyTwoFACode = async () => {
    setIsPinLoading(true);
    try {
      const chatsToSell = await loginHandler({
        phone: user.auth_status === "auth_code" ? "" : phone,
        pinString: pinStringRef.current,
        backendUrl,
        userId: user.id,
        twoFACode: twoFACode,
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
      setIsPinModalOpen(false);
      onLoginSuccess();
    } catch (error) {
      const customError = error as CustomError;
      setResponseMessage("Error verifying code: " + customError.message);
      setError({
        message: "Error verifying code: " + customError.message,
        errorCode: customError.status || 666,
      });
      setIsPinModalOpen(false);
    } finally {
      setIsPinLoading(false);
    }
  };

  useEffect(() => {
    if (pinString.length === 5) {
      verifyPinCode();
      setIsPinModalOpen(false);
    }
  }, [pinString, verifyPinCode]);

  useEffect(() => {
    if (user.auth_status === "auth_code") {
      setIsPinModalOpen(true);
    }
  }, [user.auth_status]);

  return (
    <div
      style={{
        padding: "2px",
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
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
          <div className='flex text-left py-6 pl-2 items-center'>
            <Checkbox checked={agreed} onChange={() => setAgreed(!agreed)} />
            <span className='whitespace-nowrap ml-1'>
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
          {isPinModalOpen ? (
            <>
              <Placeholder />
              <PinInput
                style={{zIndex: "45"}}
                pinCount={5}
                onChange={handlePinChange}
                label='Enter the code sent to your Telegram'
              />
            </>
          ) : null}
          {isTwoFARequired && (
            <>
              <Placeholder />
              <div className='flex flex-col items-center space-y-2 z-40'>
                <input
                  type='password'
                  value={twoFACode}
                  onChange={handleTwoFAInputChange}
                  placeholder='Enter your 2FA password'
                  className='p-2 border rounded w-64'
                />
                <Button
                  onClick={verifyTwoFACode}
                  size='s'
                  disabled={!twoFACode || isPinLoading}
                  className='p-1 bg-blue-500 text-white rounded text-xs disabled:bg-gray-400 w-28'
                >
                  {isPinLoading ? <Spinner size='s' /> : "Login"}
                </Button>
              </div>
            </>
          )}
        </>
      )}
      {isPinLoading && (
        <div className='fixed inset-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-40'>
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
