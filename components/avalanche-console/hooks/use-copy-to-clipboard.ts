import { useState } from 'react';
import { toast } from 'sonner';

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = async (text: string, successMessage?: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      toast.success(successMessage || 'Copied to clipboard!');
      
      // Reset copied text after 2 seconds
      setTimeout(() => {
        setCopiedText(null);
      }, 2000);
      
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy to clipboard');
      return false;
    }
  };

  return { copy, copiedText };
} 