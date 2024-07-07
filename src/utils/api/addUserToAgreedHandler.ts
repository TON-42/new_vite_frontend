export interface AddUserToAgreedHandlerProps {
  selectedChats: {userId: number; chatId: string}[];
  backendUrl: string;
}

interface CustomError extends Error {
  status?: number;
}

export const addUserToAgreedHandler = async ({
  selectedChats,
  backendUrl,
}: AddUserToAgreedHandlerProps): Promise<{[key: string]: string}> => {
  try {
    const response = await fetch(`${backendUrl}/add-user-to-agreed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedChats),
    });

    console.log("Body:", JSON.stringify(selectedChats));
    console.log("add-user-to-agreed response:", response);

    if (response.status === 200) {
      const result = await response.json();
      return result as {[key: string]: string};
    } else {
      const errorMessage = await response.text();
      throw {message: errorMessage, status: response.status} as CustomError;
    }
  } catch (error) {
    const customError = error as CustomError;
    console.error("Error sending agreement:", customError);
    throw customError;
  }
};
