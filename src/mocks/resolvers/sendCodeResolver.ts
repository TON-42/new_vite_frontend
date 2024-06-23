// mocks/authHandlers.ts
import {HttpResponse} from "msw";

interface SendCodeRequestBody {
  phone: string;
}

export const sendCodeResolver = async ({request}: {request: Request}) => {
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
};
