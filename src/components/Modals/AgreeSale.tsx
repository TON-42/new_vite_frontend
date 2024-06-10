// components/Modals/AgreeSale.tsx
import React, { useState } from "react";
import {
  Modal,
  Button,
  Placeholder,
  List,
  Textarea,
  Checkbox,
} from "@telegram-apps/telegram-ui";

const AgreeSale = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Modal
      header={<Modal.Header>Only iOS header</Modal.Header>}
      trigger={
        <Button size="m" style={{ backgroundColor: "red", color: "white" }}>
          Agree Sale
        </Button>
      }
    >
      <div style={{ background: "#fff", padding: "20px" }}>
        <Placeholder
          description="Do you confirm to sell the X selected chats for 324 $WORD?
          Your friends will receive the following invitation to sell from our app:"
          header="Please confirm"
        >
          {/* Optional image if needed
          <img
            alt="Telegram sticker"
            src="https://xelene.me/telegram.gif"
            style={{
              display: "block",
              height: "144px",
              width: "144px",
            }}
          /> */}
        </Placeholder>
        <div style={{ width: "100%" }}>
          <div style={{ padding: "20px 0", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                defaultChecked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span style={{ marginLeft: "10px" }}>
                I agree to the{" "}
                <a
                  href="https://example.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms and conditions
                </a>
              </span>
            </div>
          </div>
          <Textarea
            header="Textarea"
            placeholder="I am usual textarea"
            defaultValue="{User A} is inviting you to sell the history of the chat {Chat name}.
            If you agree to selling the history of the chat, each of the chat participants will receive: 💸100 $WORD tokens ~ 20 USD 🤑
            The data of the chat history will be anonymized and stripped from all personal
            identifiers, passwords, names, phone numbers and payment details 🙅The chat history will NOT be used for targeted advertisement. The chat history will be used to train AI chatbots and make them sound more human-like. Please click the link below to accept the sale:"
            style={{ width: "100%", height: "320px" }}
          />
          <div
            style={{
              padding: "20px 0",
              textAlign: "center",
              position: "relative",
            }}
          >
            <Button
              mode="filled"
              size="s"
              disabled={!isChecked}
              style={{ position: "absolute", bottom: "10px", right: "10px" }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AgreeSale;
