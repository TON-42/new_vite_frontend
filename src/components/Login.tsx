import React, { useState, useEffect } from "react";
import { Button, Input, Checkbox, Placeholder, PinInput } from "@telegram-apps/telegram-ui";
import { useUserContext } from "./UserContext"; // Import the custom hook

interface LoginProps {
  onLoginSuccess: () => void;
  backendUrl: string;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, backendUrl }) => {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState<number[]>([]);
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [pinString, setPinString] = useState("");

  const { user, setUser } = useUserContext(); // Use the context

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
        body: JSON.stringify({ phone_number: phone }),
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

      const chats = await response.json();
      console.log(chats);
      setResponseMessage(chats.message || "Success");

      // Print user chats before setting
      console.log("User chats before setting:", user);

      // Set user chats in the context
      setUser((prevUser) => ({
        ...prevUser,
        telephoneNumber: phone,
        chats,
      }));

      // Print user chats after setting
      console.log("User chats after setting:", {
        ...user,
        telephoneNumber: phone,
        ...chats.user,
      });

      onLoginSuccess();
    } catch (error) {
      console.error("Error verifying code:", error);
      setResponseMessage("Error verifying code");
    }
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
          <Placeholder description="Please log in to continue" header="Login" />
          <Input
            header="Phone Number"
            placeholder="Enter your phone number"
            value={phone}
            onChange={handleInputChange}
          />
          <Placeholder>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox checked={agreed} onChange={() => setAgreed(!agreed)} />
              <span>
                I agree to the{" "}
                <a
                  href="https://static1.squarespace.com/static/665b166b65c61d1f819dec7e/t/665c43d3be949513ba28488c/1717322707955/USER+AGREEMENT.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms and conditions
                </a>
                .
              </span>
            </div>
          </Placeholder>
          <Button onClick={sendPhoneNumber} size="m" disabled={!agreed}>
            Submit
          </Button>
        </>
      ) : (
        <>
          <Placeholder description="Enter the code sent to your phone" header="Verification Code" />
          <PinInput pinCount={5} onChange={handlePinChange} />
        </>
      )}
      {responseMessage && <p className="mt-4 text-white">{responseMessage}</p>}
    </div>
  );
};

export default Login;
