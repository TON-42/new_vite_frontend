import React, {useState, useEffect} from "react";
import {useUserContext} from "../utils/utils";
import {Accordion} from "@telegram-apps/telegram-ui";

const ChatTableSummary: React.FC = () => {
  const {user} = useUserContext();
  const [chatStatus, setChatStatus] = useState<{
    sold: string[];
    pending: string[];
    declined: string[];
  }>({
    sold: [],
    pending: [],
    declined: [],
  });

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const soldChats = user.chats
      .filter(chat => chat.status === "sold")
      .map(chat => chat.id);
    const pendingChats = user.chats
      .filter(
        chat =>
          chat.status === "pending" && chat.agreed_users.includes(user.id),
      )
      .map(chat => chat.id);
    const declinedChats = user.chats
      .filter(chat => chat.status === "declined")
      .map(chat => chat.id);

    setChatStatus({
      sold: soldChats,
      pending: pendingChats,
      declined: declinedChats,
    });
  }, [user.chats, user.id]);

  const renderChatStatus = (
    statusArray: string[],
    statusTitle: string,
    emoji: string,
    description: string,
  ) => {
    const filteredChats = user.chats.filter(chat =>
      statusArray.includes(chat.id),
    );
    return (
      <Accordion expanded={expanded} onChange={setExpanded}>
        <Accordion.Summary className='border-2 border-gray-100 dark:border-stone-950'>
          {emoji} {statusTitle}
        </Accordion.Summary>
        <Accordion.Content>
          <div className='p-4 bg-gray-100 dark:bg-stone-950'>
            {filteredChats.length === 0 ? (
              <p>{description}</p>
            ) : (
              <ul>
                {filteredChats.map(chat => (
                  <li key={chat.id}>Chat with {chat.lead.name}</li>
                ))}
              </ul>
            )}
          </div>
        </Accordion.Content>
      </Accordion>
    );
  };

  return (
    <div className='text-left mb-20'>
      {renderChatStatus(
        chatStatus.sold,
        "Sold Chats",
        "✅",
        "Here you will find all the chats that you have sold.",
      )}
      {renderChatStatus(
        chatStatus.pending,
        "Pending Chats",
        "⏳",
        "Here you will find all the chats that are pending approval.",
      )}
      {renderChatStatus(
        chatStatus.declined,
        "Declined Chats",
        "❌",
        "Here you will find all the chats that have been declined.",
      )}
    </div>
  );
};

export default ChatTableSummary;
