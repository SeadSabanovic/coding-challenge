import { cn } from '@/lib/utils';

interface FieldErrorProps {
  message?: string;
  className?: string;
}

export function FieldError({ message, className }: FieldErrorProps) {
  if (!message) return null;

  return (
    <small
      className={cn(
        'animate-in text-xs text-destructive duration-200 fade-in-0 slide-in-from-top-1',
        className
      )}
    >
      {message}
    </small>
  );
}
