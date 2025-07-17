// API Key types
export interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
}

// Webhook types
export interface Webhook {
  id: string;
  status: "active" | "inactive";
  url: string;
  chain: string;
  event: string;
  addresses: string;
  signatures: string;
  created: string;
}

export interface NewWebhook {
  network: "mainnet" | "testnet";
  chain: string;
  eventType: string;
  name: string;
  url: string;
  includeInternal: boolean;
  includeEventLogs: boolean;
}

// RPC Endpoint types
export interface RpcEndpoint {
  name: string;
  url: string;
  chainId: string;
  network: "mainnet" | "testnet";
  status: "operational" | "degraded" | "down";
  description: string;
}

// Common types
export type NetworkType = "mainnet" | "testnet";
export type StatusType = "active" | "inactive" | "operational" | "degraded" | "down"; 