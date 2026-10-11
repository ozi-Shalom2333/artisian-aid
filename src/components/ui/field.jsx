import React from 'react';
import { useId } from 'react';
import { cn } from 'cn';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

function Field({
  label,
  placeholder = 'Type here',
  type = 'text',
  error,
  className,
  inputClassName,
  ...props
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn('grid gap-2', className)}>
      {label && (
        <Label htmlFor={id} data-error={!!error} className="data-[error=true]:text-destructive">
          {label}
        </Label>
      )}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={inputClassName}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {String(error.message ?? error)}
        </p>
      )}
    </div>
  );
}

export { Field };
