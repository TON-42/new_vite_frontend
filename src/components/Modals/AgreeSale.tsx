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
import {useUserContext} from "../../utils/utils";

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
  const {setUser} = useUserContext(); // Destructure setUser from context
  const defautlMessage = `Hey, I checked this ChatPay app and we can make some money by selling our chat history! The chat will be anonymized 🥷: no names, no phone numbers or any personal data. It's not for ads 🙅, only to train AI models! So pretty cool 🦾
  I already agreed: the chat will be sold only if all participants agree 🙋‍♀️. Follow the link:`;
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
      const data = await sendMessageHandler({
        selectedChats,
        phoneNumber,
        message,
        backendUrl,
      });

      console.log("Message sent successfully:", data);

      // Update the user context with new chat statuses
      setUser(prevUser => {
        const updatedChatsToSellUnfolded =
          prevUser.chatsToSellUnfolded?.filter(
            chat =>
              !Object.prototype.hasOwnProperty.call(
                selectedChats,
                `(${chat.userId}, '${chat.userName}')`,
              ),
          ) || [];

        const newChats = Object.keys(selectedChats).map(chatKey => {
          const [userId, userName] = chatKey.match(/\d+/g) || [];
          return {
            agreed_users: [prevUser.id],
            id: userId!,
            lead: {
              id: prevUser.id,
              name: prevUser.name || "",
            },
            name: userName!,
            status: "pending",
            users: [prevUser],
            words: selectedChats[chatKey],
          };
        });

        const updatedUserChats = [...prevUser.chats, ...newChats];

        return {
          ...prevUser,
          chats: updatedUserChats,
          chatsToSellUnfolded: updatedChatsToSellUnfolded,
        };
      });

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
                  href='https://www.chatpay.app/user-agreement.pdf'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  terms and conditions
                </a>
              </span>
            </div>
          </div>
          <Textarea
            header='The invitation for your friend'
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
