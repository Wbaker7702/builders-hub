"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export default function DataApiPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Code copied to clipboard!")
  }

  const codeExamples = {
    "Javascript SDK": {
      install: "npm install @avalanche-sdk/sdk",
      code: `import { AvalancheSDK } from "@ava-labs/avalanche-sdk";

const avax = new AvalancheSDK({
  serverURL: "https://api.avax.network",
  chainID: "43114",
});

async function run() {
  const balance = await avax.evm.address.balances.getNative({
    address: "0x1C7630Ef7abBbab9ddef87518f6b70f",
    blockTag: "latest",
    currency: "usd",
  });

  console.log(balance);
}

run();`
    },
    "Python SDK": {
      install: "pip install avalanche-python-sdk",
      code: `from avalanche_sdk import AvalancheSDK

avax = AvalancheSDK(
    server_url="https://api.avax.network",
    chain_id="43114"
)

async def run():
    balance = await avax.evm.address.balances.get_native(
        address="0x1C7630Ef7abBbab9ddef87518f6b70f",
        block_tag="latest",
        currency="usd"
    )
    
    print(balance)

run()`
    },
    "Go SDK": {
      install: "go get github.com/ava-labs/avalanche-go-sdk",
      code: `package main

import (
    "fmt"
    "github.com/ava-labs/avalanche-go-sdk"
)

func main() {
    client := avalanche.NewClient("https://api.avax.network")
    
    balance, err := client.EVM.Address.Balances.GetNative(
        "0x1C7630Ef7abBbab9ddef87518f6b70f",
        "latest",
        "usd",
    )
    
    if err != nil {
        panic(err)
    }
    
    fmt.Println(balance)
}`
    },
    "Curl": {
      install: "",
      code: `curl -X POST https://api.avax.network/ext/bc/C/rpc \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": [
      "0x1C7630Ef7abBbab9ddef87518f6b70f",
      "latest"
    ],
    "id": 1
  }'`
    }
  }

  return (
    <div className="container mx-auto px-4 pt-16 pb-6 lg:px-8 lg:pt-20 lg:pb-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Avalanche Data API</h1>
          <p className="text-muted-foreground mt-2">
            Powerful blockchain data access with enterprise-grade performance and security
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="get-started" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="get-started">Get started</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="request-logs">Request logs</TabsTrigger>
          </TabsList>

          <TabsContent value="get-started" className="space-y-6">
            {/* Sample Code Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Sample Code</h2>
                <p className="text-muted-foreground">
                  Helpful code snippets to get started
                </p>
              </div>

              {/* Code Language Tabs */}
              <Tabs defaultValue="Javascript SDK" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="Javascript SDK">Javascript SDK</TabsTrigger>
                  <TabsTrigger value="Python SDK">Python SDK</TabsTrigger>
                  <TabsTrigger value="Go SDK">Go SDK</TabsTrigger>
                  <TabsTrigger value="Curl">Curl</TabsTrigger>
                </TabsList>

                {Object.entries(codeExamples).map(([key, example]) => (
                  <TabsContent key={key} value={key} className="space-y-4">
                    {/* Installation Step */}
                    {example.install && (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          First, initialize a Node.js project, then install the Avalanche SDK:
                        </p>
                        <div className="relative">
                          <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{example.install}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 p-0"
                            onClick={() => copyToClipboard(example.install)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Code Example */}
                    <div className="space-y-2">
                      {key === "Javascript SDK" && (
                        <p className="text-sm text-muted-foreground">
                          Add the following code to a JavaScript file in your project. Execute it in your terminal with 'node yourFile.js' to retrieve the balance.
                        </p>
                      )}
                      <div className="relative">
                        <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{example.code}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() => copyToClipboard(example.code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">API Metrics</h3>
              <p className="text-muted-foreground">
                View your API usage metrics and performance analytics here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="request-logs" className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">Request Logs</h3>
              <p className="text-muted-foreground">
                Monitor and debug your API requests with detailed logging.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}