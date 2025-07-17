import { Network, Token, RpcEndpoint, RpcMethod } from '../types';

// API URLs
export const API_URLS = {
  GLACIER_API: 'https://glacier-api.avax.network/v1/chains',
  METRICS_API: 'https://metrics.avax.network/v2',
  RPC_MAINNET: 'https://api.avax.network/ext/bc/C/rpc',
  RPC_TESTNET: 'https://api.avax-test.network/ext/bc/C/rpc',
  WSS_MAINNET: 'wss://api.avax.network/ext/bc/C/ws',
  WSS_TESTNET: 'wss://api.avax-test.network/ext/bc/C/ws',
} as const;

// Network configurations
export const NETWORKS: Network[] = [
  { value: 'fuji-c', label: 'Fuji C-Chain' },
  { value: 'fuji-x', label: 'Fuji X-Chain' },
  { value: 'fuji-p', label: 'Fuji P-Chain' },
];

// Token configurations
export const TOKENS: Token[] = [
  { value: 'avax', label: 'AVAX', amount: '2' },
  { value: 'usdc', label: 'USDC', amount: '100' },
  { value: 'usdt', label: 'USDT', amount: '100' },
];

// RPC Endpoints
export const RPC_ENDPOINTS: RpcEndpoint[] = [
  {
    name: 'HTTP Endpoint',
    type: 'HTTP',
    url: API_URLS.RPC_MAINNET,
    network: 'mainnet',
    status: 'active',
  },
  {
    name: 'WSS Endpoint',
    type: 'WSS',
    url: API_URLS.WSS_MAINNET,
    network: 'mainnet',
    status: 'active',
  },
  {
    name: 'HTTP Endpoint',
    type: 'HTTP',
    url: API_URLS.RPC_TESTNET,
    network: 'testnet',
    status: 'active',
  },
  {
    name: 'WSS Endpoint',
    type: 'WSS',
    url: API_URLS.WSS_TESTNET,
    network: 'testnet',
    status: 'active',
  },
];

// RPC Methods
export const RPC_METHODS: RpcMethod[] = [
  { value: 'eth_blockNumber', label: 'eth_blockNumber', description: 'Returns the number of most recent block' },
  { value: 'eth_chainId', label: 'eth_chainId', description: 'Returns the chain ID' },
  { value: 'eth_gasPrice', label: 'eth_gasPrice', description: 'Returns the current gas price' },
  { value: 'eth_getBalance', label: 'eth_getBalance', description: 'Returns the balance of an account' },
  { value: 'eth_getBlockByNumber', label: 'eth_getBlockByNumber', description: 'Returns block information by number' },
  { value: 'eth_getTransactionCount', label: 'eth_getTransactionCount', description: 'Returns the number of transactions sent from an address' },
  { value: 'net_version', label: 'net_version', description: 'Returns the current network ID' },
  { value: 'web3_clientVersion', label: 'web3_clientVersion', description: 'Returns the current client version' },
];

// Default RPC parameters
export const DEFAULT_RPC_PARAMS: Record<string, unknown[]> = {
  eth_blockNumber: [],
  eth_chainId: [],
  eth_gasPrice: [],
  eth_getBalance: ['0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC', 'latest'],
  eth_getBlockByNumber: ['latest', true],
  eth_getTransactionCount: ['0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC', 'latest'],
  net_version: [],
  web3_clientVersion: [],
};

// Chain IDs
export const CHAIN_IDS = {
  MAINNET: '43114',
  TESTNET: '43113',
} as const;

// Demo data
export const DEMO_API_KEYS = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'avax_1234567890abcdef',
    created: '2024-01-15',
    lastUsed: '2024-01-20',
  },
  {
    id: '2',
    name: 'Development Key',
    key: 'avax_0987654321fedcba',
    created: '2024-01-10',
    lastUsed: '2024-01-19',
  },
];

export const DEMO_WEBHOOKS = [
  {
    id: '1',
    status: 'active' as const,
    url: 'https://api.myapp.com/webhooks',
    chain: CHAIN_IDS.MAINNET,
    event: 'transaction',
    addresses: '0x71C7656E...',
    signatures: 'Transfer(...)',
    created: '2 days ago',
  },
  {
    id: '2',
    status: 'active' as const,
    url: 'https://api.example.com/hooks',
    chain: CHAIN_IDS.TESTNET,
    event: 'block',
    addresses: 'All',
    signatures: 'All',
    created: '1 week ago',
  },
];

// Messages
export const MESSAGES = {
  COPY_SUCCESS: 'Copied to clipboard!',
  API_KEY_CREATED: 'API key created successfully!',
  API_KEY_DELETED: 'API key deleted successfully!',
  WEBHOOK_CREATED: 'Webhook created successfully!',
  WEBHOOK_DELETED: 'Webhook deleted successfully!',
  FAUCET_SUCCESS: (amount: string, token: string) => `${amount} ${token} has been sent to your address.`,
  VALIDATION_ERROR: 'Please fill in all required fields.',
  ADDRESS_REQUIRED: 'Please enter a valid address.',
} as const; 