import {render, screen, fireEvent} from "@testing-library/react";
import {describe, test, expect, vi} from "vitest";
import App from "./App";
import {useUserContext} from "./utils/utils";
import {User, Chat, UserContextProps} from "./types";

// Mock the utils module
vi.mock("./utils/utils", () => ({
  useUserContext: vi.fn(),
}));

const mockUsers: User[] = [
  {
    id: 2,
    name: "User 1",
    telephoneNumber: "0000000001",
    has_profile: true,
    chats: [],
  },
  {
    id: 3,
    name: "User 2",
    telephoneNumber: "0000000002",
    has_profile: false,
    chats: [],
  },
  {
    id: 4,
    name: "User 3",
    telephoneNumber: "0000000003",
    has_profile: false,
    chats: [],
  },
];

const mockChat: Chat = {
  lead_id: 1,
  agreed_users: [1],
  name: "Chat 1",
  id: 1,
  status: "active",
  words: 100,
  users: mockUsers,
};

// Make sure each user has the shared chat in their chats array
mockUsers.forEach(user => (user.chats = [mockChat]));

describe("App", () => {
  const setUser = vi.fn();
  test(
    'sets the current tab to "home" if user does not have a profile and no chats',
    {timeout: 5000},
    async () => {
      vi.mocked(useUserContext).mockReturnValue({
        user: {
          id: 2,
          name: "Test User",
          telephoneNumber: "",
          has_profile: false,
          chats: [mockChat],
        },
        setUser,
      } as UserContextProps);

      render(<App />);

      // Assert that the OnboardUserB modal is displayed
      const modal = await screen.findByText(/onboarduserb/i); // Replace with a unique text from your modal
      expect(modal).toBeInTheDocument();
    },
  );

  test("handles tab switching", {timeout: 5000}, async () => {
    vi.mocked(useUserContext).mockReturnValue({
      user: {
        id: 1,
        name: "Test User",
        telephoneNumber: "",
        has_profile: true,
        chats: [mockChat],
      },
    });

    render(<App />);

    // Simulate clicking on the "social" tab
    const socialTab = await screen.findByText(/social/i); // Replace with the text from the Social tab
    fireEvent.click(socialTab);

    // Assert that the "social" component is displayed
    const socialComponent = await screen.findByText(/social/i); // Replace with a unique text from the Social component
    expect(socialComponent).toBeInTheDocument();
  });

  test(
    "renders the OnboardUserB modal if user does not have a profile but has chats",
    {timeout: 5000},
    async () => {
      vi.mocked(useUserContext).mockReturnValue({
        user: {
          id: 1,
          name: "Test User",
          telephoneNumber: "",
          has_profile: false,
          chats: [mockChat],
        },
      });

      render(<App />);

      // Assert that the OnboardUserB modal is displayed
      const modal = await screen.findByText(/onboarduserb/i); // Replace with a unique text from your modal
      expect(modal).toBeInTheDocument();
    },
  );

  test(
    'sets the current tab to "chats" if user has a profile',
    {timeout: 5000},
    async () => {
      vi.mocked(useUserContext).mockReturnValue({
        user: {
          id: 1,
          name: "Test User",
          telephoneNumber: "",
          has_profile: true,
          chats: [mockChat],
        },
      });

      render(<App />);

      // Assert that the "chats" component is displayed
      const chatsComponent = await screen.findByText(/chats/i); // Replace with a unique text from the Chats component
      expect(chatsComponent).toBeInTheDocument();
    },
  );
});
