import React, { useState } from "react";
import { Cell, Multiselectable, Button } from "@telegram-apps/telegram-ui";

const jsonData = [
  { id: "1", label: "Multiselect in cell 1" },
  { id: "2", label: "Multiselect in cell 2" },
  { id: "3", label: "Multiselect in cell 3" },
];

const ChatTable: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectionChange = (value: string) => {
    setSelectedValues((prevValues) =>
      prevValues.includes(value)
        ? prevValues.filter((v) => v !== value)
        : [...prevValues, value]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission or other logic here if needed
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        {jsonData.map((item) => (
          <Cell
            key={item.id}
            Component="label"
            before={
              <Multiselectable
                name="multiselect"
                value={item.id}
                onChange={() => handleSelectionChange(item.id)}
              />
            }
            description="Pass Component='label' to Cell to make it clickable."
            multiline
          >
            {item.label}
          </Cell>
        ))}
        <Button type="submit">Submit</Button>
      </form>

      {selectedValues.length > 0 && (
        <table
          style={{
            marginTop: "20px",
            width: "100%",
            border: "1px solid black",
          }}
        >
          <thead>
            <tr>
              <th>Selected Values</th>
            </tr>
          </thead>
          <tbody>
            {selectedValues.map((value) => (
              <tr key={value}>
                <td>{jsonData.find((item) => item.id === value)?.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ChatTable;
