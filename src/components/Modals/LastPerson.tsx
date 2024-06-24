import {Modal, Placeholder} from "@telegram-apps/telegram-ui";

const lastPerson = () => {
  return (
    <Modal
      header={<Modal.Header>Everybody Accepted!</Modal.Header>}
      trigger={null}
      open={true}
    >
      <div style={{background: "#fff", padding: "100px"}}>
        <Placeholder description={`your 324 $WORDS are on the way\n`}>
          <p>Hold on tight while we review your chats and confirm the sale.</p>
        </Placeholder>
      </div>
    </Modal>
  );
};

export default lastPerson;
