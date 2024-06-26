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

  return (
    <Modal
      header={<Modal.Header>Only iOS header</Modal.Header>}
      trigger={
        // <Button

        <Button
          size='m'
          className='text-white'
          style={{
            backgroundColor: "--tw-bg-opacity",
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          Agree Sale
        </Button>
      }
    >
      <div className='bg-white p-5'>
        <Placeholder
          description={`Do you confirm to sell the ${selectedChats.length} selected chats for 324 $WORD? 
          Your friends will receive the following invitation to sell from our app:`}
          header='Please confirm'
        />
        <div className='w-full'>
          <div className='py-5 text-left'>
            <div className='flex items-center'>
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <span className='ml-2'>
                I agree to the
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
            style={{width: "100%", height: "320px"}}
            // className='w-full h-80 overflow-auto resize-none'
            // className='w-full h-80 overflow-auto resize-none p-4 leading-normal'

            // className='w-full h-80'
          />
          <div className='py-5 text-center relative'>
            <Button
              mode='filled'
              size='s'
              disabled={!isChecked}
              //   style={{position: "absolute", bottom: "10px", right: "10px"}}
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
