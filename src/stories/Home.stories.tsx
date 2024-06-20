import React from "react";
import {Meta, StoryObj} from "@storybook/react";
import Home from "../components/Home";
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
  console.log("Rendering MockUserProvider with user:", user);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

const meta: Meta<typeof Home> = {
  title: "Home/Invitee",
  component: Home,
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

type Story = StoryObj<typeof Home>;

export const Default: Story = {
  args: {
    setCurrentTab: (tabId: string) => console.log(`Switching to tab: ${tabId}`),
  },
};
