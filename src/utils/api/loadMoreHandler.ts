import { CustomError } from "@/types/types";
import { Chat } from "@/types/types";

export const loadMoreHandler = async({
	Chat[],
	backendUrl,
}: LoadMoreHandlerProps): Promise<Chat[]> => {



	//return an array of additional chats