export interface SendMessageHandlerProps {
  selectedChats: {[key: string]: number};
  phoneNumber: string;
  message: string;
  backendUrl: string;
}

export const sendMessageHandler = async ({
  selectedChats,
  phoneNumber,
  message,
  backendUrl,
}: SendMessageHandlerProps): Promise<{[key: string]: string[]}> => {
  const requestBody = {
    chats: selectedChats,
    phone_number: phoneNumber,
    message: message,
  };
  console.log("Request Body:", JSON.stringify(requestBody, null, 2));

  try {
    const response = await fetch(`${backendUrl}/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error message:", errorMessage);
      throw new Error(errorMessage);
    }
    const data: {[key: string]: string[]} = await response.json();
    console.log("Message sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Error sending message: " + error);
  }
};
