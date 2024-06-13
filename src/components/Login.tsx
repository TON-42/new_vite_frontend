import React, {useState, useEffect} from "react";
import {
  Button,
  Input,
  Checkbox,
  Placeholder,
  PinInput,
} from "@telegram-apps/telegram-ui";
import {useUserContext} from "./UserContext"; // Import the custom hook

interface Chat {
  lead_id: number;
  agreed_users: number[];
  name: string;
  id: string;
  status: string;
  words: number;
  users: User[];
}

interface User {
  // Define the User interface as needed
}

interface LoginProps {
  onLoginSuccess: () => void;
  backendUrl: string;
}

const Login: React.FC<LoginProps> = ({onLoginSuccess, backendUrl}) => {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState<number[]>([]);
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [pinString, setPinString] = useState("");

  const {user, setUser} = useUserContext(); // Use the context

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handlePinChange = (value: number[]) => {
    setPin(value);
    setPinString(value.join("")); // Update the pinString whenever pin changes
  };

  useEffect(() => {
    if (pinString.length === 5) {
      verifyCode();
    }
  }, [pinString]);

  const sendPhoneNumber = async () => {
    try {
      console.log("Sending phone number:", phone);
      const response = await fetch(`${backendUrl}/send-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({phone_number: phone}),
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

  const verifyCode = async () => {
    try {
      console.log("Verifying code:", pinString);
      const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phone,
          code: pinString,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error message:", errorMessage);
        throw new Error(errorMessage);
      }

      const responseData = await response.json(); // Get the response data
      const chats = responseData;
      console.log(chats);
      setResponseMessage("Success");

      // Print user chats before setting
      console.log("User (context) chats before setting:", user);

      // Format the chats
      const formattedChats = transformData(chats);

      // Set user chats in the context
      setUser(prevUser => ({
        ...prevUser,
        telephoneNumber: phone,
        chats: formattedChats,
        // isLoggedIn: true,
      }));

      onLoginSuccess();
    } catch (error) {
      console.error("Error verifying code:", error);
      setResponseMessage("Error verifying code");
    }
  };

  const transformData = (data: {[key: string]: number}): Chat[] => {
    const chats: Chat[] = [];

    // Iterate over the data entries
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // Extract the userId and userName from the key
        const keyParts = key.match(/\((\d+), '(.+?)'\)/);
        if (keyParts && keyParts.length === 3) {
          const userId = keyParts[1];
          const userName = keyParts[2];
          const words = data[key];

          // Create a Chat object and add it to the array
          chats.push({
            id: userId,
            name: userName,
            words,
            lead_id: 0, // Default or modify as needed
            agreed_users: [], // Default or modify as needed
            status: "", // Default or modify as needed
            users: [], // Default or modify as needed
          });
        }
      }
    }

    return chats;
  };

  const handleDebugLogin = () => {
    const hardcodedPhone = "0048537606403"; // Hardcoded phone number
    const hardcodedChats = {
      "(5358771958, 'Leo _HARDCODED_42')": 2027,
      "(5892003906, 'Daniel _HARDCODED_Gomez')": 120,
      "(645255241, 'Mihail _HARDCODED_42 Rizhakov')": 179,
      "(7474252077, 'ChatPay _HARDCODED_')": 1,
      "(7024590670, 'GLEAM _HARDCODED_')": 13,
      "(7263142058, 'ChatPa _HARDCODED_y')": 3,
      "(93372553, 'BotFathe _HARDCODED_r')": 761,
    };

    const formattedChats = transformData(hardcodedChats);

    setUser(prevUser => ({
      ...prevUser,
      telephoneNumber: hardcodedPhone,
      chats: formattedChats,
    }));

    onLoginSuccess();
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
      {!isPhoneSubmitted ? (
        <>
          <Placeholder description='Please log in to continue' header='Login' />
          <Input
            header='Phone Number'
            placeholder='Enter your phone number'
            value={phone}
            onChange={handleInputChange}
          />
          <Placeholder>
            <div style={{display: "flex", alignItems: "center"}}>
              <Checkbox checked={agreed} onChange={() => setAgreed(!agreed)} />
              <span>
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
          <Button
            onClick={handleDebugLogin}
            size='m'
            style={{marginTop: "10px"}}
          >
            Debug Login
          </Button>
        </>
      ) : (
        <>
          <Placeholder
            description='Enter the code sent to your phone'
            header='Verification Code'
          />
          <PinInput pinCount={5} onChange={handlePinChange} />
          <Button
            onClick={handleDebugLogin}
            size='m'
            style={{marginTop: "10px"}}
          >
            Debug Login
          </Button>
        </>
      )}
      {responseMessage && <p className='mt-4 text-white'>{responseMessage}</p>}
    </div>
  );
};

export default Login;
