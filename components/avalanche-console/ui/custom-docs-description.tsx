import React from 'react';
import { DocsDescription } from 'fumadocs-ui/page';

export function CustomDocsDescription({ children, ...props }: { children: React.ReactNode }) {
  return (
    <div className="custom-docs-description">
      <DocsDescription {...props}>{children}</DocsDescription>
    </div>
  );
} 