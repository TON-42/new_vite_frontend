import React from "react";
import {Preview} from "@storybook/react";
import {UserProviderProps, UserContext} from "../components/UserContext";
import {User} from "../types";
import {AppRoot} from "@telegram-apps/telegram-ui"; // Importing the AppRoot component from the Telegram UI
import "@telegram-apps/telegram-ui/dist/styles.css"; // Importing the Telegram UI styles

// Mock User Context
const mockUser: User = {
  id: 1,
  name: "Test User",
  telephoneNumber: "0000000001",
  has_profile: false,
  chats: [
    {
      id: 1,
      name: "Chat 1",
      lead_id: 2,
      agreed_users: [1, 2, 3],
      status: "active",
      words: 100,
      users: [],
    },
  ],
};

const MockUserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = React.useState<User>(mockUser);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <AppRoot>
        <MockUserProvider>
          <Story />
        </MockUserProvider>
      </AppRoot>
    ),
  ],
};

export default preview;
