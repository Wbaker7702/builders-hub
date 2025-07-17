"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Plus, Edit, Trash, X } from "lucide-react"
import { toast } from "sonner"
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'
import { Heading } from "fumadocs-ui/components/heading"

interface Webhook {
  id: string
  status: "active" | "inactive"
  url: string
  chain: string
  event: string
  addresses: string
  signatures: string
  created: string
}

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: "1",
      status: "active",
      url: "https://api.myapp.com/webhooks",
      chain: "43114",
      event: "transaction",
      addresses: "0x71C7656E...",
      signatures: "Transfer(...)",
      created: "2 days ago"
    },
    {
      id: "2",
      status: "active", 
      url: "https://api.example.com/hooks",
      chain: "43113",
      event: "block",
      addresses: "All",
      signatures: "All",
      created: "1 week ago"
    }
  ])

  const [newWebhook, setNewWebhook] = useState({
    network: "testnet",
    chain: "",
    eventType: "",
    name: "",
    url: "",
    includeInternal: false,
    includeEventLogs: false
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showDisabled, setShowDisabled] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("URL copied to clipboard!")
  }

  const createWebhook = () => {
    if (!newWebhook.url.trim() || !newWebhook.name.trim() || !newWebhook.chain || !newWebhook.eventType) {
      toast.error("Please fill in all required fields.")
      return
    }

    const webhook: Webhook = {
      id: Date.now().toString(),
      status: "active",
      url: newWebhook.url,
      chain: newWebhook.chain,
      event: newWebhook.eventType,
      addresses: "All",
      signatures: "All",
      created: "Today"
    }

    setWebhooks([...webhooks, webhook])
    setNewWebhook({
      network: "testnet",
      chain: "",
      eventType: "",
      name: "",
      url: "",
      includeInternal: false,
      includeEventLogs: false
    })
    setIsDialogOpen(false)
    toast.success("Webhook created successfully!")
  }

  const deleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id))
    toast.success("Webhook deleted successfully!")
  }

  const toggleWebhookStatus = (id: string) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === id 
        ? { ...webhook, status: webhook.status === "active" ? "inactive" : "active" }
        : webhook
    ))
    toast.success("Webhook status updated!")
  }

  const filteredWebhooks = showDisabled 
    ? webhooks 
    : webhooks.filter(webhook => webhook.status === "active")

  return (
    <DocsPage>
      <DocsTitle>Avalanche Webhooks API</DocsTitle>
      <DocsDescription>
        Real-time blockchain event notifications with enterprise-grade reliability
      </DocsDescription>
      <DocsBody className="not-prose" style={{ paddingTop: '0.5rem' }}>

        {/* Webhooks Management Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Heading as="h2">Webhooks Management</Heading>
              <p className="text-muted-foreground">
                Configure webhook endpoints for blockchain events
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline">
                Signing Secret
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Webhook
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Webhook</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                      Configure a webhook to receive real-time blockchain event notifications
                    </p>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    {/* Basic Configuration */}
                    <div className="space-y-4">
                      <Heading as="h3">Basic Configuration</Heading>
                      
                      {/* Network Selection */}
                      <div className="space-y-3">
                        <Label>Network</Label>
                        <RadioGroup
                          value={newWebhook.network}
                          onValueChange={(value) => setNewWebhook({...newWebhook, network: value})}
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mainnet" id="mainnet" />
                            <Label htmlFor="mainnet">Mainnet</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="testnet" id="testnet" />
                            <Label htmlFor="testnet">Testnet</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Chain and Event Type */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="chain">
                            Chain <span className="text-red-500">*</span>
                          </Label>
                          <Select value={newWebhook.chain} onValueChange={(value) => setNewWebhook({...newWebhook, chain: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a chain" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="43114">C-Chain (43114)</SelectItem>
                              <SelectItem value="43113">Fuji C-Chain (43113)</SelectItem>
                              <SelectItem value="x-chain">X-Chain</SelectItem>
                              <SelectItem value="p-chain">P-Chain</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eventType">
                            Event Type <span className="text-red-500">*</span>
                          </Label>
                          <Select value={newWebhook.eventType} onValueChange={(value) => setNewWebhook({...newWebhook, eventType: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an event type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="transaction">Transaction</SelectItem>
                              <SelectItem value="block">Block</SelectItem>
                              <SelectItem value="contract">Contract Event</SelectItem>
                              <SelectItem value="transfer">Token Transfer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Webhook Name */}
                      <div className="space-y-2">
                        <Label htmlFor="webhookName">
                          Webhook Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="webhookName"
                          value={newWebhook.name}
                          onChange={(e) => setNewWebhook({...newWebhook, name: e.target.value})}
                          placeholder="e.g., Transaction Monitor"
                          className="w-full"
                        />
                      </div>

                      {/* Endpoint URL */}
                      <div className="space-y-2">
                        <Label htmlFor="endpointUrl">
                          Endpoint URL <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="endpointUrl"
                          value={newWebhook.url}
                          onChange={(e) => setNewWebhook({...newWebhook, url: e.target.value})}
                          placeholder="https://your-app.com/webhook/avalanche"
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground">
                          This URL will receive POST requests with blockchain event data
                        </p>
                      </div>
                    </div>

                    {/* Advanced Options */}
                    <div className="space-y-4">
                      <Heading as="h3">Advanced Options</Heading>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="includeInternal"
                              checked={newWebhook.includeInternal}
                              onCheckedChange={(checked) => setNewWebhook({...newWebhook, includeInternal: checked as boolean})}
                            />
                            <div>
                              <Label htmlFor="includeInternal" className="font-medium">
                                Include Internal Transactions
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Include contract-to-contract transactions
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="includeEventLogs"
                              checked={newWebhook.includeEventLogs}
                              onCheckedChange={(checked) => setNewWebhook({...newWebhook, includeEventLogs: checked as boolean})}
                            />
                            <div>
                              <Label htmlFor="includeEventLogs" className="font-medium">
                                Include Event Logs
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Include detailed event logs and parameters
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={createWebhook}>
                      Create Webhook
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="webhooks" className="space-y-4">
            <TabsList>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="delivery-logs">Delivery Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="webhooks" className="space-y-4">
              {/* Show Disabled Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-disabled"
                  checked={showDisabled}
                  onCheckedChange={setShowDisabled}
                />
                <Label htmlFor="show-disabled">Show Disabled</Label>
              </div>

              {/* Webhooks Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Chain</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Addresses</TableHead>
                      <TableHead>Signatures</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWebhooks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          No webhooks found. Create your first webhook above.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredWebhooks.map((webhook) => (
                        <TableRow key={webhook.id}>
                          <TableCell>
                            <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                              {webhook.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm truncate max-w-[200px]">
                                {webhook.url}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(webhook.url)}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{webhook.chain}</TableCell>
                          <TableCell>{webhook.event}</TableCell>
                          <TableCell className="font-mono text-sm">{webhook.addresses}</TableCell>
                          <TableCell className="font-mono text-sm">{webhook.signatures}</TableCell>
                          <TableCell className="text-muted-foreground">{webhook.created}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleWebhookStatus(webhook.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteWebhook(webhook.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="delivery-logs" className="space-y-4">
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Delivery Logs</h3>
                <p className="text-muted-foreground">
                  View webhook delivery logs and debug failed requests here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DocsBody>
    </DocsPage>
  )
}