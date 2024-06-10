import React from "react";
import { Modal, Button, Placeholder, Input } from "@telegram-apps/telegram-ui";

const LoginModal: React.FC = () => {
  return (
    <Modal
      header={<Modal.Header>Login Required</Modal.Header>}
      trigger={<Button size="m">Open modal</Button>}
    >
      <Placeholder
        description="Please log in to continue"
        header="Login"
      ></Placeholder>
      <Input header="Input" placeholder="Phone number" />
      <Input disabled header="Input" placeholder="code" />
    </Modal>
  );
};

export default LoginModal;
