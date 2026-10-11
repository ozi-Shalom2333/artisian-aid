import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import Router from './routes/Router';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from './components/ui/sonner';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={Router} />
    </ErrorBoundary>
    <Toaster position="top-right" closeButton />
  </StrictMode>,
);
