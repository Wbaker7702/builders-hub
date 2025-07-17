import { 
  LayoutDashboard, 
  Key, 
  Database,
  BarChart3,
  Droplet, 
  Globe, 
  Webhook,
} from 'lucide-react';

export const CONSOLE_NAVIGATION = {
  dashboard: {
    name: "Dashboard",
    url: "/tools/console",
    icon: LayoutDashboard,
    description: "Avalanche Developer Console dashboard"
  },
  apiKeys: {
    name: "API Keys",
    url: "/tools/console/api-keys",
    icon: Key,
    description: "Manage your API keys"
  },
  dataApi: {
    name: "Data API",
    url: "/tools/console/data-api",
    icon: Database,
    description: "Powerful blockchain data access"
  },
  webhooksApi: {
    name: "Webhooks API",
    url: "/tools/console/webhooks-api",
    icon: Webhook,
    description: "Configure webhooks"
  },
  metricsApi: {
    name: "Metrics API",
    url: "/tools/console/metrics-api",
    icon: BarChart3,
    description: "Blockchain analytics and performance insights"
  },
  faucet: {
    name: "Faucet",
    url: "/tools/console/faucet",
    icon: Droplet,
    description: "Request testnet tokens"
  },
  rpcEndpoints: {
    name: "RPC Endpoints",
    url: "/tools/console/rpcs",
    icon: Globe,
    description: "Access RPC endpoints"
  }
};

export const CONSOLE_SECTIONS = {
  management: "Management",
  apis: "APIs",
  tools: "Tools"
}; 