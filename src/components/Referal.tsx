import React from "react";
import {
  Button,
  Image,
  List,
  Section,
  Cell,
  IconContainer,
  Input,
} from "@telegram-apps/telegram-ui"; // Ensure all components are imported correctly
import telegramLogo from "../assets/logo/telegram.png";
import discordLogo from "../assets/logo/discord-logo.png";
import twitterLogo from "../assets/logo/x.png";
// import { Icon28Chat, Icon28Devices, Icon28Stats } from "@vkontakte/icons"; // Ensure you have these icons

const Referal: React.FC = () => {
  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center border-2 border-white space-y-4 p-4">
      <List
        style={{
          background: "var(--tgui--secondary_bg_color)",
          padding: "40px",
          width: "100%",
          maxWidth: "500px",
          margin: "auto",
        }}
      >
        <Section
          footer="The official Telegram app is available for Android, iPhone, iPad, Windows, macOS and Linux."
          header="Main Settings"
        >
          <Cell before={<Image src={telegramLogo} size={48} />}>
            Chat Settings
          </Cell>
          <Cell before={<Image src={discordLogo} size={48} />}>
            Data and Storage
          </Cell>
          <Cell before={<Image src={twitterLogo} size={48} />}>Devices</Cell>
        </Section>

        <Section
          footer="The official Telegram app is available for Android, iPhone, iPad, Windows, macOS and Linux."
          header="Personal Information"
        >
          <Input header="First name" placeholder="Enter your first name" />
          <Input header="Last name" placeholder="Enter your last name" />
        </Section>
      </List>
    </div>
  );
};

export default Referal;
