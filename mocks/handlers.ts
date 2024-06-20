import {http, HttpResponse} from "msw";
import {User} from "../src/types";

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
  http.get("/api/user", ({request}) => {
    const userType = request.url.searchParams.get("type");
    switch (userType) {
      case "userWithProfileAndChats":
        return HttpResponse.json(userWithProfileAndChats);
      case "newUser":
        return HttpResponse.json(newUser);
      case "inviteeUser":
        return HttpResponse.json(inviteeUser);
      default:
        return HttpResponse.status(400).json({error: "Invalid user type"});
    }
  }),
  rest.post(`${backendUrl}/get-user`, (req, res, ctx) => {
    const {userId} = JSON.parse(req.body as string);
    switch (userId) {
      case 1:
        return res(ctx.json(leadUser));
      case 2:
        return res(ctx.json(newUser));
      case 3:
        return res(ctx.json(inviteeUser));
      default:
        return res(ctx.status(404), ctx.json({error: "User not found"}));
    }
  }),
];
