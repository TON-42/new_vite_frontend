import {User} from "../types/types";

export const newUser: Partial<User> = {
  id: 2,
  name: "New User",
  chats: [],
  has_profile: false,
};

export const inviteeUser: Partial<User> = {
  id: 3,
  name: "Invitee User",
  chats: [],
  has_profile: false,
};

export const normalUser: Partial<User> = {
  id: 4,
  name: "Normal User",
  chats: [],
  has_profile: true,
};

inviteeUser.chats = [
  {
    lead: {
      id: 2,
      name: "New User",
    },
    agreed_users: [2],
    name: "New User",
    id: "2",
    status: "pending",
    words: 50,
    users: [{id: 2, name: "New User", chats: []}], // Simplified user info
  },
  {
    lead: {
      id: 1,
      name: "Lead User",
    },
    agreed_users: [1],
    name: "Lead User",
    id: "1",
    status: "pending",
    words: 230,
    users: [{id: 1, name: "Lead User", chats: []}], // Simplified user info
  },
  {
    lead: {
      id: 4,
      name: "Normal User",
    },
    agreed_users: [4],
    name: "Normal User",
    id: "4",
    status: "pending",
    words: 10,
    users: [{id: 4, name: "Normal User", chats: []}], // Simplified user info
  },
];

normalUser.chats = [
  {
    lead: {
      id: 4,
      name: "Normal User",
    },
    agreed_users: [1],
    name: "Chat with three users",
    id: "5",
    status: "pending",
    words: 100,
    users: [
      {id: 4, name: "Normal User", chats: []},
      {id: 2, name: "New User", chats: []},
      {id: 1, name: "Lead User", chats: []},
    ],
  },
  {
    lead: {
      id: 1,
      name: "Lead User",
    },
    agreed_users: [4],
    name: "Lead User Lead Chat",
    id: "6",
    status: "pending",
    words: 200,
    users: [
      {id: 1, name: "Lead User", chats: []},
      {id: 4, name: "Normal User", chats: []},
    ],
  },
  {
    lead: {
      id: 2,
      name: "New User",
    },
    agreed_users: [1],
    name: "New User Lead Chat",
    id: "7",
    status: "pending",
    words: 150,
    users: [
      {id: 2, name: "New User", chats: []},
      {id: 1, name: "Lead User", chats: []},
      {id: 4, name: "Normal User", chats: []},
    ],
  },
];
