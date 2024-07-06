export interface AddUserToAgreedHandlerProps {
  selectedChats: {userId: number; chatId: string}[];
  backendUrl: string;
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
      throw new Error(`Server error: ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending agreement:", error);
    return {};
  }
};
