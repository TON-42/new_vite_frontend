import {Chat} from "../../types/types";

interface LoginHandlerProps {
  phone: string;
  pinString: string;
  backendUrl: string;
}

interface HandleLoginResponseProps {
  responseData: {[key: string]: number};
}

const transformData = (data: {[key: string]: number}): Chat[] => {
  const chats: Chat[] = [];

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const keyParts = key.match(/\((\d+), '(.+?)'\)/);
      if (keyParts && keyParts.length === 3) {
        const userId = parseInt(keyParts[1], 10); // Parse id as number
        const userName = keyParts[2];
        const words = data[key];

        chats.push({
          id: userId,
          name: userName,
          words,
          lead_id: 0, // Default or modify as needed
          agreed_users: [], // Default or modify as needed
          status: "", // Default or modify as needed
          users: [], // Default or modify as needed
        });
      }
    }
  }

  return chats;
};

export const handleLoginResponse = ({
  responseData,
}: HandleLoginResponseProps) => {
  return transformData(responseData);
};

export const loginHandler = async ({
  phone,
  pinString,
  backendUrl,
}: LoginHandlerProps): Promise<Chat[]> => {
  try {
    console.log("Verifying code:", pinString);
    const response = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phone,
        code: pinString,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error message:", errorMessage);
      throw new Error(errorMessage);
    }

    const responseData: {[key: string]: number} = await response.json();
    console.log(responseData);
    return handleLoginResponse({
      responseData,
    });
  } catch (error) {
    console.error("Error verifying code:", error);
    throw new Error("Error verifying code: " + error);
  }
};
