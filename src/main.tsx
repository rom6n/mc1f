//import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { BrowserRouter } from "react-router-dom";

// this manifest is used temporarily for development purposes
const manifestUrl = "https://rom6n.github.io/mc1f/tonconnect-manifest.json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TonConnectUIProvider>
);
