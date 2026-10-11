import React, { useState, useId } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from 'cn';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

function PasswordInput({
  label = 'Password',
  placeholder = 'Type here',
  error,
  errorMessage,
  className,
  inputClassName,
  ...props
}) {
  const [show, setShow] = useState(false);
  const id = useId();
  const errorId = `${id}-error`;
  const message = errorMessage ?? (error?.message ? String(error.message) : '');

  return (
    <div className={cn('grid gap-2', className)}>
      {label && (
        <Label htmlFor={id} data-error={!!error} className="data-[error=true]:text-destructive">
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          className={cn('pr-10', inputClassName)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error && message && (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {message}
        </p>
      )}
    </div>
  );
}

export { PasswordInput };
