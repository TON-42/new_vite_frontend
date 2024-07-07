import {CustomError} from "../../types/types";

interface LoginHandlerProps {
  phone: string;
  pinString: string;
  backendUrl: string;
  userId: number;
  twoFACode?: string;
}

export const loginHandler = async ({
  phone,
  pinString,
  backendUrl,
  userId,
  twoFACode,
}: LoginHandlerProps): Promise<{[key: string]: number}> => {
  try {
    console.log("Verifying code:", pinString);
    const requestDetails = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phone,
        code: pinString,
        userId: userId,
        password: twoFACode,
      }),
    };
    // console.log("Sending request to:", `${backendUrl}/login`, requestDetails); // Log the request details

    const response = await fetch(`${backendUrl}/login`, requestDetails);

    if (response.status === 401) {
      console.log("2FA required");
      const error: CustomError = new Error("2FA required");
      error.status = 401;
      throw error;
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error message:", errorMessage);
      const error: CustomError = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    const responseData: {[key: string]: number} = await response.json();
    console.log("Response data:", responseData); // Log the response data
    return responseData;
  } catch (error) {
    console.error("Error verifying code:", error);
    throw error;
  }
};
