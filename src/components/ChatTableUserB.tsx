import React, {useState} from "react";
import {Cell, Multiselectable, Button} from "@telegram-apps/telegram-ui";
import {useUserContext} from "../utils/utils";
import ConfirmSale from "./Modals/ConfirmSale";

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
    (sum, id) =>
      sum + (user.chats.find(item => item.id === Number(id))?.words || 0),
    0,
  );

  return (
    <div className='text-left'>
      <form>
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

      <Button mode='filled' size='m' stretched onClick={handleAgree}>
        Agree ({totalValue} points)
      </Button>

      {showConfirmSale && (
        <ConfirmSale
          onClose={() => setShowConfirmSale(false)}
          selectedChats={selectedValues.map(id => ({
            userId: user.id,
            chatId: Number(id),
          }))}
          word={String(totalValue)}
          backendUrl={backendUrl}
        />
      )}
    </div>
  );
};

export default ChatTableUserB;
