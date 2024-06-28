import {HttpResponse} from "msw";
import {User} from "../../types/types";
import {createLeadUser} from "../createUsers";

interface GetUserRequestBody {
  userId: number;
  username: string;
}

const getLeadUser = () => {
  const numChats = parseInt(import.meta.env.VITE_NUM_CHATS || "1", 10);
  return createLeadUser(numChats);
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
      status: "sold",
      words: 50,
      users: [],
    },
    {
      lead_id: 3,
      agreed_users: [1],
      name: "Daniel",
      id: 3,
      status: "pending",
      words: 230,
      users: [],
    },
    {
      lead_id: 4,
      agreed_users: [1],
      name: "Stefano",
      id: 4,
      status: "declined",
      words: 10,
      users: [],
    },
  ],
  has_profile: false,
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
    default:
      return new HttpResponse("User not found", {
        status: 404,
        headers: {"Content-Type": "application/json"},
      });
  }
};
