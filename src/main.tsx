import ReactDOM from "react-dom/client";
import "@telegram-apps/telegram-ui/dist/styles.css";
import {AppRoot} from "@telegram-apps/telegram-ui";
import App from "./App";
import "./index.css";
import {TonConnectUIProvider} from "@tonconnect/ui-react";

// this manifest is used temporarily for development purposes
const manifestUrl =
  "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json";
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <AppRoot>
      <App />
    </AppRoot>
    ,
  </TonConnectUIProvider>,
);
