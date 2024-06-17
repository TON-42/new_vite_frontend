import {Meta, StoryObj} from "@storybook/react";
import Home from "../components/Home";

const meta: Meta<typeof Home> = {
  title: "Home/Invitee",
  component: Home,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    setCurrentTab: (tabId: string) => console.log(`Switching to tab: ${tabId}`),
  },
};
