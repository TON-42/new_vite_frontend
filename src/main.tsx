import ReactDOM from "react-dom/client";
import "@telegram-apps/telegram-ui/dist/styles.css";
import {AppRoot} from "@telegram-apps/telegram-ui";
import App from "./App";
import "./index.css";

window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <AppRoot>
    <App />
  </AppRoot>,
);
