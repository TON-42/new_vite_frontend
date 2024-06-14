import React, {useState} from "react";
import {Cell, Multiselectable} from "@telegram-apps/telegram-ui";
import {useUserContext} from "./UserContext";
import AgreeSale from "./Modals/AgreeSale";

const ChatTable: React.FC<{
  onSelectionChange: (selected: {id: string; value: number}[]) => void;
  onAgreeSale: (selected: string[]) => void;
}> = ({onSelectionChange, onAgreeSale}) => {
  const {user} = useUserContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showAgreeSale, setShowAgreeSale] = useState<boolean>(false);

  const handleSelectionChange = (value: string) => {
    setSelectedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value],
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
    setShowAgreeSale(true);
  };

  const totalValue = selectedValues.reduce(
    (sum, id) => sum + (user.chats.find(item => item.id === id)?.words || 0),
    0,
  );

  const phoneNumber = user.telephoneNumber ?? "No phone number provided";

  return (
    <div style={{textAlign: "left"}}>
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

      <AgreeSale
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
        onClose={() => setShowAgreeSale(false)}
        isVisible={showAgreeSale}
      />

      {selectedValues.length > 0 && (
        <div style={{textAlign: "center", marginTop: "20px"}}>
          <button type='submit' onClick={handleSubmit}>
            Next step
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatTable;
