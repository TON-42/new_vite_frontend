import React, {useState} from "react";
import {
  Modal,
  Button,
  Placeholder,
  Textarea,
  Checkbox,
  Spinner,
} from "@telegram-apps/telegram-ui";
import {sendMessageHandler} from "../../utils/api/sendMessageHandler";
import {useUserContext} from "../../utils/utils";

type AgreeSaleProps = {
  selectedChats: {[key: string]: number};
  phoneNumber: string;
  onClose: () => void;
  showSuccess: () => void;
  isVisible: boolean;
  backendUrl: string;
};

const AgreeSale: React.FC<AgreeSaleProps> = ({
  selectedChats,
  phoneNumber,
  onClose,
  showSuccess,
  isVisible,
  backendUrl,
}) => {
  const {setUser} = useUserContext();
  const defautlMessage = `Hey, I checked this ChatPay app and we can make some money by selling our chat history! The chat will be anonymized 🥷: no names, no phone numbers or any personal data. It's not for ads 🙅, only to train AI models! So pretty cool 🦾
  I already agreed: the chat will be sold only if all participants agree 🙋‍♀️. Follow the link:`;
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState(defautlMessage);
  const [isSending, setIsSending] = useState(false);

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
    setIsSending(true);
    console.log("Sending message with chats:", selectedChats);
    try {
      const data = await sendMessageHandler({
        selectedChats,
        phoneNumber,
        message,
        backendUrl,
      });

      console.log("Message sent successfully:", data);

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
      showSuccess();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const selectedChatsCount = Object.keys(selectedChats).length;
  const totalAmount = Object.values(selectedChats).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  return (
    <Modal
      open={isVisible}
      onOpenChange={onClose}
      header={<Modal.Header></Modal.Header>}
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
              disabled={!isChecked || isSending}
              className='absolute bottom-2.5 right-2.5'
              onClick={handleSend}
            >
              {isSending ? <Spinner size='s' /> : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AgreeSale;
