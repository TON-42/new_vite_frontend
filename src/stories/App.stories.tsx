import React from "react";
import {Meta, StoryObj} from "@storybook/react";
import App from "../App";
import {AppRoot} from "@telegram-apps/telegram-ui";
import {UserContext, UserProviderProps} from "../components/UserContext";
import {User} from "../types";
import "@telegram-apps/telegram-ui/dist/styles.css";
import "../index.css";
import "../App.css";

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

const meta: Meta<typeof App> = {
  title: "App/Full App Content",
  component: App,
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

export default meta;

type Story = StoryObj<typeof App>;

export const Default: Story = {
  args: {},
};
