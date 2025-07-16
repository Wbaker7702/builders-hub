import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions, toolsMenu, integrationsMenu, academyMenu } from "@/app/layout.config";
import { AvalancheLogo } from "@/components/navigation/avalanche-logo";
import { createElement } from 'react';
import { 
  LayoutDashboard, 
  Key, 
  Database,
  BarChart3,
  Droplet, 
  Globe, 
  Webhook,
  icons 
} from 'lucide-react';

// Create a flat page tree with all items at the same level
const consoleTree = {
  name: "Console",
  children: [
    {
      type: "page" as const,
      name: "Overview",
      url: "/tools/console",
      icon: createElement(LayoutDashboard, { className: "h-4 w-4" }),
      data: {
        title: "Overview",
        description: "Avalanche Developer Console dashboard"
      }
    },
    {
      type: "page" as const,
      name: "API Keys",
      url: "/tools/console/api-keys",
      icon: createElement(Key, { className: "h-4 w-4" }),
      data: {
        title: "API Keys",
        description: "Manage your API keys"
      }
    },
    {
      type: "page" as const,
      name: "Data API",
      url: "/tools/console/data-api",
      icon: createElement(Database, { className: "h-4 w-4" }),
      data: {
        title: "Data API",
        description: "Powerful blockchain data access"
      }
    },
    {
      type: "page" as const,
      name: "Webhooks API",
      url: "/tools/console/webhooks-api",
      icon: createElement(Webhook, { className: "h-4 w-4" }),
      data: {
        title: "Webhooks API",
        description: "Configure webhooks"
      }
    },
    {
      type: "page" as const,
      name: "Metrics API",
      url: "/tools/console/metrics-api",
      icon: createElement(BarChart3, { className: "h-4 w-4" }),
      data: {
        title: "Metrics API",
        description: "Blockchain analytics and performance insights"
      }
    },
    {
      type: "page" as const,
      name: "Faucet",
      url: "/tools/console/faucet",
      icon: createElement(Droplet, { className: "h-4 w-4" }),
      data: {
        title: "Faucet",
        description: "Request testnet tokens"
      }
    },
    {
      type: "page" as const,
      name: "RPC Endpoints",
      url: "/tools/console/rpcs",
      icon: createElement(Globe, { className: "h-4 w-4" }),
      data: {
        title: "RPC Endpoints",
        description: "Access RPC endpoints"
      }
    }
  ]
};

export default function ConsoleLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={consoleTree}
      tabMode="navbar"
      nav={{
        ...baseOptions.nav,
        mode: 'top',
        title: (
          <>
            <AvalancheLogo className="size-7" fill="currentColor" />
            <span style={{ fontSize: "large" }}>Developer Console</span>
          </>
        ),
        url: '/tools/console',
      }}
      links={[
        academyMenu,
        toolsMenu,
        integrationsMenu
      ]}
    >
      {children}
    </DocsLayout>
  );
}