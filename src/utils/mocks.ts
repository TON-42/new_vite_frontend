import {TelegramUser, TelegramWebApp, EventCallback} from "../types/types";

export const setMockedTelegramUser = () => {
  if (import.meta.env.VITE_MOCK_USER === "true") {
    const userType = import.meta.env.VITE_USER_TYPE;

    let user: TelegramUser; // Ensure the user is of type TelegramUser
    switch (userType) {
      case "lead":
        user = {
          id: 1,
          first_name: "Lead",
          last_name: "User",
          chats: [],
          has_profile: true,
        };
        break;
      case "new":
        user = {
          id: 2,
          first_name: "New",
          last_name: "User",
          chats: [],
          has_profile: false,
        };
        break;
      case "invitee":
        user = {id: 3, first_name: "Invitee", last_name: "User", chats: []};
        break;
      case "normal":
        user = {
          id: 4,
          first_name: "Normal",
          last_name: "User",
          chats: [],
          has_profile: true,
        };
        break;
      case "new_auth_code":
        user = {
          id: 5,
          first_name: "AuthCode",
          last_name: "User",
          chats: [],
          has_profile: false,
          auth_status: "auth_code",
        };
        break;
      case "new_choose_chat":
        user = {
          id: 6,
          first_name: "ChooseChat",
          last_name: "User",
          chats: [],
          has_profile: true,
          auth_status: "choose_chat",
        };
        break;
      default:
        user = {id: 0, first_name: "Default", last_name: "User", chats: []};
        break;
    }

    console.log("Setting mocked user", user);

    // Ensure the globalThis.window.Telegram object exists
    if (!globalThis.window.Telegram) {
      globalThis.window.Telegram = {
        WebApp: {
          initDataUnsafe: {user},
          ready: () => console.log("Telegram WebApp is ready"),
          onEvent: (event: string, callback: EventCallback) => {
            console.log(`Mock event ${event} listener added`);
            if (event === "themeChanged") {
              callback({theme: "dark"}); // Example payload
            }
          },
          offEvent: (event: string, _callback: EventCallback) => {
            console.log(`Mock event ${event} listener removed`);
          },
        },
      } as Window["Telegram"];
    }

    const webApp = globalThis.window.Telegram.WebApp as TelegramWebApp;

    // Override necessary properties and methods
    webApp.ready =
      webApp.ready || (() => console.log("Telegram WebApp is ready"));
    webApp.onEvent =
      webApp.onEvent ||
      ((event: string, callback: EventCallback) => {
        console.log(`Mock event ${event} triggered`);
        if (event === "themeChanged") {
          callback({theme: "dark"}); // Example payload
        }
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    webApp.offEvent =
      webApp.offEvent ||
      ((event: string, _callback: EventCallback) => {
        console.log(`Mock event ${event} listener removed`);
      });

    // If initDataUnsafe is writable, update it, otherwise replace the WebApp object
    if (Object.getOwnPropertyDescriptor(webApp, "initDataUnsafe")?.writable) {
      webApp.initDataUnsafe = {user};
    } else {
      globalThis.window.Telegram.WebApp = {
        ...webApp,
        initDataUnsafe: {user},
      };
    }

    console.log(
      "globalThis.window.Telegram after:",
      globalThis.window.Telegram,
    );
  }
};
