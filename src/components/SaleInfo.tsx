import React, {useState} from "react";
import {Cell, Multiselectable, Button} from "@telegram-apps/telegram-ui";
import {useUserContext} from "../utils/utils";

const ChatTable: React.FC<{
  onSelectionChange: (selected: string[]) => void;
  onSubmit: (selected: string[]) => void;
}> = ({onSelectionChange, onSubmit}) => {
  const {user} = useUserContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectionChange = (value: string) => {
    setSelectedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value],
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSelectionChange(selectedValues);
    onSubmit(selectedValues);
  };

  const totalValue = selectedValues.reduce(
    (sum, id) =>
      sum + (user.chats.find(item => String(item.id) === id)?.words || 0),
    0,
  );

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
                value={item.id.toString()}
                checked={selectedValues.includes(item.id.toString())}
                onChange={() => handleSelectionChange(item.id.toString())}
              />
            }
            multiline
          >
            <strong>{item.words} Points </strong> - {item.name}
          </Cell>
        ))}
        <div style={{marginTop: "20px", textAlign: "center"}}>
          <Button type='submit'>Submit</Button>
        </div>
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
              <td colSpan={2} style={{}}>
                <strong> Total Value: {totalValue} Points </strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ChatTable;
