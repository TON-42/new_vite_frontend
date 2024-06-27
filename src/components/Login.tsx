import React, {useState, useEffect} from "react";
import {
  Button,
  Input,
  Checkbox,
  Placeholder,
  PinInput,
} from "@telegram-apps/telegram-ui";
import {useUserContext} from "../utils/utils";
import {loginHandler} from "../utils/api/loginHandler";
import {UserContextProps} from "../components/UserContext";

interface LoginProps {
  onLoginSuccess: () => void;
  backendUrl: string;
}

const Login: React.FC<LoginProps> = ({onLoginSuccess, backendUrl}) => {
  const [phone, setPhone] = useState("");
  const [, setPin] = useState<number[]>([]);
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [pinString, setPinString] = useState("");

  const {user, setUser, setIsLoggedIn} = useUserContext() as UserContextProps;
  console.log("User:", user);

  // This should be placed in a different file maybe Home.tsx and should use useUserContext instead of getUserDataFromBackend
  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     if (user.id) {
  //       const data = await getUserDataFromBackend(user.id, user.name || "");
  //       if (data.auth_status === "sent_code") {
  //         setIsPhoneSubmitted(true);
  //         setPhone(data.telephoneNumber || "");
  //       }
  //     }
  //   };

  //   checkAuthStatus();
  // }, [user.id, user.name]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handlePinChange = (value: number[]) => {
    setPin(value);
    setPinString(value.join(""));
  };

  const sendPhoneNumber = async () => {
    try {
      console.log("Sending phone number:", phone);
      const response = await fetch(`${backendUrl}/send-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phone,
          user_id: user.id,
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
    }
  };

  useEffect(() => {
    const verifyCode = async () => {
      try {
        console.log("Verifying code:", pinString);
        const chats = await loginHandler({
          phone,
          pinString,
          backendUrl,
        });

        setUser(prevUser => ({
          ...prevUser,
          telephoneNumber: phone,
          chats,
          has_profile: true,
        }));
        setIsLoggedIn(true);
        setResponseMessage("Success");
        onLoginSuccess();
      } catch (error) {
        setResponseMessage("Error verifying code: " + error);
      }
    };

    if (pinString.length === 5) {
      verifyCode();
    }
  }, [pinString, phone, backendUrl, setUser, setIsLoggedIn, onLoginSuccess]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      {!isPhoneSubmitted ? (
        <>
          <Placeholder description='Please log in to continue' header='Login' />
          <Input
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
          <Button onClick={sendPhoneNumber} size='m' disabled={!agreed}>
            Submit
          </Button>
        </>
      ) : (
        <>
          <Placeholder
            description='Enter the code sent to your phone'
            header='Verification Code'
          />
          <PinInput pinCount={5} onChange={handlePinChange} />
        </>
      )}
      {responseMessage && <p className='mt-4 text-white'>{responseMessage}</p>}
    </div>
  );
};

export default Login;
