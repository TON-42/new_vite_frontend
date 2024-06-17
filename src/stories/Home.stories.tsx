// src/stories/Home.stories.tsx
import {Meta, StoryObj} from "@storybook/react";
import {UserProvider} from "../components/UserContext";
import Home from "../components/Home";
import {UserContextProps} from "../components/UserContext";

// Mock User Context
const mockUserContext: UserContextProps = {
  user: {
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
  },
  setUser: () => {},
};

const meta: Meta<typeof Home> = {
  title: "Home/Invitee",
  component: Home,
  decorators: [
    Story => (
      <UserProvider value={mockUserContext}>
        <Story />
      </UserProvider>
    ),
  ],
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    setCurrentTab: (tabId: string) => console.log(`Switching to tab: ${tabId}`),
  },
};
