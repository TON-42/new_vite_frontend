import {HttpResponse} from "msw";

interface addUserToAgreedRequestBody {
  userId: number;
  chatId: number;
}

export const addUserToAgreedResolver = async ({
  request,
}: {
  request: Request;
}) => {
  const json = await request.json();

  if (!json || typeof json !== "object") {
    return new HttpResponse("Invalid request body", {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }
  const body = json as addUserToAgreedRequestBody;
  if (!body.userId || !body.chatId) {
    return (
      new HttpResponse("userId is missing"),
      {
        status: 400,
        headers: {"Content-Type": "application/json"},
      }
    );
  }

  try {
    // example mock data
    const mockChats: {[key: string]: string} = {
      "2124": "pending",
      "545646": "error",
      "12345": "sold",
    };

    return new HttpResponse(JSON.stringify(mockChats), {
      status: 200,
      headers: {"Content-Type": "application/json"},
    });
  } catch (error) {
    return new HttpResponse(JSON.stringify({error: "Internal error"}), {
      status: 500,
      headers: {"Content-Type": "application/json"},
    });
  }
};
