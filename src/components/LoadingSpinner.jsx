import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      <div
        className="size-11 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
        aria-hidden="true"
      />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
