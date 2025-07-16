"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export default function MetricsApiPage() {
  const baseUrl = "https://metrics.avax.network/v2"

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("URL copied to clipboard!")
  }

  return (
    <div className="container mx-auto px-4 pt-16 pb-6 lg:px-8 lg:pt-20 lg:pb-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Avalanche Metrics API</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive blockchain analytics and performance insights with real-time data access
          </p>
        </div>

        {/* Base URL Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Base URL</h2>
            <p className="text-muted-foreground">
              All API endpoints use this base URL. No authentication required - instant access to blockchain data.
            </p>
          </div>

          <div className="relative">
            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm border">
              <code>{baseUrl}</code>
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={() => copyToClipboard(baseUrl)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Code Examples Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Code Examples</h2>
            <p className="text-muted-foreground">
              Ready-to-use snippets for API integration
            </p>
          </div>

          <Tabs defaultValue="curl" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="nodejs">Node.js</TabsTrigger>
            </TabsList>

            <TabsContent value="curl" className="space-y-4">
              <div className="relative">
                <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm border">
                  <code>{`curl --request GET \\
  --url 'https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses?startTimestamp=1722470400&endTimestamp=1725062400&timeInterval=day&pageSize=31'`}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`curl --request GET \\
  --url 'https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses?startTimestamp=1722470400&endTimestamp=1725062400&timeInterval=day&pageSize=31'`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="javascript" className="space-y-4">
              <div className="relative">
                <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm border">
                  <code>{`fetch('https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses?startTimestamp=1722470400&endTimestamp=1725062400&timeInterval=day&pageSize=31')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`fetch('https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses?startTimestamp=1722470400&endTimestamp=1725062400&timeInterval=day&pageSize=31')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="python" className="space-y-4">
              <div className="relative">
                <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm border">
                  <code>{`import requests

url = "https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses"
params = {
    "startTimestamp": "1722470400",
    "endTimestamp": "1725062400", 
    "timeInterval": "day",
    "pageSize": "31"
}

response = requests.get(url, params=params)
data = response.json()
print(data)`}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`import requests

url = "https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses"
params = {
    "startTimestamp": "1722470400",
    "endTimestamp": "1725062400", 
    "timeInterval": "day",
    "pageSize": "31"
}

response = requests.get(url, params=params)
data = response.json()
print(data)`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="nodejs" className="space-y-4">
              <div className="relative">
                <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm border">
                  <code>{`const https = require('https');
const url = 'https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses?startTimestamp=1722470400&endTimestamp=1725062400&timeInterval=day&pageSize=31';

https.get(url, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
}).on('error', (err) => {
  console.error('Error:', err);
});`}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`const https = require('https');
const url = 'https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses?startTimestamp=1722470400&endTimestamp=1725062400&timeInterval=day&pageSize=31';

https.get(url, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
}).on('error', (err) => {
  console.error('Error:', err);
});`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}