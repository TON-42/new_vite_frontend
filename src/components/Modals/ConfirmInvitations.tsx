import React, {useState} from "react";
import {Button, Placeholder, Checkbox} from "@telegram-apps/telegram-ui";
import {useUserContext} from "../../utils/utils";
import {
  addUserToAgreedHandler,
  AddUserToAgreedHandlerProps,
} from "../../utils/api/addUserToAgreedHandler";

type ConfirmInvitationProps = {
  onClose: () => void;
  selectedChats: {userId: number; chatId: string}[];
  word: string;
  backendUrl: string;
};

const ConfirmInvitation: React.FC<ConfirmInvitationProps> = ({
  onClose,
  selectedChats,
  word,
  backendUrl,
}) => {
  const {setUser} = useUserContext();
  const [agreed, setAgreed] = useState(false);
  const [showConfirmInvitationModal, setShowConfirmInvitationModal] =
    useState(true);

  const sendAgree = async () => {
    try {
      //   const response = await fetch(`${backendUrl}/add-user-to-agreed`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(selectedChats),
      //   });
      const requestProps: AddUserToAgreedHandlerProps = {
        backendUrl: backendUrl,
        selectedChats: selectedChats,
      };
      const response = await addUserToAgreedHandler(requestProps);
      setShowConfirmInvitationModal(false);

      setUser(prevUser => {
        const updatedChats = prevUser.chats.map(chat => {
          // if (result.hasOwnProperty(chat.id)) {
          if (chat.id in response) {
            return {...chat, status: response[chat.id]};
          }
          return chat;
        });

        //     const newStatus = result[chat.id];
        //     if (newStatus) {
        //       return {...chat, status: newStatus};
        //     }
        //     return chat;
        //   });
        return {
          ...prevUser,
          chats: updatedChats,
        };
      });
    } catch (error) {
      console.error("Error sending agreement:", error);
    }
  };

  return (
    <>
      {showConfirmInvitationModal && (
        <div className='fixed inset-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50'>
          <div className='text-center w-10/12 max-w-md'>
            <Placeholder
              style={{
                background: "var(--tgui--bg_color)",
                borderRadius: "1rem",
                padding: 0,
              }}
            >
              <div className=''>
                <Placeholder
                  description={`Do you confirm to sell ${selectedChats.length} selected ${selectedChats.length < 2 ? "chat" : "chats"} for ${word} points?`}
                  header='Confirm Sale'
                />
                <div className='p-2 text-center'>
                  <div className='flex items-center justify-center mb-12'>
                    <Checkbox
                      checked={agreed}
                      onChange={() => setAgreed(!agreed)}
                    />
                    <span className='ml-2'>
                      I agree to the{" "}
                      <a
                        href='https://chatpay.app/terms.pdf'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        terms and conditions
                      </a>
                    </span>
                  </div>
                  <Button
                    mode='filled'
                    size='m'
                    onClick={sendAgree}
                    disabled={!agreed}
                  >
                    Confirm
                  </Button>
                </div>
                <div className='text-center pb-8'>
                  <Button mode='outline' size='m' onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            </Placeholder>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmInvitation;
