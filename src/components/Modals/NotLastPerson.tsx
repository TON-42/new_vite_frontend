import {Modal, Placeholder} from "@telegram-apps/telegram-ui";

const notLastPerson = () => {
  return (
    <Modal
      header={<Modal.Header>Waiting for everybody to accept</Modal.Header>}
      trigger={null}
      open={true}
    >
      <div style={{background: "#fff", padding: "20px"}}>
        <Placeholder
          description={`Some of your friends haven't confirmed the sale yet\n`}
          header='Confirm Sale'
        ></Placeholder>
      </div>
    </Modal>
  );
};

export default notLastPerson;
