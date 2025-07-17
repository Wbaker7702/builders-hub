import { DocsPage, DocsBody, DocsTitle, DocsDescription } from "fumadocs-ui/page";

interface FumadocsPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FumadocsPage({ title, description, children }: FumadocsPageProps) {
  return (
    <DocsPage>
      <DocsTitle>{title}</DocsTitle>
      {description && <DocsDescription>{description}</DocsDescription>}
      <DocsBody>
        {children}
      </DocsBody>
    </DocsPage>
  );
} 