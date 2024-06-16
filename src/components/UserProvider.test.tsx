// UserProvider.test.tsx
import React, {useContext} from "react";
import {render, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {UserProvider, UserContext} from "./UserProvider";
import {getUserDataFromTelegram, getUserDataFromBackend} from "../utils/utils";
import {User} from "../types";

// Mock the utility functions
jest.mock("../utils/utils", () => ({
  getUserDataFromTelegram: jest.fn(),
  getUserDataFromBackend: jest.fn(),
}));

const mockUserDataFromTelegram = {
  id: 1,
  name: "Test User",
};

const mockUserDataFromBackend = {
  chats: [
    {id: 1, name: "Chat 1", words: 100},
    {id: 2, name: "Chat 2", words: 200},
  ],
  telephoneNumber: "123-456-7890",
};

// Helper component to test the context values
const TestComponent: React.FC = () => {
  const context = useContext(UserContext);

  if (!context) {
    return <div>No context</div>;
  }

  const {user} = context;

  return (
    <div>
      <div>{`User ID: ${user.id}`}</div>
      <div>{`User Name: ${user.name}`}</div>
      <div>{`Chats: ${user.chats.map(chat => chat.name).join(", ")}`}</div>
    </div>
  );
};

describe("UserProvider", () => {
  beforeEach(() => {
    // Mock the implementations
    (getUserDataFromTelegram as jest.Mock).mockReturnValue(
      mockUserDataFromTelegram,
    );
    (getUserDataFromBackend as jest.Mock).mockResolvedValue(
      mockUserDataFromBackend,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("provides user data from context", async () => {
    const {getByText} = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    );

    // Wait for the useEffect to complete
    await waitFor(() => {
      expect(getByText("User ID: 1")).toBeInTheDocument();
      expect(getByText("User Name: Test User")).toBeInTheDocument();
      expect(getByText("Chats: Chat 1, Chat 2")).toBeInTheDocument();
    });
  });
});
