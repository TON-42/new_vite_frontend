// // Define the Chat and User interfaces
// export interface Chat {
//   lead_id: number;
//   agreed_users: number[];
//   name: string;
//   id: number;
//   status: string;
//   words: number;
//   users: User[];
// }

// // Define the User interface to include general and Telegram-specific properties
// // export interface User {
// //   id: number;
// //   first_name?: string; // Added for Telegram user compatibility
// //   last_name?: string; // Added for Telegram user compatibility
// //   username?: string; // Added for Telegram user compatibility
// //   language_code?: string; // Added for Telegram user compatibility
// //   is_bot?: boolean; // Added for Telegram user compatibility
// //   is_premium?: boolean; // Added for Telegram user compatibility
// //   added_to_attachment_menu?: boolean; // Added for Telegram user compatibility
// //   allows_write_to_pm?: boolean; // Added for Telegram user compatibility
// //   phone_number?: string; // Added for Telegram user compatibility
// //   photo_url?: string; // Added for Telegram user compatibility
// //   name?: string; // Original properties
// //   status?: string;
// //   users?: number[];
// //   words?: number[];
// //   has_profile?: boolean;
// //   telephoneNumber?: string;
// //   chats: Chat[];
// // }

// // src/types/app-types.d.ts

// // Define the Chat interface for your application
// export interface Chat {
//   lead_id: number;
//   agreed_users: number[];
//   name: string;
//   id: number;
//   status: string;
//   words: number;
//   users: User[];
// }

// // Define the User interface with application-specific properties
// export interface User {
//   id: number;
//   name?: string;
//   status?: string;
//   users?: number[];
//   words?: number[];
//   has_profile?: boolean;
//   telephoneNumber?: string;
//   chats: Chat[];
// }

// // Define the TelegramUser interface with required Telegram-specific properties
// export interface TelegramUser extends User {
//   first_name: string; // Required for Telegram user compatibility
//   last_name?: string;
//   username?: string;
//   language_code?: string;
//   is_bot?: boolean;
//   is_premium?: boolean;
//   added_to_attachment_menu?: boolean;
//   allows_write_to_pm?: boolean;
//   phone_number?: string;
//   photo_url?: string;
// }

// // Define the type for event callback data
// export type EventCallback = (data: {theme?: string}) => void;

// // Define the TelegramWebApp interface
// export interface TelegramWebApp {
//   initDataUnsafe?: {
//     user?: TelegramUser; // Use TelegramUser type
//   };
//   ready: () => void;
//   onEvent: (event: string, callback: EventCallback) => void;
//   offEvent: (event: string, callback: EventCallback) => void;
// }

// // Declare global augmentation for the Window interface
// declare global {
//   interface Window {
//     Telegram: {
//       WebApp: TelegramWebApp;
//     };
//   }
// }

// src/types/app-types.d.ts

// Define the Chat interface for your application
export interface Chat {
  lead_id: number;
  agreed_users: number[];
  name: string;
  id: number;
  status: string;
  words: number;
  users: User[];
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
