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
  ) => {
    const filteredChats = user.chats.filter(chat =>
      statusArray.includes(chat.id),
    );
    return (
      <Accordion expanded={expanded} onChange={setExpanded}>
        <Accordion.Summary>
          {emoji} {statusTitle}
        </Accordion.Summary>
        <Accordion.Content>
          <div className='p-8 ml-2'>
            <ul>
              {filteredChats.map(chat => (
                <li key={chat.id}>Chat with {chat.lead.name}</li>
              ))}
            </ul>
          </div>
        </Accordion.Content>
      </Accordion>
    );
  };

  return (
    <div className='text-left p-2 mb-20'>
      {renderChatStatus(chatStatus.sold, "Sold Chats", "✅")}
      {renderChatStatus(chatStatus.pending, "Pending Chats", "⏳")}
      {renderChatStatus(chatStatus.declined, "Declined Chats", "❌")}
    </div>
  );
};

export default ChatTableSummary;
