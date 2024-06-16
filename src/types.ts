// Define the Chat and User interfaces
export interface Chat {
  lead_id: number;
  agreed_users: number[];
  name: string;
  id: number;
  status: string;
  words: number;
  users: User[];
}

export interface User {
  id: number;
  name?: string;
  status?: string;
  users?: number[];
  words?: number[];
  has_profile?: boolean;
  telephoneNumber?: string;
  chats: Chat[];
  // isLoggedIn: boolean;
}
