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

  const statusCode = import.meta.env.VITE_DEBUG_ENDPOINT_CODE || 500;

  if (import.meta.env.VITE_DEBUG_ENDPOINT === "send-code") {
    return new HttpResponse(
      JSON.stringify({error: "Debugging mode: Forced error"}),
      {
        status: statusCode,
        headers: {"Content-Type": "application/json"},
      },
    );
  }

  console.log(`Code sent to phone number: ${body.phone}`);

  return new HttpResponse("Code sent", {
    status: 200,
    headers: {"Content-Type": "application/json"},
  });
};
