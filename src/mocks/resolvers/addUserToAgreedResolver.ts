import {HttpResponse} from "msw";

interface AddUserToAgreedRequestBody {
  userId: number;
  chatId: number;
}

export const addUserToAgreedResolver = async ({
  request,
}: {
  request: Request;
}) => {
  const json = await request.json();
  console.log(json);

  if (!json || typeof json !== "object") {
    return new HttpResponse("Invalid request body", {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }

  const statusCode = import.meta.env.VITE_DEBUG_ENDPOINT_CODE || 500;

  if (import.meta.env.VITE_DEBUG_ENDPOINT === "add-user-to-agreed") {
    return new HttpResponse(
      JSON.stringify({error: "Debugging mode: Forced error"}),
      {
        status: statusCode,
        headers: {"Content-Type": "application/json"},
      },
    );
  }

  let bodyArray: AddUserToAgreedRequestBody[] = [];

  if (Array.isArray(json)) {
    bodyArray = json as AddUserToAgreedRequestBody[];
  } else {
    bodyArray.push(json as AddUserToAgreedRequestBody);
  }

  for (const body of bodyArray) {
    if (!body.userId || !body.chatId) {
      console.log(body);
      const missingField = !body.userId ? "userId" : "chatId";
      console.log(missingField);
      return new HttpResponse(
        JSON.stringify({message: `${missingField} is missing`}),
        {
          status: 400,
          headers: {"Content-Type": "application/json"},
        },
      );
    }
  }

  try {
    // example mock data for response
    // const mockChats: {[key: string]: string} = {
    //   "1": "pending",
    //   "2": "sold",
    //   "3": "pending",
    //   "4": "declined",
    // };
    const result: {[key: string]: string} = {};
    bodyArray.forEach(({chatId}) => {
      const isSold = Math.random() < 0.5;
      result[chatId] = isSold ? "sold" : "pending";
    });

    return new HttpResponse(JSON.stringify(result), {
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
