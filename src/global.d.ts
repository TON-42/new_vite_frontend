interface Window {
  Telegram: {
    WebApp: {
      initDataUnsafe?: {
        user?: {
          id: number; // A unique identifier for the user or bot.
          first_name: string; // First name of the user or bot.
          last_name?: string; // Optional. Last name of the user or bot.
          username?: string; // Optional. Username of the user or bot.
          language_code?: string; // Optional. IETF language tag of the user's language.
          is_bot?: boolean; // Optional. True, if this user is a bot.
          is_premium?: boolean; // Optional. True, if this user is a Telegram Premium user.
          added_to_attachment_menu?: boolean; // Optional. True, if this user added the bot to the attachment menu.
          allows_write_to_pm?: boolean; // Optional. True, if this user allowed the bot to message them.
          photo_url?: string; // Optional. URL of the user’s profile photo.
        };
      };
      ready: () => void;
    };
  };
}
