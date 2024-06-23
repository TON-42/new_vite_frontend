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
    const mockChats: {[key: string]: number} = {
      "(1, 'John Doe')": 100,
      "(2, 'Jane Smith')": 200,
    }; // Example mock data
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
