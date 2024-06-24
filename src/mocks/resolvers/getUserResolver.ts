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

const newUser: Partial<User> = const users = [
  {
    id: 4,
    name: "TechSavvy Sam",
    chats: [],
    has_profile: false,
  },
  {
    id: 5,
    name: "DailyGrind Dave",
    chats: [],
    has_profile: false,
  },
  {
    id: 6,
    name: "CryptoQueen Carol",
    chats: [],
    has_profile: true,
  },
  {
    id: 7,
    name: "MemeMaster Mike",
    chats: [],
    has_profile: false,
  },
  {
    id: 8,
    name: "FitnessFreak Fiona",
    chats: [],
    has_profile: true,
  },
  {
    id: 9,
    name: "DataNerd Diana",
    chats: [],
    has_profile: false,
  },
  {
    id: 10,
    name: "CoderChris",
    chats: [],
    has_profile: true,
  },
  {
    id: 11,
    name: "PlantParent Patty",
    chats: [],
    has_profile: false,
  },
  {
    id: 12,
    name: "GameGuru Greg",
    chats: [],
    has_profile: true,
  },
  {
    id: 13,
    name: "Bookworm Betty",
    chats: [],
    has_profile: false,
  }
];


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
