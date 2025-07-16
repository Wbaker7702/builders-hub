"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Globe, Zap } from "lucide-react"
import { toast } from "sonner"

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
    name: "Avalanche C-Chain Fuji",
    url: "https://api.avax-test.network/ext/bc/C/rpc",
    chainId: "43113",
    network: "testnet",
    status: "operational",
    description: "Primary C-Chain RPC endpoint for Fuji testnet"
  },
  {
    name: "Avalanche X-Chain Mainnet",
    url: "https://api.avax.network/ext/bc/X",
    chainId: "X-Chain",
    network: "mainnet",
    status: "operational",
    description: "X-Chain endpoint for asset transfers"
  },
  {
    name: "Avalanche P-Chain Mainnet",
    url: "https://api.avax.network/ext/bc/P",
    chainId: "P-Chain",
    network: "mainnet",
    status: "operational",
    description: "P-Chain endpoint for staking and validation"
  }
]

export default function RpcsPage() {
  const [activeTab, setActiveTab] = useState("mainnet")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("RPC URL copied to clipboard!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800"
      case "degraded":
        return "bg-yellow-100 text-yellow-800"
      case "down":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredEndpoints = rpcEndpoints.filter(endpoint =>
    activeTab === "all" || endpoint.network === activeTab
  )

  return (
    <div className="container mx-auto px-4 pt-16 pb-6 lg:px-8 lg:pt-20 lg:pb-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Globe className="h-8 w-8" />
            RPC Endpoints
          </h1>
          <p className="text-muted-foreground mt-2">
            Access free mainnet and testnet RPC endpoints for Avalanche development
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mainnet">Mainnet</TabsTrigger>
            <TabsTrigger value="testnet">Testnet</TabsTrigger>
            <TabsTrigger value="all">All Networks</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <div className="grid gap-4">
              {filteredEndpoints.map((endpoint, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {endpoint.name}
                          <Badge className={getStatusColor(endpoint.status)}>
                            {endpoint.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {endpoint.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">
                        {endpoint.network}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">RPC URL</label>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 font-mono text-sm p-2 rounded border">
                            {endpoint.url}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(endpoint.url)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Chain ID</label>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 font-mono text-sm p-2 rounded border">
                            {endpoint.chainId}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(endpoint.chainId)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}