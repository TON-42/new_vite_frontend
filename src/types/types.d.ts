// Define the Chat interface for your application
// The status we get from the backend can be 'sold', 'pending', or 'error'. Chats were the user is an invitee will be 'pending' but the lead_id will be different from the user's id.
// TODO: think about ir the "user" property in Chat needs to be of tyep User[] or could be just a number[]. get-user, get back a
export interface Chat {
  agreed_users: number[];
  id: string;
  lead: {
    id: number;
    name: string;
  };
  //   lead_id: number;
  //   name: string;
  name: string;
  status: string;
  users: User[];
  words: number;
}

// Define the User interface with application-specific properties
export interface User {
  auth_status?: string;
  chats: Chat[];
  has_profile?: boolean;
  id: number;
  name?: string;
  registration_date?: string;
  // TODO: for what is this status needed?
  status?: string;
  //   words?: number[];
  words?: number;
  // We get this from the User or from  window.Telegram.initDataUnsafe.user
  telephoneNumber?: string;
  chatsToSell?: {[key: string]: number}; // New property to hold the data returned by /login
  chatsToSellUnfolded?: Array<{
    userId: number;
    userName: string;
    status?: string;
    words: number;
  }>;
}

export interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  updateUserBalance: (points: number) => void;
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

// Interface to add Error code builtin js error
interface CustomError extends Error {
  status?: number;
}
