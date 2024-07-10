import React, {useState} from "react";
import {
  Button,
  Placeholder,
  Checkbox,
  Spinner,
} from "@telegram-apps/telegram-ui";
import {sendMessageHandler} from "../../utils/api/sendMessageHandler";
import {useUserContext} from "../../utils/utils";
import Textarea from "../TextArea";

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
  const defautlMessage = `Hey, I checked this ChatPay app and we can make some money by selling our chat history! The chat will be anonymized 🥷: no names, no phone numbers, or any personal data. Follow the link:`;
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState(defautlMessage);
  const [isSending, setIsSending] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

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

        const newChats = Object.keys(selectedChats)
          .map(chatKey => {
            const match = chatKey.match(/\((\d+), '(.+?)'\)/);
            if (match) {
              const userId = match[1];
              const userName = match[2];
              return {
                agreed_users: [prevUser.id],
                id: userId,
                lead: {
                  id: prevUser.id,
                  name: prevUser.name || "",
                },
                name: userName,
                status: "pending",
                users: [prevUser],
                words: selectedChats[chatKey],
              };
            }
            return null;
          })
          .filter(chat => chat !== null);

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

  return isVisible ? (
    <div
      className='fixed inset-0 w-full h-full bg-gray-400 dark:bg-black bg-opacity-80 flex justify-center items-center z-50'
      onClick={onClose}
    >
      <div
        className='text-center w-10/12 max-w-md'
        onClick={e => e.stopPropagation()}
      >
        <Placeholder
          style={{
            background: "var(--tgui--bg_color)",
            borderRadius: "1rem",
            padding: 0,
          }}
        >
          <div className='p-4'>
            <Placeholder
              description={`Do you confirm to sell the ${selectedChatsCount} selected ${selectedChatsCount < 2 ? "chat" : "chats"} for ${totalAmount} $WORD?`}
              header='Please confirm'
              style={{padding: 0}}
            />
            <div className='w-full py-4'>
              <Textarea
                label='Personalize the invitation'
                placeholder='Enter your message here...'
                value={message}
                onChange={handleMessageChange}
              />
              <div className='py-5 text-left'>
                <div className='flex items-center'>
                  <Checkbox
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
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
              <div className='flex gap-y-2 flex-col py-2 items-center'>
                <Button
                  mode='filled'
                  size='m'
                  disabled={!isChecked || isSending}
                  onClick={handleSend}
                >
                  {isSending ? <Spinner size='s' /> : "Send"}
                </Button>
                <Button
                  className='text-gray-400'
                  mode='outline'
                  size='m'
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Placeholder>
      </div>
    </div>
  ) : null;
};

export default AgreeSale;
