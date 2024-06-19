import ReactDOM from "react-dom/client";
import "@telegram-apps/telegram-ui/dist/styles.css";
import {AppRoot} from "@telegram-apps/telegram-ui";
import App from "./App";
import "./index.css";
import {TonConnectUIProvider} from "@tonconnect/ui-react";

const rootElement = document.getElementById("root");
const manifestUrl =
  "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json"; // we have to change this to a proper one

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
