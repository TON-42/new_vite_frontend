import {User, Chat} from "../types/types";

// Array of possible user names
const possibleNames = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Hannah",
  "Ivy",
  "Jack",
  // Add more names as needed
];

// Generate a random name from the list
const getRandomName = () => {
  return possibleNames[Math.floor(Math.random() * possibleNames.length)];
};

// Generates a list of users for a chat, ensuring the lead user and agreed_users are included
const generateUsersForChat = (
  leadUserId: number,
  agreedUsers: number[],
  totalUsers: number,
): User[] => {
  const allUsers: User[] = [];

  // Ensure lead user is included first with "lead" status
  allUsers.push({
    id: leadUserId,
    name: "ThePrimegean",
    status: "lead",
    words: 987654,
    has_profile: true,
    telephoneNumber: "",
    chats: [],
  });

  // Ensure agreed_users are included with "invitee" status
  agreedUsers.forEach(id => {
    if (id !== leadUserId) {
      // Avoid adding the lead user again
      allUsers.push({
        id,
        name: `User ${id}`,
        status: "invitee",
        words: 0,
        has_profile: true,
        telephoneNumber: "",
        chats: [],
      });
    }
  });
  // Add additional users to meet the total user count if needed
  while (allUsers.length < totalUsers) {
    const id = allUsers.length + 1;
    const name = getRandomName();
    allUsers.push({
      id,
      name,
      status: "invitee",
      words: 0,
      has_profile: true,
      telephoneNumber: "",
      chats: [],
    });
  }

  return allUsers;
};

export const createLeadUser = (numChats: number): Partial<User> => {
  const statuses = ["pending", "sold", "declined"];

  const chats: Chat[] = Array.from({length: numChats}, (_, i) => ({
    lead: {
      id: 1,
      name: "ThePrimegean",
    },
    agreed_users: [1, 2, 3],
    name: `Chat ${i + 1}`,
    id: String(i + 1),
    status: statuses[i % statuses.length], // Rotate statuses
    words: (i + 1) * 10,
    users: generateUsersForChat(1, [2, 3], 5),
  }));

  return {
    id: 1,
    name: "ThePrimegean",
    has_profile: true,
    chats: chats,
    words: 123456,
  };
};
