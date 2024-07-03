import React, {useState, useEffect} from "react";
import {
  Button,
  Input,
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null); // New state for error code

  const {user, setUser, setIsLoggedIn, setCurrentTab} =
    useUserContext() as UserContextProps;

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
        setErrorCode(response.status); // Set the error code
        throw new Error(errorMessage);
      }

      setIsPhoneSubmitted(true);
      setResponseMessage("Verification code sent. Please check your phone.");
      console.log("Verification code sent successfully");
    } catch (err: unknown) {
      console.error("Error sending phone number:", err);
      if (err instanceof Error) {
        setErrorMessage("Error sending phone number: " + err.message);
      } else {
        setErrorMessage(
          "Error sending phone number: An unknown error occurred.",
        );
      }
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
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMessage("Error verifying code: " + err.message);
        } else {
          setErrorMessage("Error verifying code: An unknown error occurred.");
        }
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

  const handleRedirect = () => {
    // Implement your redirect logic here
    console.log("Redirecting...");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      {errorMessage && (
        <BackendError
          message={errorMessage}
          errorCode={errorCode || 0}
          onClose={() => setErrorMessage(null)}
          onRedirect={handleRedirect}
          setCurrentTab={setCurrentTab} // Pass setCurrentTab
        />
      )}
      {!isPhoneSubmitted && user.auth_status !== "auth_code" ? (
        <>
          <Placeholder
            description='Log in to check the value of your chats'
            header='Login'
          />
          <Input
            status='focused'
            header='Phone Number'
            placeholder='Enter your phone number'
            value={phone}
            onChange={handleInputChange}
            type='tel'
          />
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
                  href='https://static1.squarespace.com/static/665b166b65c61d1f819dec7e/t/665c43d3be949513ba28488c/1717322707955/USER+AGREEMENT.pdf'
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
          <PinInput
            pinCount={5}
            onChange={handlePinChange}
            label='Enter the code sent to your Telegram'
          />
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
