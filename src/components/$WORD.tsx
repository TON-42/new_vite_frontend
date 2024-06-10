import React from "react";
import {
  Button,
  Image,
  List,
  Section,
  Cell,
  Input,
} from "@telegram-apps/telegram-ui"; // Ensure all components are imported correctly
import telegramLogo from "../assets/logo/telegram.png";
import discordLogo from "../assets/logo/discord-logo.png";
import twitterLogo from "../assets/logo/x.png";

const $WORD: React.FC = () => {
  const styles = {
    container: {
      color: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid white",
      padding: "16px",
      boxSizing: "border-box" as "border-box",
    },
    list: {
      background: "var(--tgui--secondary_bg_color)",
      padding: "40px",
      width: "100%",
      maxWidth: "500px",
      margin: "auto",
      boxSizing: "border-box" as "border-box",
    },
    cell: {
      display: "flex",
      alignItems: "center",
      marginBottom: "16px",
    },
    image: {
      marginRight: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <List style={styles.list}>
        <Section
          footer="The official Telegram app is available for Android, iPhone, iPad, Windows, macOS and Linux."
          header="Main Settings"
        >
          <Cell
            before={<Image src={telegramLogo} size={48} style={styles.image} />}
          >
            Chat Settings
          </Cell>
          <Cell
            before={<Image src={discordLogo} size={48} style={styles.image} />}
          >
            Data and Storage
          </Cell>
          <Cell
            before={<Image src={twitterLogo} size={48} style={styles.image} />}
          >
            Devices
          </Cell>
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

export default $WORD;
