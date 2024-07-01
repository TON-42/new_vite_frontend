import {HttpResponse} from "msw";
import {User} from "../../types/types";
import {createLeadUser} from "../createUsers";

interface GetUserRequestBody {
  userId: number;
  username: string;
}

// Note 1. The leadUser is created by createLeadUser in createUsers.ts
// Note 2. We have simiplified users info in chats (in the users array) to avoid circular references

const newUser: Partial<User> = {
  id: 2,
  name: "New User",
  chats: [],
  has_profile: false,
};

const inviteeUser: Partial<User> = {
  id: 3,
  name: "Invitee User",
  chats: [],
  has_profile: false,
};

const normalUser: Partial<User> = {
  id: 4,
  name: "Normal User",
  chats: [],
  has_profile: true,
};

inviteeUser.chats = [
  {
    lead_id: 1,
    agreed_users: [1],
    name: "Invitee Chat",
    id: 3,
    status: "pending",
    words: 50,
    users: [
      {id: 1, name: "Lead User", chats: []},
      {id: 3, name: "Invitee User", chats: []},
    ],
  },
  {
    lead_id: 1,
    agreed_users: [1, 4],
    name: "Chat à trois",
    id: 145,
    status: "pending",
    words: 230,
    users: [
      {id: 1, name: "Lead User", chats: []},
      {id: 3, name: "Invitee User", chats: []},
      {id: 4, name: "Normal User", chats: []},
    ],
  },
  {
    lead_id: 1,
    agreed_users: [1, 4],
    name: "Normal User",
    id: 478,
    status: "pending",
    words: 10,
    users: [
      {id: 1, name: "Lead User", chats: []},
      {id: 3, name: "Invitee User", chats: []},
      {id: 4, name: "Normal User", chats: []},
      {id: 5, name: "Some other User", chats: []},
    ],
  },
];

normalUser.chats = [
  {
    lead_id: 4,
    agreed_users: [1],
    name: "Normal User Lead Chat",
    id: 5,
    status: "pending",
    words: 100,
    // users: [normalUser as User, newUser as User, leadUser as User], // Cast to User
    users: [
      {id: 4, name: "Normal User", chats: []},
      {id: 2, name: "New User", chats: []},
      {id: 1, name: "Lead User", chats: []},
    ],
  },
  {
    lead_id: 1,
    agreed_users: [4],
    name: "Lead User Lead Chat",
    id: 6,
    status: "pending",
    words: 200,
    // users: [leadUser as User, normalUser as User], // Cast to User
    users: [
      {id: 1, name: "Lead User", chats: []},
      {id: 4, name: "Normal User", chats: []},
    ],
  },
  {
    lead_id: 2,
    agreed_users: [1],
    name: "New User Lead Chat",
    id: 7,
    status: "pending",
    words: 150,
    // users: [newUser as User, normalUser as User], // Cast to User
    users: [
      {id: 2, name: "New User", chats: []},
      {id: 1, name: "Lead User", chats: []},
      {id: 4, name: "Normal User", chats: []},
    ],
  },
];

const getLeadUser = () => {
  const numChats = parseInt(import.meta.env.VITE_NUM_CHATS || "1", 10);
  return createLeadUser(numChats);
};

export const getUserResolver = async ({request}: {request: Request}) => {
  const json = await request.json();

  if (!json || typeof json !== "object") {
    return new HttpResponse("Invalid request body", {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }
  const body = json as GetUserRequestBody;
  const {userId} = body;
  switch (userId) {
    case 1:
      return HttpResponse.json(getLeadUser());
    case 2:
      return HttpResponse.json(newUser);
    case 3:
      return HttpResponse.json(inviteeUser);
    case 4:
      return HttpResponse.json(normalUser);
    default:
      return new HttpResponse("User not found", {
        status: 404,
        headers: {"Content-Type": "application/json"},
      });
  }
};
