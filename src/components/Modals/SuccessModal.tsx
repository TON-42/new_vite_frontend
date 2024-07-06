import React from "react";
import {Modal, Button, Placeholder} from "@telegram-apps/telegram-ui";

type SuccessModalProps = {
  onClose: () => void;
};

const SuccessModal: React.FC<SuccessModalProps> = ({onClose}) => {
  return (
    <Modal
      header={<Modal.Header>Success</Modal.Header>}
      open={true}
      onOpenChange={onClose}
    >
      <Placeholder
        description='Your message has been sent successfully.'
        header='Success'
      />
      <div
        style={{
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <Button
          mode='filled'
          size='s'
          style={{marginTop: "20px"}}
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
