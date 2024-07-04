import React, {useState} from "react";
import {Cell, Multiselectable, Button} from "@telegram-apps/telegram-ui";
import {useUserContext} from "../utils/utils";
import ConfirmSale from "./Modals/ConfirmInvitations";

interface ChatTableUserBProps {
  backendUrl: string;
}

const ChatTableUserB: React.FC<ChatTableUserBProps> = ({backendUrl}) => {
  const {user} = useUserContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showConfirmSale, setShowConfirmSale] = useState<boolean>(false);

  const handleSelectionChange = (value: string) => {
    setSelectedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value],
    );
  };

  const handleAgree = () => {
    setShowConfirmSale(true);
  };

  const totalValue = selectedValues.reduce(
    (sum, id) => sum + (user.chats.find(item => item.id === id)?.words || 0),
    0,
  );

  console.log("Chats", user.chats);

  return (
    <div className='text-left'>
      <form>
        {user.chats
          .filter(
            item =>
              item.lead.id !== user.id &&
              item.status === "pending" &&
              !item.agreed_users.includes(user.id),
          )
          .map(item => (
            <Cell
              key={item.id}
              Component='label'
              before={
                <Multiselectable
                  name='multiselect'
                  value={item.id}
                  checked={selectedValues.includes(item.id)}
                  onChange={() => handleSelectionChange(item.id)}
                />
              }
              multiline
            >
              <strong>{item.words} Points </strong> - {item.name}
            </Cell>
          ))}
      </form>
      <div className='text-center'>
        <Button mode='filled' size='m' onClick={handleAgree}>
          Confirm ({totalValue} points)
        </Button>
      </div>

      {showConfirmSale && (
        <ConfirmSale
          onClose={() => setShowConfirmSale(false)}
          selectedChats={selectedValues.map(id => ({
            userId: user.id,
            chatId: id,
          }))}
          word={String(totalValue)}
          backendUrl={backendUrl}
        />
      )}
    </div>
  );
};

export default ChatTableUserB;
