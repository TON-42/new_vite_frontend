export const setMockedTelegramUser = () => {
  if (import.meta.env.VITE_MOCK_USER === "true") {
    const userType = import.meta.env.VITE_USER_TYPE;

    let user;
    switch (userType) {
      case "lead":
        user = {id: 1, first_name: "Lead", last_name: "User"};
        break;
      case "invitee":
        user = {id: 2, first_name: "Invitee", last_name: "User"};
        break;
      case "new":
        user = {id: 3, first_name: "New", last_name: "User"};
        break;
      default:
        user = {id: 0, first_name: "Default", last_name: "User"};
        break;
    }

    globalThis.window.Telegram = {
      WebApp: {
        initDataUnsafe: {user},
        ready: () => console.log("Telegram WebApp is ready"),
      },
    };
  }
};
