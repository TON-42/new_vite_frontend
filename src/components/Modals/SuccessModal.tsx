import React from "react";
import {Modal, Button, Placeholder} from "@telegram-apps/telegram-ui";

type SuccessModalProps = {
  onClose: () => void;
};

const SuccessModal: React.FC<SuccessModalProps> = ({onClose}) => {
  return (
    <Modal open={true} onOpenChange={onClose}>
      <Placeholder
        description='Your message has been sent successfully. Keep track of your chat in my summary'
        header='Success'
      />
      <div
        style={{
          padding: "0 0 20px 0",
          textAlign: "center",
        }}
      >
        <Button mode='filled' size='s' onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
