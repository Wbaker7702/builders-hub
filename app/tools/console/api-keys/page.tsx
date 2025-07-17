"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Copy, Eye, EyeOff, Key, Plus, Trash } from "lucide-react"
import { toast } from "sonner"
import { Heading } from "fumadocs-ui/components/heading"
import { Callout } from "fumadocs-ui/components/callout"
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"

const demoApiKeys = [
  {
    id: "1",
    name: "Production API Key",
    key: "avax_1234567890abcdef",
    created: "2024-01-15",
    lastUsed: "2024-01-20",
  },
  {
    id: "2", 
    name: "Development Key",
    key: "avax_0987654321fedcba",
    created: "2024-01-10",
    lastUsed: "2024-01-19",
  }
]

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState(demoApiKeys)
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("API key copied to clipboard!")
  }

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({ ...prev, [keyId]: !prev[keyId] }))
  }

  const createApiKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a key name")
      return
    }

    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `avax_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: "Never",
    }

    setApiKeys([...apiKeys, newKey])
    setNewKeyName("")
    setIsDialogOpen(false)
    toast.success("API key created successfully!")
  }

  const deleteApiKey = (keyId: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== keyId))
    toast.success("API key deleted successfully!")
  }

  const maskKey = (key: string) => {
    return key.substring(0, 7) + "..." + key.substring(key.length - 4)
  }

  return (
    <DocsPage>
      <DocsTitle>API Keys</DocsTitle>
      <DocsDescription>
        Create and manage API keys for Avalanche services
      </DocsDescription>
      <DocsBody className="not-prose" style={{ paddingTop: '0.5rem' }}>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Heading as="h2">Manage Your API Keys</Heading>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Key
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create API Key</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="keyName">Key Name</Label>
                    <Input
                      id="keyName"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g., Production Key"
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      Choose a descriptive name to help you identify this key later
                    </p>
                  </div>
                </div>
                <DialogFooter className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createApiKey}>
                    Create Key
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Callout type="info">
            Keep your API keys secure and never share them publicly. Rotate keys regularly for better security.
          </Callout>

          {/* API Keys Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>API Key</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell className="font-medium">{apiKey.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                        >
                          {showKeys[apiKey.id] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(apiKey.key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{apiKey.created}</TableCell>
                    <TableCell>
                      {apiKey.lastUsed === "Never" ? (
                        <Badge variant="secondary">Never</Badge>
                      ) : (
                        apiKey.lastUsed
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteApiKey(apiKey.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator className="my-8" />

          {/* Metrics Section */}
          <div className="space-y-4">
            <Heading as="h2" className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Usage Metrics
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border p-4">
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-sm text-muted-foreground">Total Requests Today</p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-2xl font-bold">45ms</div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
            </div>
          </div>
        </div>
      </DocsBody>
    </DocsPage>
  )
}