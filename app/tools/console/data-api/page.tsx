"use client"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DataApiPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Code copied to clipboard!")
  }

  return (
    <DocsPage>
      <DocsTitle>Avalanche Data API</DocsTitle>
      <p className="text-lg text-fd-muted-foreground">
        Powerful blockchain data access with enterprise-grade performance and security
      </p>
      <DocsBody className="not-prose" style={{ paddingTop: '0.5rem' }}>
        <div className="space-y-8">
          {/* Main Tabs */}
          <Tabs items={['Get started', 'Metrics', 'Request logs']} defaultIndex={0}>
            <Tab>
              <div className="space-y-6">
                {/* Base URL */}
                <Card>
                  <CardHeader>
                    <CardTitle>Base URL</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        https://api.avax.network/data/v1
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("https://api.avax.network/data/v1")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Sample Code Section */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">Sample Code</h2>
                    <p className="text-muted-foreground">
                      Helpful code snippets to get started
                    </p>
                  </div>

                  {/* Code Language Tabs */}
                  <Tabs items={['Javascript SDK', 'Python SDK', 'Go SDK', 'Curl']} defaultIndex={0}>
                    <Tab>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Install the SDK:</p>
                          <div className="relative">
                            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>npm install @avalanche-sdk/sdk</code>
                            </pre>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 h-8 w-8 p-0"
                              onClick={() => copyToClipboard("npm install @avalanche-sdk/sdk")}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Add the following code to a JavaScript file in your project. Execute it in your terminal with 'node yourFile.js' to retrieve the balance.
                          </p>
                          <div className="relative">
                            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{`import { AvalancheSDK } from "@ava-labs/avalanche-sdk";

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

run();`}</code>
                            </pre>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 h-8 w-8 p-0"
                              onClick={() => copyToClipboard(`import { AvalancheSDK } from "@ava-labs/avalanche-sdk";

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

run();`)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Tab>

                    <Tab>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Install the SDK:</p>
                          <div className="relative">
                            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>pip install avalanche-python-sdk</code>
                            </pre>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 h-8 w-8 p-0"
                              onClick={() => copyToClipboard("pip install avalanche-python-sdk")}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Example code:</p>
                          <div className="relative">
                            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{`from avalanche_sdk import AvalancheSDK

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

run()`}</code>
                            </pre>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 h-8 w-8 p-0"
                              onClick={() => copyToClipboard(`from avalanche_sdk import AvalancheSDK

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

run()`)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Tab>

                    <Tab>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Install the SDK:</p>
                          <div className="relative">
                            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>go get github.com/ava-labs/avalanche-go-sdk</code>
                            </pre>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 h-8 w-8 p-0"
                              onClick={() => copyToClipboard("go get github.com/ava-labs/avalanche-go-sdk")}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Example code:</p>
                          <div className="relative">
                            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{`package main

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
}`}</code>
                            </pre>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 h-8 w-8 p-0"
                              onClick={() => copyToClipboard(`package main

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
}`)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Tab>

                    <Tab>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Example request:</p>
                          <div className="relative">
                            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{`curl -X POST https://api.avax.network/ext/bc/C/rpc \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": [
      "0x1C7630Ef7abBbab9ddef87518f6b70f",
      "latest"
    ],
    "id": 1
  }'`}</code>
                            </pre>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 h-8 w-8 p-0"
                              onClick={() => copyToClipboard(`curl -X POST https://api.avax.network/ext/bc/C/rpc \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": [
      "0x1C7630Ef7abBbab9ddef87518f6b70f",
      "latest"
    ],
    "id": 1
  }'`)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Tab>

            <Tab>
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">API Metrics</h3>
                <p className="text-muted-foreground">
                  View your API usage metrics and performance analytics here.
                </p>
              </div>
            </Tab>

            <Tab>
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Request Logs</h3>
                <p className="text-muted-foreground">
                  Monitor and debug your API requests with detailed logging.
                </p>
              </div>
            </Tab>
          </Tabs>
        </div>
      </DocsBody>
    </DocsPage>
  )
}