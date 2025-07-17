"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import { Copy, Globe, Zap } from "lucide-react"
import { toast } from "sonner"
import { Heading } from "fumadocs-ui/components/heading"
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'

interface RpcEndpoint {
  name: string
  url: string
  chainId: string
  network: "mainnet" | "testnet"
  status: "operational" | "degraded" | "down"
  description: string
}

const rpcEndpoints: RpcEndpoint[] = [
  {
    name: "Avalanche C-Chain Mainnet",
    url: "https://api.avax.network/ext/bc/C/rpc",
    chainId: "43114",
    network: "mainnet",
    status: "operational",
    description: "Primary C-Chain RPC endpoint for mainnet"
  },
  {
    name: "Avalanche C-Chain Testnet (Fuji)",
    url: "https://api.avax-test.network/ext/bc/C/rpc",
    chainId: "43113",
    network: "testnet",
    status: "operational",
    description: "C-Chain RPC endpoint for Fuji testnet"
  },
  {
    name: "Avalanche X-Chain Mainnet",
    url: "https://api.avax.network/ext/bc/X",
    chainId: "X",
    network: "mainnet",
    status: "operational",
    description: "X-Chain RPC endpoint for mainnet"
  },
  {
    name: "Avalanche P-Chain Mainnet",
    url: "https://api.avax.network/ext/bc/P",
    chainId: "P",
    network: "mainnet",
    status: "operational",
    description: "P-Chain RPC endpoint for mainnet"
  }
]

export default function RpcEndpointsPage() {
  const [activeTab, setActiveTab] = useState("mainnet")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("URL copied to clipboard!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500"
      case "degraded":
        return "bg-yellow-500"
      case "down":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredEndpoints = activeTab === "all" 
    ? rpcEndpoints 
    : rpcEndpoints.filter(endpoint => endpoint.network === activeTab)

  return (
    <DocsPage>
      <DocsTitle>RPC Endpoints</DocsTitle>
      <p className="text-lg text-fd-muted-foreground">
        Access free mainnet and testnet RPC endpoints for Avalanche networks
      </p>
      <DocsBody className="not-prose" style={{ paddingTop: '0.5rem' }}>
        <div className="space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="grid w-full grid-cols-3">
              <Tab value="mainnet">Mainnet</Tab>
              <Tab value="testnet">Testnet</Tab>
              <Tab value="all">All Networks</Tab>
            </div>
          </Tabs>

          <div className="grid gap-4 mt-6">
            {filteredEndpoints.map((endpoint, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {endpoint.name}
                        <Badge variant={endpoint.network === "mainnet" ? "default" : "secondary"}>
                          {endpoint.network}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{endpoint.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${getStatusColor(endpoint.status)}`} />
                      <span className="text-sm text-muted-foreground capitalize">{endpoint.status}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <code className="text-sm">{endpoint.url}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(endpoint.url)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Chain ID: <code className="text-foreground">{endpoint.chainId}</code></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Start Section */}
          <div className="mt-8 space-y-4">
            <Heading as="h2" className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Start
            </Heading>
            <div className="prose prose-sm max-w-none">
              <p>To connect to Avalanche using these RPC endpoints:</p>
              <ol>
                <li>Choose the appropriate network (mainnet or testnet)</li>
                <li>Copy the RPC URL for your desired chain</li>
                <li>Configure your wallet or development environment with the RPC URL</li>
                <li>Start building on Avalanche!</li>
              </ol>
            </div>
          </div>

          {/* Best Practices */}
          <div className="mt-8 space-y-4">
            <Heading as="h2" className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Best Practices
            </Heading>
            <div className="prose prose-sm max-w-none">
              <ul>
                <li>Use rate limiting to avoid overwhelming the endpoints</li>
                <li>Implement proper error handling and retry logic</li>
                <li>Consider running your own node for production applications</li>
                <li>Monitor endpoint status and have fallback options ready</li>
              </ul>
            </div>
          </div>
        </div>
      </DocsBody>
    </DocsPage>
  )
}