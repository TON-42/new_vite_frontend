import React, {useState} from "react";
import {Modal, Button, Placeholder, Checkbox} from "@telegram-apps/telegram-ui";
// import lastPerson from "./LastPerson";
// import notLastPerson from "./NotLastPerson";

type ConfirmSaleProps = {
  onClose: () => void;
  selectedChats: {userId: number; chatId: number}[];
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
  const [showLastPersonModal, setShowLastPersonModal] = useState(false);
  const [showConfirmSaleModal, setShowConfirmSaleModal] = useState(true);

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
      console.log("add-user-to-agreed response:", response);
      if (response.status === 200) {
        setShowConfirmSaleModal(false);
        setShowLastPersonModal(true);
        console.log("This was the last user to agree: sale successful");
      } else if (response.status === 500) {
        console.error("Server error: 500");
        // } else {
        //   notLastPerson;
        //   console.log("Agreement recorded, but not the last user.");
      } else {
        console.error("Bad request: 400");
      }
    } catch (error) {
      console.error("Error sending agreement:", error);
    }
  };

  return (
    <>
      {showConfirmSaleModal && (
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <Checkbox
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                />
                <span style={{marginLeft: "10px"}}>
                  I agree to the{" "}
                  <a
                    href='https://chatpay.app/terms.pdf'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    terms and conditions
                  </a>
                </span>
              </div>
              <Button
                mode='filled'
                size='m'
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
      )}

      {showLastPersonModal && (
        <Modal
          header={<Modal.Header>Everybody Accepted!</Modal.Header>}
          trigger={null}
          open={true}
        >
          <div style={{background: "#fff", padding: "20px"}}>
            <Placeholder description={`your 324 $WORDS are on the way\n`}>
              <p>
                Hold on tight while we review your chats and confirm the sale.
              </p>
            </Placeholder>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ConfirmSale;
