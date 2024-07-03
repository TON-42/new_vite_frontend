import React, {useState} from "react";
import {Button, Placeholder, Checkbox} from "@telegram-apps/telegram-ui";
import {useUserContext} from "../../utils/utils";

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
      const response = await fetch(`${backendUrl}/add-user-to-agreed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedChats),
      });
      setShowConfirmInvitationModal(false);

      console.log("Body:", JSON.stringify(selectedChats));
      console.log("add-user-to-agreed response:", response);

      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        const sold = result.sold || [];
        const pending = result.pending || [];
        const declined = result.declined || [];
        setUser(prevUser => ({
          ...prevUser,
          chats: prevUser.chats.map(chat =>
            sold.includes(chat.id)
              ? {...chat, status: "sold"}
              : pending.includes(chat.id)
                ? {...chat, status: "pending"}
                : declined.includes(chat.id)
                  ? {...chat, status: "declined"}
                  : chat,
          ),
        }));
      } else if (response.status === 500) {
        console.error("Server error: 500");
      } else {
        console.error("Bad request: 400");
      }
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
