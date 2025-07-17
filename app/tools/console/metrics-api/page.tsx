"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'

export default function MetricsApiPage() {
  const baseUrl = "https://metrics.avax.network/v2"

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("URL copied to clipboard!")
  }

  return (
    <DocsPage>
      <DocsTitle>Avalanche Metrics API</DocsTitle>
      <DocsDescription>
        Access comprehensive analytics and performance metrics for Avalanche networks
      </DocsDescription>
      <DocsBody className="not-prose" style={{ paddingTop: '0.5rem' }}>
        <div className="space-y-8">
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

            <Tabs items={['cURL', 'JavaScript', 'Python', 'Node.js']} defaultIndex={0}>

              <Tab>
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
              </Tab>

              <Tab>
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
              </Tab>

              <Tab>
                <div className="relative">
                  <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm border">
                    <code>{`import requests

url = 'https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses'
params = {
    'startTimestamp': '1722470400',
    'endTimestamp': '1725062400',
    'timeInterval': 'day',
    'pageSize': '31'
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

url = 'https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses'
params = {
    'startTimestamp': '1722470400',
    'endTimestamp': '1725062400',
    'timeInterval': 'day',
    'pageSize': '31'
}

response = requests.get(url, params=params)
data = response.json()
print(data)`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </Tab>

              <Tab>
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
              </Tab>
            </Tabs>
          </div>
        </div>
      </DocsBody>
    </DocsPage>
  )
}