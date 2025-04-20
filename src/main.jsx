import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import Index from "./context/Index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <Index>
      <RouterProvider router={Router} />
    </Index>
  </StrictMode>
);
