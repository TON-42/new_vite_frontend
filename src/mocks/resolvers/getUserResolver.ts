import {HttpResponse} from "msw";
import {User} from "../../types/types";
import {createLeadUser} from "../../utils/createLeadUser";
// import {newUser, inviteeUser, normalUser} from "../../utils/users";

interface GetUserRequestBody {
  userId: number;
  username: string;
}

// Note 1. The leadUser is created by createLeadUser in createUsers.ts
// Note 2. We have simplified users info in chats (in the users array) to avoid circular references

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
// const newUser: Partial<User> = {
//   id: 2,
//   name: "New User",
//   chats: [],
//   has_profile: false,
// };

// const inviteeUser: Partial<User> = {
//   id: 3,
//   name: "Invitee User",
//   chats: [],
//   has_profile: false,
// };

// const normalUser: Partial<User> = {
//   id: 4,
//   name: "Normal User",
//   chats: [],
//   has_profile: true,
// };

const newAuthCodeUser: Partial<User> = {
  id: 5,
  name: "AuthCode User",
  chats: [],
  has_profile: false,
  auth_status: "auth_code",
};

const newChooseChatUser: Partial<User> = {
  id: 6,
  name: "ChooseChat User",
  chats: [],
  has_profile: true,
  auth_status: "choose_chat",
};

inviteeUser.chats = [
  {
    lead: {
      id: 2,
      name: "New User",
    },
    agreed_users: [2],
    name: "New User",
    id: "102",
    status: "pending",
    words: 50,
    users: [
      {id: 1, name: "Lead User", chats: []},
      {id: 3, name: "Invitee User", chats: []},
    ],
  },
  {
    lead: {
      id: 1,
      name: "Lead User",
    },
    agreed_users: [1],
    name: "Lead User",
    id: "301",
    status: "pending",
    words: 230,
    users: [
      {id: 1, name: "Lead User", chats: []},
      {id: 3, name: "Invitee User", chats: []},
      {id: 4, name: "Normal User", chats: []},
    ],
  },
  {
    lead: {
      id: 4,
      name: "Normal User",
    },
    agreed_users: [4],
    name: "Normal User",
    id: "467",
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
// inviteeUser.chats = [
//   {
//     lead: {
//       id: 2,
//       name: "New User",
//     },
//     agreed_users: [2],
//     name: "New User",
//     id: "2",
//     status: "pending",
//     words: 50,
//     users: [{id: 2, name: "New User", chats: []}], // Simplified user info
//   },
//   {
//     lead: {
//       id: 1,
//       name: "Lead User",
//     },
//     agreed_users: [1],
//     name: "Lead User",
//     id: "1",
//     status: "pending",
//     words: 230,
//     users: [{id: 1, name: "Lead User", chats: []}], // Simplified user info
//   },
//   {
//     lead: {
//       id: 4,
//       name: "Normal User",
//     },
//     agreed_users: [4],
//     name: "Normal User",
//     id: "4",
//     status: "pending",
//     words: 10,
//     users: [{id: 4, name: "Normal User", chats: []}], // Simplified user info
//   },
// ];

// normalUser.chats = [
//   {
//     lead: {
//       id: 4,
//       name: "Normal User",
//     },
//     agreed_users: [1],
//     name: "Chat with three users",
//     id: "5",
//     status: "pending",
//     words: 100,
//     users: [
//       {id: 4, name: "Normal User", chats: []},
//       {id: 2, name: "New User", chats: []},
//       {id: 1, name: "Lead User", chats: []},
//     ],
//   },
//   {
//     lead: {
//       id: 1,
//       name: "Lead User",
//     },
//     agreed_users: [4],
//     name: "Lead User Lead Chat",
//     id: "6",
//     status: "pending",
//     words: 200,
//     users: [
//       {id: 1, name: "Lead User", chats: []},
//       {id: 4, name: "Normal User", chats: []},
//     ],
//   },
//   {
//     lead: {
//       id: 2,
//       name: "New User",
//     },
//     agreed_users: [1],
//     name: "New User Lead Chat",
//     id: "7",
//     status: "pending",
//     words: 150,
//     users: [
//       {id: 2, name: "New User", chats: []},
//       {id: 1, name: "Lead User", chats: []},
//       {id: 4, name: "Normal User", chats: []},
//     ],
//   },
// ];

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

  const statusCode = import.meta.env.VITE_DEBUG_ENDPOINT_CODE || 500;

  if (import.meta.env.VITE_DEBUG_ENDPOINT === "get-user") {
    return new HttpResponse(
      JSON.stringify({error: "Debugging mode: Forced error"}),
      {
        status: statusCode,
        headers: {"Content-Type": "application/json"},
      },
    );
  }

  switch (userId) {
    case 1:
      return HttpResponse.json(getLeadUser());
    case 2:
      return HttpResponse.json(newUser);
    case 3:
      return HttpResponse.json(inviteeUser);
    case 4:
      return HttpResponse.json(normalUser);
    case 5:
      return HttpResponse.json(newAuthCodeUser);
    case 6:
      return HttpResponse.json(newChooseChatUser);
    default:
      return new HttpResponse("User not found", {
        status: 404,
        headers: {"Content-Type": "application/json"},
      });
  }
};
