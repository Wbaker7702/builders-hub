'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { ButtonHTMLAttributes } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useCopyToClipboard } from '../hooks/use-copy-to-clipboard';

interface CopyButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  text: string;
  successMessage?: string;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function CopyButton({ 
  text, 
  successMessage = 'Copied!',
  className,
  variant = 'ghost',
  size = 'sm',
  ...props 
}: CopyButtonProps) {
  const { copy } = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copy(text, successMessage);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn('transition-all', className)}
      {...props}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
} 