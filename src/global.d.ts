interface Window {
  Telegram: {
    WebApp: {
      initDataUnsafe?: {
        user?: {
          id: number;
          first_name: string;
          [key: string]: any;
        };
      };
      ready: () => void;
    };
  };
}
