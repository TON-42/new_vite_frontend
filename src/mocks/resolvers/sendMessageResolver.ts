import {HttpResponse} from "msw";
import {CustomError} from "../../types/types";

interface SendMessageRequestBody {
  chats: {[key: string]: number};
  phone_number: string;
  message: string;
}

export const sendMessageResolver = async ({request}: {request: Request}) => {
  try {
    const json = await request.json();

    if (!json || typeof json !== "object") {
      const error: CustomError = new Error("Invalid request body");
      error.status = 400;
      throw error;
    }

    const body = json as SendMessageRequestBody;
    const {chats} = body;

    if (!chats || Object.keys(chats).length === 0) {
      const error: CustomError = new Error("No chats were sent");
      error.status = 400;
      throw error;
    }

    const statusCode = import.meta.env.VITE_DEBUG_ENDPOINT_CODE || 500;

    if (import.meta.env.VITE_DEBUG_ENDPOINT === "send-message") {
      const error: CustomError = new Error("Debugging mode: Forced error");
      error.status = statusCode;
      throw error;
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

    const response = {
      User: generatedNames,
    };

    //   return new HttpResponse(JSON.stringify(generatedNames), {
    //     status: 200,
    //     headers: {"Content-Type": "application/json"},
    //   });
    return new HttpResponse(JSON.stringify(response), {
      status: 200,
      headers: {"Content-Type": "application/json"},
    });
  } catch (error) {
    const customError = error as CustomError;
    return new HttpResponse(JSON.stringify({error: customError.message}), {
      status: customError.status || 500,
      headers: {"Content-Type": "application/json"},
    });
  }
};
