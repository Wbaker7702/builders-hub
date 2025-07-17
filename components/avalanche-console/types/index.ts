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
  status: 'active' | 'inactive';
  url: string;
  chain: string;
  event: string;
  addresses: string;
  signatures: string;
  created: string;
}

// RPC Endpoint types
export interface RpcEndpoint {
  name: string;
  type: 'HTTP' | 'WSS';
  url: string;
  network: 'mainnet' | 'testnet';
  status: 'active' | 'maintenance';
}

// RPC Method types
export interface RpcMethod {
  value: string;
  label: string;
  description: string;
}

// Network types
export interface Network {
  value: string;
  label: string;
}

// Token types
export interface Token {
  value: string;
  label: string;
  amount: string;
}

// Form types
export interface WebhookFormData {
  network: string;
  chain: string;
  eventType: string;
  name: string;
  url: string;
  includeInternal: boolean;
  includeEventLogs: boolean;
}

// Common response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

// Pagination types
export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
} 