import React from 'react';
import { TriangleAlert } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ArtisanAid Uncaught Error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-10 text-center"
          role="alert"
        >
          <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-red-50 text-destructive">
            <TriangleAlert className="size-7" aria-hidden="true" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-foreground">Something went wrong</h2>
          <p className="mb-7 max-w-md text-muted-foreground">
            An unexpected error occurred. Please refresh the page or return to the home screen.
          </p>
          <button onClick={this.handleReload} className="button">
            Return to Homepage
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
