// mocks/messageHandlers.ts
import {http, HttpResponse} from "msw";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface SendMessageRequestBody {
  chatId: number;
  message: string;
}

export const messageHandlers = [
  http.post(`${backendUrl}/send-message`, async ({request}) => {
    const json = await request.json();

    if (!json || typeof json !== "object") {
      return new HttpResponse("Invalid request body", {
        status: 400,
        headers: {"Content-Type": "application/json"},
      });
    }

    const body = json as SendMessageRequestBody;
    // Simulate sending message
    console.log(`Message sent to chat ${body.chatId}: ${body.message}`);

    return new HttpResponse("Message sent", {
      status: 200,
      headers: {"Content-Type": "application/json"},
    });
  }),
];
