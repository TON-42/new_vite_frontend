import React, { useState } from "react";
import { Cell, Multiselectable, Button } from "@telegram-apps/telegram-ui";

// Example JSON data
const jsonData = {
  "(7263142058, 'harcoded chat 1')": 2,
  "(843373640, 'harcoded chat 2')": 74,
  "(1942086946, 'harcoded chat ')": 88,
  "(462718637, 'the rest is hardcoded as well')": 1,
  "(559052, 'Gleb V')": 203,
  "(122493869, 'Stefano Slombard')": 2041,
  "(6976304142, '')": 2,
  "(5892003906, 'Daniel Gomez')": 92,
  "(5301372174, 'Simona')": 1116,
  "(6766314040, 'The Pixels')": 236,
};

// Extracted data array
const dataEntries = Object.entries(jsonData).map(([key, value]) => {
  const [, name] = key.match(/\('?\d+'?,\s*'([^']*)'\)/) || [];
  return { id: key, name, value };
});

const ChatTable: React.FC<{
  onSelectionChange: (selected: string[]) => void;
}> = ({ onSelectionChange }) => {
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
    onSelectionChange(selectedValues);
  };

  const totalValue = selectedValues.reduce(
    (sum, id) => sum + (dataEntries.find((item) => item.id === id)?.value || 0),
    0
  );

  return (
    <div style={{ textAlign: "left" }}>
      <form onSubmit={handleSubmit}>
        {dataEntries.map((item) => (
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
            multiline
          >
            <strong>{item.value} $WORD </strong> - {item.name}
          </Cell>
        ))}
        {/* <Button type="submit">Submit</Button> */}
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
            {/* {selectedValues.map((value) => {
              const item = dataEntries.find((item) => item.id === value);
              return (
                <tr key={value}>
                  <td>{item?.name}</td>
                  <td>
                    <strong>{item?.value}</strong> $WORD
                  </td>
                </tr>
              );
            })} */}
          </tbody>
          <tr>
            <td colSpan={2} style={{}}>
              <strong> Total Value:{totalValue} $WORD </strong>
            </td>
          </tr>
        </table>
      )}
    </div>
  );
};

export default ChatTable;
