"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Play, Loader2 } from "lucide-react"

import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface Endpoint {
  name: string
  type: "HTTP" | "WSS"
  url: string
  network: "mainnet" | "testnet"
  status: "active" | "maintenance"
}

const endpoints: Endpoint[] = [
  {
    name: "HTTP Endpoint",
    type: "HTTP",
    url: "https://api.avax.network/ext/bc/C/rpc",
    network: "mainnet",
    status: "active"
  },
  {
    name: "WSS Endpoint",
    type: "WSS",
    url: "wss://api.avax.network/ext/bc/C/ws",
    network: "mainnet",
    status: "active"
  },
  {
    name: "HTTP Endpoint",
    type: "HTTP",
    url: "https://api.avax-test.network/ext/bc/C/rpc",
    network: "testnet",
    status: "active"
  },
  {
    name: "WSS Endpoint",
    type: "WSS",
    url: "wss://api.avax-test.network/ext/bc/C/ws",
    network: "testnet",
    status: "active"
  }
]

const rpcMethods = [
  { value: "eth_blockNumber", label: "eth_blockNumber", description: "Returns the number of most recent block" },
  { value: "eth_chainId", label: "eth_chainId", description: "Returns the chain ID" },
  { value: "eth_gasPrice", label: "eth_gasPrice", description: "Returns the current gas price" },
  { value: "eth_getBalance", label: "eth_getBalance", description: "Returns the balance of an account" },
  { value: "eth_getBlockByNumber", label: "eth_getBlockByNumber", description: "Returns block information by number" },
  { value: "eth_getTransactionCount", label: "eth_getTransactionCount", description: "Returns the number of transactions sent from an address" },
  { value: "net_version", label: "net_version", description: "Returns the current network ID" },
  { value: "web3_clientVersion", label: "web3_clientVersion", description: "Returns the current client version" }
]

const defaultParams: Record<string, any> = {
  eth_blockNumber: [],
  eth_chainId: [],
  eth_gasPrice: [],
  eth_getBalance: ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC", "latest"],
  eth_getBlockByNumber: ["latest", true],
  eth_getTransactionCount: ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC", "latest"],
  net_version: [],
  web3_clientVersion: []
}

export default function RpcEndpointsPage() {
  const [selectedNetwork, setSelectedNetwork] = useState<"mainnet" | "testnet">("mainnet")
  const [selectedMethod, setSelectedMethod] = useState("eth_blockNumber")
  const [customParams, setCustomParams] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string>("")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  const selectedMethodData = rpcMethods.find(m => m.value === selectedMethod)
  const currentParams = customParams || JSON.stringify(defaultParams[selectedMethod] || [], null, 2)

  const generateCurlCommand = () => {
    const endpoint = endpoints.find(e => e.network === selectedNetwork && e.type === "HTTP")?.url || ""
    const params = customParams || JSON.stringify(defaultParams[selectedMethod] || [])
    
    return `curl -X POST ${endpoint} \\
-H "Content-Type: application/json" \\
-d '{"jsonrpc": "2.0", "id": 1, "method": "${selectedMethod}", "params": ${params}}'`
  }

  const runRpcCall = async () => {
    setIsLoading(true)
    setResult("")
    
    try {
      const endpoint = endpoints.find(e => e.network === selectedNetwork && e.type === "HTTP")?.url
      if (!endpoint) throw new Error("No HTTP endpoint found")

      let params
      try {
        params = customParams ? JSON.parse(customParams) : defaultParams[selectedMethod] || []
      } catch (e) {
        throw new Error("Invalid JSON in parameters")
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: selectedMethod,
          params: params
        })
      })

      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DocsPage>
      <DocsTitle>Avalanche RPC Endpoints</DocsTitle>
      <p className="text-lg text-fd-muted-foreground">
        Read and write to the blockchain with high uptime. API access is free, and rate limited at 50 RPS. To request an increase in rate limits, reach out in Discord.
      </p>
      <DocsBody className="not-prose" style={{ paddingTop: '0.5rem' }}>
        <div className="space-y-8">
          {/* RPC Endpoints Section */}
          <Card>
            <CardHeader>
              <CardTitle>RPC Endpoints</CardTitle>
              <CardDescription>Available network endpoints for blockchain interaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Mainnet Section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Mainnet</h3>
                  {endpoints
                    .filter(ep => ep.network === "mainnet")
                    .map((endpoint, index) => (
                      <div key={`mainnet-${index}`} className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">{endpoint.name}</p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 text-sm bg-muted px-3 py-2 rounded">
                            {endpoint.url}
                          </code>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => copyToClipboard(endpoint.url)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Testnet Section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Testnet (Fuji)</h3>
                  {endpoints
                    .filter(ep => ep.network === "testnet")
                    .map((endpoint, index) => (
                      <div key={`testnet-${index}`} className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">{endpoint.name}</p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 text-sm bg-muted px-3 py-2 rounded">
                            {endpoint.url}
                          </code>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => copyToClipboard(endpoint.url)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* RPC Testing Section */}
          <Card>
            <CardHeader>
              <CardTitle>RPC Testing</CardTitle>
              <CardDescription>Test EVM RPC methods directly from the browser</CardDescription>
            </CardHeader>
                            <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Network</Label>
                      <Select value={selectedNetwork} onValueChange={(v) => setSelectedNetwork(v as "mainnet" | "testnet")}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mainnet">Mainnet</SelectItem>
                          <SelectItem value="testnet">Testnet (Fuji)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>RPC Method</Label>
                      <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {rpcMethods.map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              {method.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {selectedMethodData && (
                    <div className="text-sm text-muted-foreground p-3 bg-muted rounded">
                      {selectedMethodData.description}
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Generated cURL Command</Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(generateCurlCommand())}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy cURL
                      </Button>
                    </div>
                    <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                      {generateCurlCommand()}
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <Label>Custom Parameters (JSON)</Label>
                    <Textarea
                      placeholder={`Default: ${JSON.stringify(defaultParams[selectedMethod] || [])}`}
                      value={customParams}
                      onChange={(e) => setCustomParams(e.target.value)}
                      className="font-mono text-sm"
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to use default parameters, or provide custom JSON-RPC request body
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={runRpcCall} disabled={isLoading} className="flex-1">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Run
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(result)}
                      disabled={!result}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Response
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Result</Label>
                    <div className="min-h-[200px] bg-muted rounded p-4">
                      {result ? (
                        <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                          {result}
                        </pre>
                      ) : (
                        <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                          No result yet. Select a method and click Run to execute.
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
        </div>
      </DocsBody>
    </DocsPage>
  )
}