// mocks/authHandlers.ts
import {http, HttpResponse} from "msw";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL ||
  "https://daniilbot-k9qlu.ondigitalocean.app";

interface SendCodeRequestBody {
  phone: string;
}

interface LoginRequestBody {
  phone: string;
  code: string;
}

export const authHandlers = [
  http.post(`${backendUrl}/send-code`, async ({request}) => {
    const json = await request.json();

    if (!json || typeof json !== "object") {
      return new HttpResponse("Invalid request body", {
        status: 400,
        headers: {"Content-Type": "application/json"},
      });
    }

    const body = json as SendCodeRequestBody;
    // Simulate sending code
    console.log(`Code sent to phone number: ${body.phone}`);

    return new HttpResponse("Code sent", {
      status: 200,
      headers: {"Content-Type": "application/json"},
    });
  }),

  http.post(`${backendUrl}/login`, async ({request}) => {
    const json = await request.json();

    if (!json || typeof json !== "object") {
      return new HttpResponse("Invalid request body", {
        status: 400,
        headers: {"Content-Type": "application/json"},
      });
    }

    const body = json as LoginRequestBody;
    // Simulate login process
    console.log(
      `Login attempt with phone: ${body.phone} and code: ${body.code}`,
    );

    if (body.code === "1234") {
      // Example code validation
      return new HttpResponse("Login successful", {
        status: 200,
        headers: {"Content-Type": "application/json"},
      });
    } else {
      return new HttpResponse("Invalid code", {
        status: 401,
        headers: {"Content-Type": "application/json"},
      });
    }
  }),
];
