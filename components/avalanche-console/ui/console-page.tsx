import { cn } from '@/lib/cn';
import type { HTMLAttributes, ReactNode } from 'react';

interface ConsolePageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function ConsolePage({ className, children, ...props }: ConsolePageProps) {
  return (
    <article
      className={cn(
        'mx-auto flex w-full max-w-[var(--fd-page-width)]',
        className
      )}
      {...props}
    >
      <div className="flex-1 min-w-0 overflow-hidden">
        {children}
      </div>
    </article>
  );
}

export function ConsoleTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        'text-4xl font-bold leading-tight tracking-tight md:text-5xl',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function ConsoleBody({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'prose prose-neutral mt-6 max-w-none dark:prose-invert',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 