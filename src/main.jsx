import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import { createRoutes } from './routes/Router';
import { createPublicEnvironment } from './services';
import { ServiceContext } from './services/context';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from './components/ui/sonner';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorState from './components/shared/ErrorState';
import MotionProvider from './components/motion/MotionProvider';
const root = createRoot(document.getElementById('root'));
root.render(<LoadingSpinner message="Opening Artisan Aid…" />);
async function start() {
  const environment = createPublicEnvironment();
  await environment.services.initialize();
  const router = createBrowserRouter(createRoutes());
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <ServiceContext.Provider value={environment}>
          <MotionProvider>
            <RouterProvider router={router} />
          </MotionProvider>
        </ServiceContext.Provider>
      </ErrorBoundary>
      <Toaster position="top-right" closeButton />
    </StrictMode>,
  );
}
start().catch(() =>
  root.render(
    <ErrorState
      title="This page could not open"
      description="Please reload and try again."
      onRetry={() => window.location.reload()}
    />,
  ),
);
