import React, {useState} from "react";
import {Cell, Multiselectable} from "@telegram-apps/telegram-ui";
import AgreeSale from "./Modals/AgreeSale";
import {User} from "../types/types";

interface ChatTableProps {
  user: User;
  backendUrl: string;
}

const ChatTable: React.FC<ChatTableProps> = ({user, backendUrl}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showAgreeSale, setShowAgreeSale] = useState<boolean>(false);

  const handleSelectionChange = (value: string) => {
    setSelectedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value],
    );

    const newSelectedChats = selectedValues.reduce(
      (acc, id) => {
        const chat = user.chats.find(item => String(item.id) === id);
        if (chat) {
          const key = `(${String(chat.id)}, '${chat.name}')`;
          acc[key] = chat.words;
        }
        return acc;
      },
      {} as {[key: string]: number},
    );

    console.log("ChatTable handleSubmit selectedChats", newSelectedChats);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowAgreeSale(true);
  };

  const totalValue = selectedValues.reduce(
    (sum, id) =>
      sum + (user.chats.find(item => String(item.id) === id)?.words || 0),
    0,
  );

  const phoneNumber = user.telephoneNumber ?? "No phone number provided";

  return (
    <div className='text-left'>
      <form onSubmit={handleSubmit}>
        {user.chats.map(item => (
          <Cell
            key={item.id}
            Component='label'
            before={
              <Multiselectable
                name='multiselect'
                value={String(item.id)}
                checked={selectedValues.includes(String(item.id))}
                onChange={() => handleSelectionChange(String(item.id))}
              />
            }
            multiline
          >
            <strong>{item.words} Points </strong> - {item.name}
          </Cell>
        ))}
      </form>
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
              const chat = user.chats.find(item => String(item.id) === id);
              if (chat) {
                acc[`(${String(chat.id)}, '${chat.name}')`] = chat.words;
              }
              return acc;
            },
            {} as {[key: string]: number},
          )}
          phoneNumber={phoneNumber}
          onClose={() => setShowAgreeSale(false)}
          isVisible={showAgreeSale}
          backendUrl={backendUrl}
        />
      </div>
    </div>
  );
};

export default ChatTable;
