import React, {useState} from "react";
import {Cell, Multiselectable} from "@telegram-apps/telegram-ui";
import {useUserContext} from "./UserContext";
import ConfirmSale from "./Modals/ConfirmSale";

const ChatTableUserB: React.FC<{
  onSelectionChange: (selected: {id: string; value: number}[]) => void;
}> = ({onSelectionChange}) => {
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
    const selectedChats = selectedValues.reduce(
      (acc, id) => {
        const chat = user.chats.find(item => item.id === id);
        if (chat) {
          acc[`(${String(chat.id)}, '${chat.name}')`] = chat.words;
        }
        return acc;
      },
      {} as {[key: string]: number},
    );

    onSelectionChange(selectedChats);
    setShowConfirmSale(true);
  };

  const handleDecline = () => {
    console.log("request declined");
  };

  const totalValue = selectedValues.reduce(
    (sum, id) => sum + (user.chats.find(item => item.id === id)?.words || 0),
    0,
  );

  const phoneNumber = user.telephoneNumber ?? "No phone number provided";

  return (
    <div style={{textAlign: "left"}}>
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
        <table
          style={{
            marginTop: "20px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <tbody>
            <tr>
              <td colSpan={2}>
                <strong> Total Value: {totalValue} Points </strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <ConfirmSale
        selectedChats={selectedValues.reduce(
          (acc, id) => {
            const chat = user.chats.find(item => item.id === id);
            if (chat) {
              acc[`(${String(chat.id)}, '${chat.name}')`] = chat.words;
            }
            return acc;
          },
          {} as {[key: string]: number},
        )}
        phoneNumber={phoneNumber}
        onClose={() => setShowConfirmSale(false)}
        isVisible={showConfirmSale}
      />

      {selectedValues.length > 0 && (
        <div style={{textAlign: "center", marginTop: "20px"}}>
          <button type='button' onClick={handleAgree}>
            Agree
          </button>
          <button
            type='button'
            onClick={handleDecline}
            style={{marginLeft: "10px"}}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatTableUserB;
