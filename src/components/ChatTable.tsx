import React, {useState, useEffect} from "react";
import {Cell, Multiselectable} from "@telegram-apps/telegram-ui";
import AgreeSale from "./Modals/AgreeSale";
import {User} from "../types/types";

interface ChatTableProps {
  user: User;
  backendUrl: string;
}

const ChatTable: React.FC<ChatTableProps> = ({user, backendUrl}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectionChange = (value: string) => {
    setSelectedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value],
    );

    const newSelectedChats = selectedValues.reduce(
      (acc, id) => {
        // const chat = user.chats.find(item => String(item.id) === id);
        const chat = user.chatsToSellUnfolded?.find(
          item => String(item.userId) === id,
        );
        if (chat) {
          const key = `(${String(chat.userId)}, '${chat.userName}')`;
          acc[key] = chat.words;
        }
        return acc;
      },
      {} as {[key: string]: number},
    );

    console.log("ChatTable handleSubmit selectedChats", newSelectedChats);
  };

  const totalValue = selectedValues.reduce(
    (sum, id) =>
      //   sum + (user.chats.find(item => String(item.id) === id)?.words || 0),
      sum +
      (user.chatsToSellUnfolded?.find(item => String(item.userId) === id)
        ?.words || 0),
    0,
  );

  const phoneNumber = user.telephoneNumber ?? "No phone number provided";

  return (
    <div className='text-left'>
      {/* {user.chats.map(item => ( */}
      {user.chatsToSellUnfolded?.map(item => (
        <Cell
          key={item.userId}
          Component='label'
          before={
            <Multiselectable
              name='multiselect'
              value={String(item.userId)}
              checked={selectedValues.includes(String(item.userId))}
              onChange={() => handleSelectionChange(String(item.userId))}
            />
          }
          multiline
        >
          <strong>{item.words} Points </strong> - {item.userName}
        </Cell>
      ))}
      <table className='mt-5 w-full text-center'>
        <tbody>
          <tr>
            <td colSpan={2}>
              <strong> Total Value: {totalValue} Points </strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className='text-center '>
        <AgreeSale
          selectedChats={selectedValues.reduce(
            (acc, id) => {
              // Use user.chatsToSellUnfolded for consistency
              const chat = user.chatsToSellUnfolded?.find(
                item => String(item.userId) === id,
              );
              if (chat) {
                acc[`(${String(chat.userId)}, '${chat.userName}')`] =
                  chat.words;
              }
              return acc;
            },
            {} as {[key: string]: number},
          )}
          phoneNumber={phoneNumber}
          onClose={() => {}}
          isVisible={true} // This prop can be removed if not used inside AgreeSale
          backendUrl={backendUrl}
        />
      </div>
    </div>
  );
};

export default ChatTable;
