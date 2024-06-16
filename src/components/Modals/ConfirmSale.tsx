import React, {useState} from "react";
import {Modal, Button, Placeholder, Checkbox} from "@telegram-apps/telegram-ui";

type ConfirmSaleProps = {
  onClose: () => void;
  selectedChats: {id: string; value: number}[];
  word: string;
};

const ConfirmSale: React.FC<ConfirmSaleProps> = ({
  onClose,
  selectedChats,
  word,
}) => {
  const [agreed, setAgreed] = useState(false);

  const backendUrl = "https://daniilbot-k9qlu.ondigitalocean.app";

  const sendAgree = async () => {
    try {
      const response = await fetch(`${backendUrl}/add-user-to-agreed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedChats),
      });

      if (response.status === 202) {
        console.log("This was the last user to agree: sale successful");
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
