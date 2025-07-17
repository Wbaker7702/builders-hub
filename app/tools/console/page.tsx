import { Metadata } from "next";
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';
import HomePage from "@/components/avalanche-console/HomePage";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Access APIs, manage keys, and configure webhooks for Avalanche development",
};

export default function ConsolePage() {
  return (
    <DocsPage>
      <DocsTitle>Dashboard</DocsTitle>
      <p className="text-lg text-fd-muted-foreground">
        Build, test, and deploy on Avalanche with comprehensive developer tools and APIs
      </p>
      <DocsBody className="not-prose" style={{ paddingTop: '0.5rem' }}>
        <HomePage />
      </DocsBody>
    </DocsPage>
  );
}