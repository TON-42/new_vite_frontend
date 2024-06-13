import React from "react";

export const HardcodedUser = () => {
  const hardcodedUser = {
    id: 98765432,
    name: "John Doe",
    status: "active",
    telephoneNumber: "1234567890",
    chats: [
      {
        lead_id: 1,
        agreed_users: [1, 2],
        name: "Chat 1",
        id: 98765432,
        status: "active",
        words: 100,
        users: [
          {
            id: 98765432,
            name: "Jane Smith",
            status: "active",
            telephoneNumber: "9876543210",
          },
        ],
      },
      {
        lead_id: 98765432,
        agreed_users: [3],
        name: "Chat 2",
        id: 98765432,
        status: "inactive",
        words: 200,
        users: [
          {
            id: 98765432,
            name: "Alice Johnson",
            status: "inactive",
            telephoneNumber: "5555555555",
          },
        ],
      },
    ],
  };

  return hardcodedUser;
};
