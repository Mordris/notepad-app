// index.js

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import NoteProvider from "./NoteProvider"; // Import NoteProvider

ReactDOM.render(
  <React.StrictMode>
    <NoteProvider>
      {" "}
      {/* Wrap App with NoteProvider */}
      <App />
    </NoteProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
