"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import { Copy, Droplets } from "lucide-react"
import { toast } from "sonner"
import { Heading } from "fumadocs-ui/components/heading"
import { Callout } from "fumadocs-ui/components/callout"
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'

const networks = [
  { value: "fuji-c", label: "Fuji C-Chain" },
  { value: "fuji-x", label: "Fuji X-Chain" },
  { value: "fuji-p", label: "Fuji P-Chain" },
]

const tokens = [
  { value: "avax", label: "AVAX", amount: "2" },
  { value: "usdc", label: "USDC", amount: "100" },
  { value: "usdt", label: "USDT", amount: "100" },
]

export default function FaucetPage() {
  const [selectedNetwork, setSelectedNetwork] = useState("fuji-c")
  const [selectedToken, setSelectedToken] = useState("avax")
  const [address, setAddress] = useState("")
  const [couponCode, setCouponCode] = useState("")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Code copied to clipboard!")
  }

  const requestFunds = () => {
    if (!address.trim()) {
      toast.error("Please enter a valid address.")
      return
    }

    const selectedTokenData = tokens.find((t) => t.value === selectedToken)
    const amount = selectedTokenData?.amount || "2"
    const tokenLabel = selectedTokenData?.label || "AVAX"

    toast.success(`${amount} ${tokenLabel} has been sent to your address.`)

    // Clear form
    setAddress("")
    setCouponCode("")
  }

  const selectedTokenData = tokens.find((t) => t.value === selectedToken)
  const tokenAmount = selectedTokenData?.amount || "2"
  const tokenLabel = selectedTokenData?.label || "AVAX"

  return (
    <DocsPage>
      <DocsTitle>Avalanche Faucet</DocsTitle>
      <p className="text-lg text-fd-muted-foreground">
        Request test tokens for development on Avalanche test networks
      </p>
      <DocsBody className="not-prose" style={{ paddingTop: '0.5rem' }}>
        <div className="space-y-8">
          {/* Faucet Form */}
          <Card>
          <CardHeader>
            <CardTitle>Request Tokens</CardTitle>
            <CardDescription>
              Get free test tokens for development on Avalanche test networks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="network">Select Network</Label>
                <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {networks.map((network) => (
                      <SelectItem key={network.value} value={network.value}>
                        {network.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="token">Select Token</Label>
                <Select value={selectedToken} onValueChange={setSelectedToken}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((token) => (
                      <SelectItem key={token.value} value={token.value}>
                        {token.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coupon">Coupon Code (optional)</Label>
              <Input
                id="coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
              />
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Limit: You can request {tokenAmount} {tokenLabel} each day
              </p>
              <Button onClick={requestFunds} className="w-full">
                Request {tokenAmount} {tokenLabel}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Code Examples */}
        <Tabs items={['Javascript SDK', 'Python SDK', 'Go SDK', 'Curl', 'Python', 'GO']} defaultIndex={0}>

            <Tab>
              <p className="text-sm text-muted-foreground">
                First, initialize a Node.js project, then install the Avalanche SDK.
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`npm install @avalanche-sdk/sdk`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard("npm install @avalanche-sdk/sdk")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Add the following code to a JavaScript file in your project. Execute it in your terminal with 'node yourFile.js' to retrieve the balance.
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`import { AvalancheSDK } from "ava-labs/avalanche-sdk";

const avax = new AvalancheSDK({
  serverURL: "https://api.avax.network",
  chainId: "43114",
});

async function run() {
  // Create a faucet request that returns a Faucet transaction, which can be used
  // to retrieve the transaction hash.
  // Assuming 'wallet' and 'balance' are defined and initialized elsewhere in your code.
  // For example:
  // const wallet = avax.PChain().keyChain().importKey(process.env.PRIVATE_KEY);
  // const balance = await wallet.getBalance();
  let faucetTransaction;
  try {
    faucetTransaction = await wallet.faucet();

    // Wait for the faucet transaction to land on-chain.
    await faucetTransaction.wait();

    // Faucet transaction completed successfully
    // You could add proper logging here in production
  } catch (error) {
    // Handle error appropriately in production
    console.error('Faucet request failed:', error);
  }
}

run();`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(`import { AvalancheSDK } from "ava-labs/avalanche-sdk";

const avax = new AvalancheSDK({
  serverURL: "https://api.avax.network",
  chainId: "43114",
});

async function run() {
  // Create a faucet request that returns a Faucet transaction, which can be used
  // to retrieve the transaction hash.
  // Assuming 'wallet' and 'balance' are defined and initialized elsewhere in your code.
  // For example:
  // const wallet = avax.PChain().keyChain().importKey(process.env.PRIVATE_KEY);
  // const balance = await wallet.getBalance();
  let faucetTransaction;
  try {
    faucetTransaction = await wallet.faucet();

    // Wait for the faucet transaction to land on-chain.
    await faucetTransaction.wait();

    // Faucet transaction completed successfully
    // You could add proper logging here in production
  } catch (error) {
    // Handle error appropriately in production
    console.error('Faucet request failed:', error);
  }
}

run();`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </Tab>

            <Tab>
              <p className="text-sm text-muted-foreground">
                First, install the Avalanche Python SDK.
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`pip install avalanche-sdk`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard("pip install avalanche-sdk")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Add the following code to a Python file in your project:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`from avalanche_sdk import AvalancheSDK

# Initialize the SDK
avax = AvalancheSDK(
    server_url="https://api.avax.network",
    chain_id="43114"
)

async def request_faucet():
    try:
        # Create a faucet request
        # Assuming wallet is initialized elsewhere
        faucet_transaction = await wallet.faucet()
        
        # Wait for transaction confirmation
        await faucet_transaction.wait()
        
        print("Faucet request completed successfully")
        
    except Exception as error:
        print(f"Faucet request failed: {error}")

# Run the faucet request
import asyncio
asyncio.run(request_faucet())`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(`from avalanche_sdk import AvalancheSDK

# Initialize the SDK
avax = AvalancheSDK(
    server_url="https://api.avax.network",
    chain_id="43114"
)

async def request_faucet():
    try:
        # Create a faucet request
        # Assuming wallet is initialized elsewhere
        faucet_transaction = await wallet.faucet()
        
        # Wait for transaction confirmation
        await faucet_transaction.wait()
        
        print("Faucet request completed successfully")
        
    except Exception as error:
        print(f"Faucet request failed: {error}")

# Run the faucet request
import asyncio
asyncio.run(request_faucet())`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </Tab>

            <Tab>
              <p className="text-sm text-muted-foreground">
                First, install the Avalanche Go SDK.
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`go mod init faucet-example
go get github.com/ava-labs/avalanche-sdk-go`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(`go mod init faucet-example
go get github.com/ava-labs/avalanche-sdk-go`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Add the following code to your Go project:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`package main

import (
    "context"
    "fmt"
    "log"
    
    "github.com/ava-labs/avalanche-sdk-go"
)

func main() {
    // Initialize the SDK
    client := avalanche.NewClient("https://api.avax.network")
    
    ctx := context.Background()
    
    // Request faucet funds
    err := requestFaucet(ctx, client)
    if err != nil {
        log.Fatalf("Faucet request failed: %v", err)
    }
    
    fmt.Println("Faucet request completed successfully")
}

func requestFaucet(ctx context.Context, client *avalanche.Client) error {
    // Assuming wallet is initialized elsewhere
    faucetTx, err := wallet.Faucet(ctx)
    if err != nil {
        return fmt.Errorf("failed to create faucet transaction: %w", err)
    }
    
    // Wait for transaction confirmation
    err = faucetTx.Wait(ctx)
    if err != nil {
        return fmt.Errorf("faucet transaction failed: %w", err)
    }
    
    return nil
}`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(`package main

import (
    "context"
    "fmt"
    "log"
    
    "github.com/ava-labs/avalanche-sdk-go"
)

func main() {
    // Initialize the SDK
    client := avalanche.NewClient("https://api.avax.network")
    
    ctx := context.Background()
    
    // Request faucet funds
    err := requestFaucet(ctx, client)
    if err != nil {
        log.Fatalf("Faucet request failed: %v", err)
    }
    
    fmt.Println("Faucet request completed successfully")
}

func requestFaucet(ctx context.Context, client *avalanche.Client) error {
    // Assuming wallet is initialized elsewhere
    faucetTx, err := wallet.Faucet(ctx)
    if err != nil {
        return fmt.Errorf("failed to create faucet transaction: %w", err)
    }
    
    // Wait for transaction confirmation
    err = faucetTx.Wait(ctx)
    if err != nil {
        return fmt.Errorf("faucet transaction failed: %w", err)
    }
    
    return nil
}`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </Tab>

            <Tab>
              <p className="text-sm text-muted-foreground">
                Use curl to make direct HTTP requests to the faucet API:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`# Request faucet funds
curl -X POST https://api.avax.network/ext/bc/C/rpc \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "avax.sendToken",
    "params": {
      "address": "YOUR_ADDRESS_HERE",
      "amount": "1000000000000000000",
      "assetID": "AVAX"
    },
    "id": 1
  }'`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(`# Request faucet funds
curl -X POST https://api.avax.network/ext/bc/C/rpc \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "avax.sendToken",
    "params": {
      "address": "YOUR_ADDRESS_HERE",
      "amount": "1000000000000000000",
      "assetID": "AVAX"
    },
    "id": 1
  }'`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </Tab>

            <Tab>
              <p className="text-sm text-muted-foreground">
                Use Python's requests library to interact with the faucet:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`import requests
import json

def request_faucet_funds(address, amount="1000000000000000000"):
    url = "https://api.avax.network/ext/bc/C/rpc"
    
    payload = {
        "jsonrpc": "2.0",
        "method": "avax.sendToken",
        "params": {
            "address": address,
            "amount": amount,
            "assetID": "AVAX"
        },
        "id": 1
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, data=json.dumps(payload), headers=headers)
        response.raise_for_status()
        
        result = response.json()
        print(f"Faucet request successful: {result}")
        return result
        
    except requests.exceptions.RequestException as e:
        print(f"Faucet request failed: {e}")
        return None

# Example usage
your_address = "YOUR_ADDRESS_HERE"
request_faucet_funds(your_address)`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(`import requests
import json

def request_faucet_funds(address, amount="1000000000000000000"):
    url = "https://api.avax.network/ext/bc/C/rpc"
    
    payload = {
        "jsonrpc": "2.0",
        "method": "avax.sendToken",
        "params": {
            "address": address,
            "amount": amount,
            "assetID": "AVAX"
        },
        "id": 1
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, data=json.dumps(payload), headers=headers)
        response.raise_for_status()
        
        result = response.json()
        print(f"Faucet request successful: {result}")
        return result
        
    except requests.exceptions.RequestException as e:
        print(f"Faucet request failed: {e}")
        return None

# Example usage
your_address = "YOUR_ADDRESS_HERE"
request_faucet_funds(your_address)`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </Tab>

            <Tab>
              <p className="text-sm text-muted-foreground">
                Use Go's net/http package to make faucet requests:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type FaucetRequest struct {
    JsonRPC string \`json:"jsonrpc"\`
    Method  string \`json:"method"\`
    Params  struct {
        Address string \`json:"address"\`
        Amount  string \`json:"amount"\`
        AssetID string \`json:"assetID"\`
    } \`json:"params"\`
    ID int \`json:"id"\`
}

func requestFaucetFunds(address string) error {
    url := "https://api.avax.network/ext/bc/C/rpc"
    
    req := FaucetRequest{
        JsonRPC: "2.0",
        Method:  "avax.sendToken",
        ID:      1,
    }
    req.Params.Address = address
    req.Params.Amount = "1000000000000000000"
    req.Params.AssetID = "AVAX"
    
    jsonData, err := json.Marshal(req)
    if err != nil {
        return fmt.Errorf("failed to marshal request: %w", err)
    }
    
    resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        return fmt.Errorf("failed to make request: %w", err)
    }
    defer resp.Body.Close()
    
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return fmt.Errorf("failed to read response: %w", err)
    }
    
    fmt.Printf("Faucet request successful: %s\\n", string(body))
    return nil
}

func main() {
    address := "YOUR_ADDRESS_HERE"
    if err := requestFaucetFunds(address); err != nil {
        fmt.Printf("Faucet request failed: %v\\n", err)
    }
}`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(`package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type FaucetRequest struct {
    JsonRPC string \`json:"jsonrpc"\`
    Method  string \`json:"method"\`
    Params  struct {
        Address string \`json:"address"\`
        Amount  string \`json:"amount"\`
        AssetID string \`json:"assetID"\`
    } \`json:"params"\`
    ID int \`json:"id"\`
}

func requestFaucetFunds(address string) error {
    url := "https://api.avax.network/ext/bc/C/rpc"
    
    req := FaucetRequest{
        JsonRPC: "2.0",
        Method:  "avax.sendToken",
        ID:      1,
    }
    req.Params.Address = address
    req.Params.Amount = "1000000000000000000"
    req.Params.AssetID = "AVAX"
    
    jsonData, err := json.Marshal(req)
    if err != nil {
        return fmt.Errorf("failed to marshal request: %w", err)
    }
    
    resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        return fmt.Errorf("failed to make request: %w", err)
    }
    defer resp.Body.Close()
    
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return fmt.Errorf("failed to read response: %w", err)
    }
    
    fmt.Printf("Faucet request successful: %s\\n", string(body))
    return nil
}

func main() {
    address := "YOUR_ADDRESS_HERE"
    if err := requestFaucetFunds(address); err != nil {
        fmt.Printf("Faucet request failed: %v\\n", err)
    }
}`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </Tab>
          </Tabs>
        </div>
        </DocsBody>
    </DocsPage>
  )
}