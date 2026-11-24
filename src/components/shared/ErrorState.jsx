import React from 'react';
import { cn } from 'cn';
import { TriangleAlert } from 'lucide-react';
import { Button } from '../ui/button';

const ErrorState = ({
  title = 'Something went wrong',
  description,
  onRetry,
  className,
  quiet = false,
}) => {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border px-6 py-16 text-center',
        quiet ? 'border-border bg-muted/30' : 'border-destructive/20 bg-destructive/5',
        className,
      )}
    >
      <span
        className={cn(
          'flex size-12 items-center justify-center rounded-full',
          quiet ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive',
        )}
      >
        <TriangleAlert className="size-6" aria-hidden="true" />
      </span>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description ? (
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
};

export default ErrorState;
