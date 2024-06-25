import {HttpResponse} from "msw";

interface SendMessageRequestBody {
  chats: {[key: string]: number};
  phone_number: string;
  message: string;
}

export const sendMessageResolver = async ({request}: {request: Request}) => {
  const json = await request.json();

  if (!json || typeof json !== "object") {
    return new HttpResponse("Invalid request body", {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }

  const body = json as SendMessageRequestBody;
  const {chats} = body;

  if (!chats || Object.keys(chats).length === 0) {
    return new HttpResponse("No chats were sent", {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }

  const hardcodedNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Hannah",
    "Isaac",
    "Jack",
  ];
  const numberOfChats = Object.keys(chats).length;
  const generatedNames = Array.from(
    {length: numberOfChats},
    (_, index) => hardcodedNames[index % hardcodedNames.length],
  );

  return new HttpResponse(JSON.stringify(generatedNames), {
    status: 200,
    headers: {"Content-Type": "application/json"},
  });
};
