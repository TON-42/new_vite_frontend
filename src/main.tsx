import ReactDOM from "react-dom/client";
import "@telegram-apps/telegram-ui/dist/styles.css";
import {AppRoot} from "@telegram-apps/telegram-ui";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

async function enableMocking() {
  if (import.meta.env.VITE_MOCK_USER === "true") {
    const {setMockedTelegramUser} = await import("./utils/mocks");
    setMockedTelegramUser();
  }
  if (
    process.env.NODE_ENV !== "development" ||
    import.meta.env.VITE_USE_MSW !== "true"
  ) {
    return;
  }

  const {worker} = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(rootElement as HTMLElement).render(
    <AppRoot>
      <App />
    </AppRoot>,
  );
});
