"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Plus } from "lucide-react"
import { toast } from "sonner"

interface ApiKey {
  id: string
  name: string
  key: string
  requests24h: string
  created: string
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "my-key",
      key: "ak_dev_1234567890abcdef",
      requests24h: "234234234",
      created: "13 days ago"
    },
    {
      id: "2", 
      name: "my-dev",
      key: "ak_prod_abcdef1234567890",
      requests24h: "234234234",
      created: "Today"
    }
  ])
  const [newKeyName, setNewKeyName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const createApiKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for your API key.")
      return
    }

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `ak_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      requests24h: "0",
      created: "Today"
    }

    setApiKeys([...apiKeys, newKey])
    setNewKeyName("")
    setIsDialogOpen(false)
    toast.success("API key created successfully!")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("API key copied to clipboard!")
  }

  const maskKey = (key: string) => {
    return key.substring(0, 8) + "••••••" + key.substring(key.length - 4)
  }

  return (
    <div className="container mx-auto px-4 pt-16 pb-6 lg:px-8 lg:pt-20 lg:pb-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
            <p className="text-muted-foreground mt-2">
              Create and manage your API keys for accessing Avalanche services
            </p>
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

        {/* API Keys Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Requests (24h)</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No API keys found. Create your first API key above.
                  </TableCell>
                </TableRow>
              ) : (
                apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{apiKey.name}</div>
                        <div className="font-mono text-sm text-muted-foreground">
                          {maskKey(apiKey.key)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">
                      {apiKey.requests24h}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {apiKey.created}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(apiKey.key)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}