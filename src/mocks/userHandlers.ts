// mocks/userHandlers.ts
import {http, HttpResponse} from "msw";
import {User} from "../types/types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

interface GetUserRequestBody {
  userId: number;
  username: string;
}

export const userHandlers = [
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
