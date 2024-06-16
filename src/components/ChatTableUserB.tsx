import React, {useState} from "react";
import {Cell, Multiselectable} from "@telegram-apps/telegram-ui";
import {useUserContext} from "./UserContext";
import ConfirmSale from "./Modals/ConfirmSale";

const ChatTableUserB: React.FC<{}> = () => {
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

  const handleDecline = () => {
    console.log("request declined");
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

      {selectedValues.length > 0 && (
        <table className='mt-5 w-full text-center'>
          <tbody>
            <tr>
              <td colSpan={2}>
                <strong> Total Value: {totalValue} Points </strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {showConfirmSale && (
        <ConfirmSale
          selectedChats={
            selectedValues
              .map(id => {
                const chat = user.chats.find(item => item.id === Number(id));
                return chat ? {id: String(chat.id), value: chat.words} : null;
              })
              .filter(chat => chat !== null) as {id: string; value: number}[]
          }
          word='Points'
          onClose={() => setShowConfirmSale(false)}
        />
      )}

      {selectedValues.length > 0 && (
        <div className='text-center mt-5'>
          <button type='button' onClick={handleAgree}>
            Agree
          </button>
          <button type='button' onClick={handleDecline} className='ml-2'>
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatTableUserB;
