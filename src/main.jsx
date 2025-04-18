import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import Index from "./context/Index";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Index>
      <RouterProvider router={Router} />
    </Index>
  </StrictMode>
);