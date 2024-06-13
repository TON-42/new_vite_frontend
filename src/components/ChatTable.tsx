import React, { useState } from "react";
import { Cell, Multiselectable, Button } from "@telegram-apps/telegram-ui";
import { useUserContext } from "./UserContext";
import AgreeSale from "./Modals/AgreeSale";

const ChatTable: React.FC<{
  onSelectionChange: (selected: string[]) => void;
  onAgreeSale: (selected: string[]) => void;
}> = ({ onSelectionChange, onAgreeSale }) => {
  const { user } = useUserContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showAgreeSale, setShowAgreeSale] = useState<boolean>(false);

  const handleSelectionChange = (value: string) => {
    // console.log("Selected value changed:", value);
    setSelectedValues((prevValues) =>
      prevValues.includes(value)
        ? prevValues.filter((v) => v !== value)
        : [...prevValues, value]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log("Form submitted");
    // console.log("Selected values before submit:", selectedValues);
    onSelectionChange(selectedValues);
    setShowAgreeSale(true);
  };

  const totalValue = selectedValues.reduce(
    (sum, id) => sum + (user.chats.find((item) => item.id === id)?.words || 0),
    0
  );

  return (
    <div style={{ textAlign: "left" }}>
      <form onSubmit={handleSubmit}>
        {user.chats.map((item) => (
          <Cell
            key={item.id}
            Component="label"
            before={
              <Multiselectable
                name="multiselect"
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
        {/* <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button type="submit">Agree Sale</Button>
        </div> */}
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
        selectedChats={selectedValues}
        phoneNumber={user.telephoneNumber}
        onClose={() => setShowAgreeSale(false)}
      />
    </div>
  );
};

export default ChatTable;
