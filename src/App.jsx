import React, { useState } from "react";
import { Button, Cell, List, Section, Input } from "@telegram-apps/telegram-ui";

const cellsTexts = ["Chat Settings", "Data and Storage", "Devices"];

const App = () => {
  const [value, setValue] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <Button>Click Me</Button>
      <List>
        <Section header="Settings" footer="End of Settings">
          {cellsTexts.map((cellText, index) => (
            <Cell key={index}>{cellText}</Cell>
          ))}
        </Section>
      </List>
      <List style={{ width: 400, maxWidth: "100%", margin: "auto", background: "var(--tgui--secondary_bg_color)" }}>
        <Input header="Input" placeholder="I am usual input, just leave me alone" />
        <Input status="error" header="Input" placeholder="I am error input, don't make my mistakes..." />
        <Input status="focused" header="Input" placeholder="I am focused input, are u focused on me?" />
        <Input disabled header="Input" placeholder="I am disabled input" />
        <Input
          status="focused"
          header="Input"
          placeholder="Write and clean me"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          after={
            <div style={{ display: "flex", cursor: "pointer" }} onClick={() => setValue("")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          }
        />
      </List>
    </div>
  );
};

export default App;
