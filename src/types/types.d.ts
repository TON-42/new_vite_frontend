// Define the Chat interface for your application
// The status we get from the backend can be 'sold', 'pending', or 'error'. Chats were the user is an invitee will be 'pending' but the lead_id will be different from the user's id.
export interface Chat {
  lead_id: number;
  agreed_users: number[];
  name: string;
  id: number;
  status: string;
  words: number;
  users: User[];
}

// Define the ChatStatus type
export type ChatStatus = {
  sold: string[];
  pending: string[];
  declined: string[];
};

// Define the ChatDetails type
export type ChatDetails = {
  [chatId: string]: {
    lead_name: string;
  };
};

// Define the response type for the fetchChatDetails function
export interface FetchChatDetailsResponse {
  chats: Chat[];
}

// Define the User interface with application-specific properties
export interface User {
  id: number;
  name?: string;
  status?: string;
  users?: number[];
  words?: number[];
  has_profile?: boolean;
  telephoneNumber?: string;
  auth_status?: string;
  chats: Chat[];
}

// Define the TelegramUser interface with required Telegram-specific properties
export interface TelegramUser extends User {
  first_name: string; // Required for Telegram user compatibility
  last_name?: string;
  username?: string;
  language_code?: string;
  is_bot?: boolean;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  phone_number?: string;
  photo_url?: string;
}

// Define the type for event callback data
export type EventCallback = (data: {theme?: string}) => void;

// Define the TelegramWebApp interface
export interface TelegramWebApp {
  initDataUnsafe?: {
    user?: TelegramUser; // Use TelegramUser type
  };
  ready: () => void;
  onEvent: (event: string, callback: EventCallback) => void;
  offEvent: (event: string, callback: EventCallback) => void;
}

// Declare global augmentation for the Window interface
declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}
