interface LoginHandlerProps {
  phone: string;
  pinString: string;
  backendUrl: string;
  userId: number;
}

export const loginHandler = async ({
  phone,
  pinString,
  backendUrl,
  userId,
}: LoginHandlerProps): Promise<{[key: string]: number}> => {
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
        user_id: userId,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error message:", errorMessage);
      throw new Error(errorMessage);
    }

    const responseData: {[key: string]: number} = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error verifying code:", error);
    throw new Error("Error verifying code: " + error);
  }
};
