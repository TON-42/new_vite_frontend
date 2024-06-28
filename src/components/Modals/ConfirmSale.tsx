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
} from "../../types/types";

type ConfirmSaleProps = {
  onClose: () => void;
  selectedChats: {userId: number; chatId: number}[];
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
          console.error(`Failed to fetch details for user ID ${userId}`);
          return null;
        }
      } catch (error) {
        console.error(`Error fetching details for user ID ${userId}:`, error);
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
            details[chat.chatId] = {lead_name: chatDetail.name};
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
      {showConfirmSaleModal && (
        <Modal
          header={<Modal.Header>Confirm Sale</Modal.Header>}
          trigger={null}
          open={true}
        >
          <div className='p-8'>
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
            <div className='text-center'>
              <Button mode='outline' size='m' onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {showSummaryModal && (
        <Modal
          header={<Modal.Header>Chat Sell Status</Modal.Header>}
          trigger={null}
          open={true}
        >
          <div className='p-4'>
            <List
              style={{
                background: "var(--tgui--secondary_bg_color)",
                padding: 8,
              }}
            >
              <Section>
                <Cell
                  after={
                    <IconButton mode='plain' size='s'>
                      <Icon20QuestionMark />
                    </IconButton>
                  }
                >
                  <Title level='3' weight='1'>
                    ✅ Sold Chats
                  </Title>
                </Cell>
                <div className='p-2 ml-4'>
                  <ul>
                    {chatStatus.sold.map(chat => (
                      <li key={chat}>
                        Chat with {chatDetails[chat]?.lead_name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
              <Section>
                <Cell
                  after={
                    <IconButton mode='plain' size='s'>
                      <Icon20QuestionMark />
                    </IconButton>
                  }
                >
                  <Title level='3' weight='1'>
                    ⏳ Pending Chats
                  </Title>
                </Cell>
                <div className='p-2 ml-4'>
                  <ul>
                    {chatStatus.pending.map(chat => (
                      <li key={chat}>
                        Chat with {chatDetails[chat]?.lead_name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
              <Section>
                <Cell
                  after={
                    <IconButton mode='plain' size='s'>
                      <Icon20QuestionMark />
                    </IconButton>
                  }
                >
                  <Title level='3' weight='1'>
                    ❌ Declined Chats
                  </Title>
                </Cell>
                <div className='p-2 ml-4'>
                  <ul>
                    {chatStatus.declined.map(chat => (
                      <li key={chat}>
                        Chat with {chatDetails[chat]?.lead_name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            </List>
            <div className='text-center'>
              <Button mode='filled' size='m' stretched onClick={onClose}>
                Go to chats
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ConfirmSale;
