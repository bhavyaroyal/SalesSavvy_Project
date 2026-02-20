import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";

import { SearchProvider } from "./context/SearchContext";

// ✅ create root FIRST
const root = ReactDOM.createRoot(document.getElementById("root"));

// ✅ render only ONCE
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <App />
        <Toaster position="top-right" />
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);