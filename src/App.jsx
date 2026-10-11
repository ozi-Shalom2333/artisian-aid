import { Outlet } from 'react-router-dom';
import StorageNotice from './components/StorageNotice';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
export default function App() {
  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <StorageNotice />
      <Outlet />
    </ErrorBoundary>
  );
}
