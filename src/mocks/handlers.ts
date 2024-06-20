import {http, HttpResponse} from "msw";
import {User} from "../src/types";

interface GetUserRequestBody {
  userId: number;
  username: string;
}

const backendUrl =
  process.env.REACT_APP_BACKEND_URL ||
  "https://daniilbot-k9qlu.ondigitalocean.app";

const leadUser: Partial<User> = {
  id: 1,
  name: "John Doe",
  chats: [
    {
      lead_id: 1,
      agreed_users: [2, 3],
      name: "Chat with Team",
      id: 1,
      status: "active",
      words: 120,
      users: [],
    },
  ],
  has_profile: true,
};

const newUser: Partial<User> = {
  id: 2,
  name: "New User",
  chats: [],
  has_profile: false,
};

const inviteeUser: Partial<User> = {
  id: 3,
  name: "Invitee User",
  chats: [
    {
      lead_id: 2,
      agreed_users: [1],
      name: "Invitee Chat",
      id: 2,
      status: "pending",
      words: 50,
      users: [],
    },
  ],
  has_profile: false,
};

export const handlers = [
  http.post(`${backendUrl}/get-user`, async ({request}) => {
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
        return HttpResponse.json(leadUser);
      case 2:
        return HttpResponse.json(newUser);
      case 3:
        return HttpResponse.json(inviteeUser);
      default:
        return new HttpResponse("User not found", {
          status: 404,
          headers: {"Content-Type": "application/json"},
        });
    }
  }),
];
