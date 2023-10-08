import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChatContextProvider } from "./context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChatContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChatContextProvider>
);
