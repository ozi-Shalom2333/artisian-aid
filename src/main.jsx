import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import Index from "./context/Index";
import { AuthProvider } from './global/AuthContext'; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <Index>
      <RouterProvider router={Router} />
      </Index>
    </AuthProvider>
    
     
    
  </StrictMode>
);
