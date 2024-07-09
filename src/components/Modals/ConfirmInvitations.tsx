import React, {useState} from "react";
import {Button, Placeholder, Checkbox} from "@telegram-apps/telegram-ui";
import {useUserContext} from "../../utils/utils";
import {
  addUserToAgreedHandler,
  AddUserToAgreedHandlerProps,
} from "../../utils/api/addUserToAgreedHandler";
import {CustomError} from "../../types/types";

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
  const {user, setUser} = useUserContext();
  const [agreed, setAgreed] = useState(false);
  const [showConfirmInvitationModal, setShowConfirmInvitationModal] =
    useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state

  const sendAgree = async () => {
    try {
      const requestProps: AddUserToAgreedHandlerProps = {
        backendUrl: backendUrl,
        selectedChats: selectedChats,
      };
      const response = await addUserToAgreedHandler(requestProps);
      setShowConfirmInvitationModal(false);

      setUser(prevUser => {
        const updatedChats = prevUser.chats.map(chat => {
          if (chat.id in response) {
            const updatedAgreedUsers = chat.agreed_users.includes(user.id)
              ? chat.agreed_users
              : [...chat.agreed_users, user.id];
            return {
              ...chat,
              status: response[chat.id],
              name: `${chat.lead.name}`,
              agreed_users: updatedAgreedUsers,
            };
          }
          return chat;
        });

        return {
          ...prevUser,
          chats: updatedChats,
        };
      });
    } catch (error) {
      const customError = error as CustomError;
      if (customError.status) {
        setError(customError.message); // Set the error message to state
      } else {
        console.error("Error sending agreement:", error);
        setError("An unexpected error occurred"); // Set a generic error message to state
      }
    }
  };

  return (
    <>
      {showConfirmInvitationModal && (
        <div
          className='fixed inset-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50'
          onClick={onClose}
        >
          <div
            className='text-center w-10/12 max-w-md'
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <Placeholder
              style={{
                background: "var(--tgui--bg_color)",
                borderRadius: "1rem",
                padding: 0,
              }}
            >
              <div className='m-2'>
                <Placeholder
                  description={`Do you confirm to sell ${selectedChats.length} selected ${selectedChats.length < 2 ? "chat" : "chats"} for ${word} points?`}
                  header='Confirm Sale'
                  style={{padding: "1rem"}}
                />
                <div className='p-2 text-center'>
                  {error && <div className='text-red-500 mb-4'>{error}</div>}{" "}
                  {/* Display error message */}
                  <div className='flex items-center justify-center mb-4'>
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
            </Placeholder>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmInvitation;
