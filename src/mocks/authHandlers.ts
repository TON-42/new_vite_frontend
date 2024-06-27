// mocks/authHandlers.ts
import {http, HttpResponse} from "msw";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface LoginRequestBody {
  phone: string;
  code: string;
}

export const authHandlers = [
  http.post(`${backendUrl}/login`, async ({request}) => {
    const json = await request.json();

    if (!json || typeof json !== "object") {
      return new HttpResponse("Invalid request body", {
        status: 400,
        headers: {"Content-Type": "application/json"},
      });
    }

    const body = json as LoginRequestBody;
    console.log(
      `Login attempt with phone: ${body.phone} and code: ${body.code}`,
    );

    if (body.code === "12345") {
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
