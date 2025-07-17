'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  children: ReactNode;
  code: string;
  language?: string;
  className?: string;
  showCopyButton?: boolean;
  copyMessage?: string;
}

export function CodeBlock({
  children,
  code,
  language,
  className,
  showCopyButton = true,
  copyMessage = 'Code copied!',
}: CodeBlockProps) {
  return (
    <div className="relative group">
      <pre className={cn(
        'bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm',
        className
      )}>
        <code className={language ? `language-${language}` : undefined}>
          {children}
        </code>
      </pre>
      {showCopyButton && (
        <CopyButton
          text={code}
          successMessage={copyMessage}
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
        />
      )}
    </div>
  );
} 