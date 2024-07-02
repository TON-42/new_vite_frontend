import React, {useState} from "react";
import {
  Modal,
  Button,
  Placeholder,
  Textarea,
  Checkbox,
} from "@telegram-apps/telegram-ui";
import SuccessModal from "./SuccessModal";
import {sendMessageHandler} from "../../utils/api/sendMessageHandler";

type AgreeSaleProps = {
  selectedChats: {[key: string]: number};
  phoneNumber: string;
  onClose: () => void;
  isVisible: boolean;
  backendUrl: string;
};

const AgreeSale: React.FC<AgreeSaleProps> = ({
  selectedChats,
  phoneNumber,
  backendUrl,
}) => {
  const defautlMessage = `Hey, I checked this ChatPay app and we can make some money by selling our chat history...
  We will share the money and the data of the chat will be anonymized (no names, phone numbers...)
  It's not for ads 🙅, only to train AI models, so pretty cool 🦾
  You got an invite in the link:`;
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState(defautlMessage);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  console.log("PHONE NUMBER", phoneNumber);
  console.log("AgreeSale rendered with selected chats:", selectedChats);
  console.log("AgreeSale rendered with phone number:", phoneNumber);

  const handleSend = async () => {
    console.log("Sending message with chats:", selectedChats);
    try {
      const data: string[] = await sendMessageHandler({
        selectedChats,
        phoneNumber,
        message,
        backendUrl,
      });

      console.log("Message sent successfully:", data);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const selectedChatsCount = Object.keys(selectedChats).length;
  const totalAmount = Object.values(selectedChats).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  return (
    <Modal
      header={<Modal.Header></Modal.Header>}
      trigger={
        <Button
          size='m'
          className='text-white'
          style={{
            backgroundColor: "--tw-bg-opacity",
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          Sell
        </Button>
      }
    >
      <div className='p-5'>
        <Placeholder
          description={`Do you confirm to sell the ${selectedChatsCount} selected chats for ${totalAmount} $WORD? 
          Your friends will receive the following invitation to sell from our app:`}
          header='Please confirm'
        />
        <div className='w-full'>
          <div className='py-5 text-left'>
            <div className='flex items-center'>
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <span className='ml-2'>
                I agree to the{" "}
                <a
                  href='https://example.com/terms'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  terms and conditions
                </a>
              </span>
            </div>
          </div>
          <Textarea
            header='Textarea'
            placeholder='I am usual textarea'
            value={message}
            onChange={handleMessageChange}
            style={{width: "100%", height: "220px"}}
          />
          <div className='py-5 text-center relative'>
            <Button
              mode='filled'
              size='s'
              disabled={!isChecked}
              className='absolute bottom-2.5 right-2.5'
              onClick={handleSend}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </Modal>
  );
};

export default AgreeSale;
