import React, {useState, useEffect} from "react";
import {useUserContext} from "../utils/utils";
import {Section, Headline, Banner} from "@telegram-apps/telegram-ui";

const SummaryTable: React.FC = () => {
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
      <Section>
        <Banner>
          <Headline weight='3'>
            {emoji} {statusTitle}
          </Headline>
        </Banner>
        <div className='p-2 ml-4'>
          <ul>
            {filteredChats.map(chat => (
              <li key={chat.id}>Chat with {chat.lead.name}</li>
            ))}
          </ul>
        </div>
      </Section>
    );
  };

  return (
    <div className='text-center pt-2'>
      {renderChatStatus(chatStatus.sold, "Sold Chats", "✅")}
      {renderChatStatus(chatStatus.pending, "Pending Chats", "⏳")}
      {renderChatStatus(chatStatus.declined, "Declined Chats", "❌")}
    </div>
  );
};

export default SummaryTable;
