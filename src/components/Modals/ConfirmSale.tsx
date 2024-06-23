import React, {useState} from "react";
import {Modal, Button, Placeholder, Checkbox} from "@telegram-apps/telegram-ui";

type ConfirmSaleProps = {
  onClose: () => void;
  selectedChats: {id: string; value: number}[];
  word: string;
  backendUrl: string;
};

const ConfirmSale: React.FC<ConfirmSaleProps> = ({
  onClose,
  selectedChats,
  word,
  backendUrl,
}) => {
  const [agreed, setAgreed] = useState(false);

  const sendAgree = async () => {
    try {
      const response = await fetch(`${backendUrl}/add-user-to-agreed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedChats),
      });
      console.log("Body:", JSON.stringify(selectedChats));
      console.log("add-user-to-agreed` response:", response);
      if (response.status === 202) {
        console.log("This was the last user to agree: sale successful");
      } else if (response.status === 500) {
        console.error("Server error: 500");
      } else {
        console.log("Agreement recorded, but not the last user.");
      }
    } catch (error) {
      console.error("Error sending agreement:", error);
    }
  };

  return (
    <Modal
      header={<Modal.Header>Confirm Sale</Modal.Header>}
      trigger={null}
      open={true}
    >
      <div style={{background: "#fff", padding: "20px"}}>
        <Placeholder
          description={`Do you confirm to sell the ${selectedChats.length} selected chats for 324 ${word}?`}
          header='Confirm Sale'
        />
        <div style={{padding: "20px 0", textAlign: "center"}}>
          <Checkbox checked={agreed} onChange={() => setAgreed(!agreed)} />
          <Button
            mode='filled'
            size='m'
            style={{marginTop: "20px"}}
            onClick={sendAgree}
            disabled={!agreed}
          >
            Confirm
          </Button>
        </div>
        <div style={{textAlign: "center", marginTop: "20px"}}>
          <Button mode='outline' size='s' onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmSale;
