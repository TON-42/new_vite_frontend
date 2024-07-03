import React, {useState} from "react";
import {User, ChatStatus} from "../types/types";
import {Section, Headline, Banner} from "@telegram-apps/telegram-ui";

interface SummaryTableProps {
  user: User;
}

const SummaryTable: React.FC<SummaryTableProps> = ({user}) => {
  const [chatStatus] = useState<ChatStatus>({
    sold: [],
    pending: [],
    declined: [],
  });

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

// import {ChatDetails, FetchChatDetailsResponse, Chat} from "../../types/types";
// import React, {useState, useEffect, useCallback} from "react";
// const [chatDetails, setChatDetails] = useState<ChatDetails>({});

// const fetchChatDetails = useCallback(
//   async (userId: number): Promise<FetchChatDetailsResponse | null> => {
//     try {
//       const response = await fetch(`${backendUrl}/get-user`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({userId}),
//       });

//       if (response.ok) {
//         const data: FetchChatDetailsResponse = await response.json();
//         return data;
//       } else {
//         console.error(`Failed to fetch details for user ID ${userId}`);
//         return null;
//       }
//     } catch (error) {
//       console.error(`Error fetching details for user ID ${userId}:`, error);
//       return null;
//     }
//   },
//   [backendUrl],
// );

// useEffect(() => {
//   const loadChatDetails = async () => {
//     const details: ChatDetails = {};

//     for (const chat of selectedChats) {
//       const data = await fetchChatDetails(chat.userId);
//       if (data) {
//         const chatDetail = data.chats.find((c: Chat) => c.id === chat.chatId);
//         if (chatDetail) {
//           details[chat.chatId] = {lead_name: chatDetail.lead.name};
//         }
//       }
//     }

//     setChatDetails(details);
//   };

//   loadChatDetails();
// }, [selectedChats, fetchChatDetails]);
