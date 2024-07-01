import {HttpResponse} from "msw";

interface LoginRequestBody {
  phone: string;
  code: string;
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
  // TODO: Let the mock function collect the code from the component
  //   body.phone = "12345";
  const {phone, code} = body;
  console.log("phone:", phone);
  console.log("code:", code);
  if (code === "12345") {
    const numChatsToSell = parseInt(
      import.meta.env.VITE_NUM_CHATS_TO_SELL || "2",
      10,
    );
    const mockChats: {[key: string]: number} = {};
    for (let i = 1; i <= numChatsToSell; i++) {
      mockChats[`(${i}, 'User ${i}')`] = 100 * i;
    } // Example mock data

    // Add a 3-second delay before returning the mock chats
    await new Promise(resolve => setTimeout(resolve, 3000));

    return new HttpResponse(JSON.stringify(mockChats), {
      status: 200,
      headers: {"Content-Type": "application/json"},
    });
  } else {
    return new HttpResponse("Invalid code", {
      status: 401,
      headers: {"Content-Type": "application/json"},
    });
  }
};
