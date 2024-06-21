interface EventData {
  id: number;
  value: string;
}

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_bot?: boolean;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

interface TelegramWebApp {
  initDataUnsafe?: {
    user?: TelegramUser;
  };
  ready: () => void;
  onEvent: (event: string, callback: (data: EventData) => void) => void;
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}
