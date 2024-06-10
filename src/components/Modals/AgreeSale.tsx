// components/Modals/AgreeSale.tsx
import React from "react";
import { Modal, Button, Placeholder } from "@telegram-apps/telegram-ui";

const AgreeSale = () => {
  return (
    <Modal
      header={<Modal.Header>Only iOS header</Modal.Header>}
      trigger={
        <Button size="m" style={{ backgroundColor: "red", color: "white" }}>
          Agree Sale
        </Button>
      }
    >
      <Placeholder description="Description" header="Title">
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{
            display: "block",
            height: "144px",
            width: "144px",
          }}
        />
      </Placeholder>
    </Modal>
  );
};

export default AgreeSale;
