import {HttpResponse} from "msw";

interface LoginRequestBody {
  phone: string;
  code: string;
  user_id: string;
}

export const loginResolver = async ({request}: {request: Request}) => {
  const json = await request.json();

  if (!json || typeof json !== "object") {
    return new HttpResponse("Invalid request body", {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }

  const body = json as LoginRequestBody;
  const {phone, code, user_id} = body;

  console.log("phone:", phone);
  console.log("code:", code);
  console.log("user_id:", user_id);

  const statusCode = import.meta.env.VITE_DEBUG_ENDPOINT_CODE || 500;

  if (import.meta.env.VITE_DEBUG_ENDPOINT === "login") {
    return new HttpResponse(
      JSON.stringify({error: "Debugging mode: Forced error"}),
      {
        status: statusCode,
        headers: {"Content-Type": "application/json"},
      },
    );
  }

  if (code === "12345") {
    const numChatsToSell = parseInt(
      import.meta.env.VITE_NUM_CHATS_TO_SELL || "2",
      10,
    );
    const mockChats: {[key: string]: number} = {};
    for (let i = 1; i <= numChatsToSell; i++) {
      mockChats[`(${i}, 'User ${i}')`] = 100 * i;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    return new HttpResponse(JSON.stringify(mockChats), {
      status: 200,
      headers: {"Content-Type": "application/json"},
    });
  } else {
    return new HttpResponse("user is already logged in", {
      status: 409,
      headers: {"Content-Type": "application/json"},
    });
  }
};
