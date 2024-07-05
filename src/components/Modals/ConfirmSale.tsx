import React, {useState, useEffect, useCallback} from "react";
import {
  Modal,
  Button,
  Placeholder,
  Checkbox,
  List,
  Cell,
  Section,
  Title,
  IconButton,
} from "@telegram-apps/telegram-ui";
import {Icon20QuestionMark} from "@telegram-apps/telegram-ui/dist/cjs/icons/20/question_mark";
import {
  ChatStatus,
  ChatDetails,
  FetchChatDetailsResponse,
  Chat,
  CustomError,
} from "../../types/types";
import BackendError from "../BackendError";

type ConfirmSaleProps = {
  onClose: () => void;
  selectedChats: {userId: number; chatId: string}[];
  word: string;
  backendUrl: string;
};

const ConfirmSale: React.FC<ConfirmSaleProps> = ({
  onClose,
  selectedChats,
  word,
  backendUrl,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [chatStatus, setChatStatus] = useState<ChatStatus>({
    sold: [],
    pending: [],
    declined: [],
  });
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showConfirmSaleModal, setShowConfirmSaleModal] = useState(true);
  const [chatDetails, setChatDetails] = useState<ChatDetails>({});
  const [error, setError] = useState<CustomError | null>(null);

  const fetchChatDetails = useCallback(
    async (userId: number): Promise<FetchChatDetailsResponse | null> => {
      try {
        const response = await fetch(`${backendUrl}/get-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({userId}),
        });

        if (response.ok) {
          const data: FetchChatDetailsResponse = await response.json();
          return data;
        } else {
          const errorMessage = await response.text();
          console.error(`Failed to fetch details for user ID ${userId}`);
          console.error("Error message:", errorMessage);
          const error: CustomError = new Error(errorMessage);
          error.status = response.status;
          throw error;
        }
      } catch (error) {
        setError(error as CustomError);
        return null;
      }
    },
    [backendUrl],
  );

  useEffect(() => {
    const loadChatDetails = async () => {
      const details: ChatDetails = {};

      for (const chat of selectedChats) {
        const data = await fetchChatDetails(chat.userId);
        if (data) {
          const chatDetail = data.chats.find((c: Chat) => c.id === chat.chatId);
          if (chatDetail) {
            details[chat.chatId] = {lead_name: chatDetail.lead.name};
          }
        }
      }

      setChatDetails(details);
    };

    loadChatDetails();
  }, [selectedChats, fetchChatDetails]);

  const sendAgree = async () => {
    try {
      const response = await fetch(`${backendUrl}/add-user-to-agreed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedChats),
      });

      console.log("Body:", JSON.stringify(selectedChats));
      console.log("add-user-to-agreed response:", response);

      if (response.status === 200) {
        const result = await response.json();
        const sold: string[] = [];
        const pending: string[] = [];
        const declined: string[] = [];

        Object.entries(result).forEach(([chatId, status]) => {
          if (status === "sold") {
            sold.push(chatId);
          } else if (status === "pending") {
            pending.push(chatId);
          } else if (status === "declined") {
            declined.push(chatId);
          }
        });

        setChatStatus({sold, pending, declined});
        setShowConfirmSaleModal(false);
        setShowSummaryModal(true);
      } else {
        const errorMessage = await response.text();
        const error: CustomError = new Error(errorMessage);
        error.status = response.status;
        throw error;
      }
    } catch (error) {
      const customError = error as CustomError;
      customError.status = customError.status || 500;
      setError(customError);
    }
  }; // <-- Ensure this closing brace is here

  const renderChatStatus = (
    statusArray: string[],
    statusTitle: string,
    emoji: string,
  ) => {
    const filteredChats = selectedChats.filter(chat =>
      statusArray.includes(chat.chatId),
    );
    return filteredChats.length > 0 ? (
      <Section>
        <Cell
          after={
            <IconButton mode='plain' size='s'>
              <Icon20QuestionMark />
            </IconButton>
          }
        >
          <Title level='3' weight='1'>
            {emoji} {statusTitle}
          </Title>
        </Cell>
        <div className='p-2 ml-4'>
          <ul>
            {filteredChats.map(chat => (
              <li key={chat.chatId}>
                Chat with {chatDetails[chat.chatId]?.lead_name}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    ) : null;
  };

  return (
    <>
      {showConfirmSaleModal && (
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

      {showSummaryModal && (
        <div className='fixed inset-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center'>
          <Modal trigger={null} open={true}>
            <div className='text-center pt-2'>
              <Title level='1' weight='1'>
                Chat Status
              </Title>
              <List
                style={{
                  background: "var(--tgui--secondary_bg_color)",
                  padding: 8,
                  textAlign: "left",
                }}
              >
                {renderChatStatus(chatStatus.sold, "Sold Chats", "✅")}
                {renderChatStatus(chatStatus.pending, "Pending Chats", "⏳")}
                {renderChatStatus(chatStatus.declined, "Declined Chats", "❌")}
              </List>
              <div className='text-center'>
                <Button mode='filled' size='m' stretched onClick={onClose}>
                  Go to chats
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {error && (
        <BackendError
          message={error.message}
          errorCode={error.status || 0}
          onClose={() => setError(null)}
          // Maybe here we should pass null if no need to redirect
          // like:         onRedirect={error.status === 401 ? onClose : null} // Pass null if onRedirect is not needed

          onRedirect={onClose}
        />
      )}
    </>
  );
};

export default ConfirmSale;
