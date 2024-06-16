import React, {useState, useEffect} from "react";
import {
  Modal,
  Button,
  Placeholder,
  Textarea,
  Checkbox,
} from "@telegram-apps/telegram-ui";
import SuccessModal from "./SuccessModal";
import {useUserContext} from "../UserContext";

type AgreeSaleProps = {
  //   selectedChats: {id: string; value: number}[];
  selectedChats: {[key: string]: number};
  phoneNumber: string;
  onClose: () => void;
  isVisible: boolean;
};

const AgreeSale: React.FC<AgreeSaleProps> = ({
  selectedChats,
  phoneNumber,
  onClose,
}) => {
  const {user} = useUserContext(); // Get the user context

  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState(
    `Hey, I checked this ChatPay app and we can make some money by selling our chat history...
    We will share the money and the data of the chat will be anonymized (no names, phone numbers...)
It's not for ads 🙅, only to train AI models, so pretty cool 🦾
You got an invite in the link:`,
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const backendUrl = "https://daniilbot-k9qlu.ondigitalocean.app";

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  console.log("PHONE NUMBER", phoneNumber);
  console.log("AgreeSale rendered with selected chats:", selectedChats);
  console.log("AgreeSale rendered with phone number:", phoneNumber);

  const handleSend = async () => {
    console.log("Sending message with chats:", selectedChats);

    const requestBody = {
      chats: selectedChats,
      phone_number: phoneNumber,
      message: message,
      // lead_id_name:
    };

    // Print the request body before sending
    console.log(selectedChats);
    console.log(phoneNumber);
    console.log("Request Body:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch(`${backendUrl}/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error("POST request failed:", response.statusText);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Message sent successfully:", data);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Modal
      header={<Modal.Header>Only iOS header</Modal.Header>}
      trigger={
        <Button size='m' style={{backgroundColor: "red", color: "white"}}>
          Agree Sale
        </Button>
      }
    >
      <div style={{background: "#fff", padding: "20px"}}>
        <Placeholder
          description={`Do you confirm to sell the ${selectedChats.length} selected chats for 324 $WORD? 
          Your friends will receive the following invitation to sell from our app:`}
          header='Please confirm'
        />
        <div style={{width: "100%"}}>
          <div style={{padding: "20px 0", textAlign: "left"}}>
            <div style={{display: "flex", alignItems: "center"}}>
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <span style={{marginLeft: "10px"}}>
                I agree to the{" "}
                <a
                  href='https://example.com/terms'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  terms and conditions
                </a>
              </span>
            </div>
          </div>
          <Textarea
            header='Textarea'
            placeholder='I am usual textarea'
            value={message}
            onChange={handleMessageChange}
            style={{width: "100%", height: "320px"}}
          />
          <div
            style={{
              padding: "20px 0",
              textAlign: "center",
              position: "relative",
            }}
          >
            <Button
              mode='filled'
              size='s'
              disabled={!isChecked}
              style={{position: "absolute", bottom: "10px", right: "10px"}}
              onClick={handleSend}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </Modal>
  );
};

export default AgreeSale;
