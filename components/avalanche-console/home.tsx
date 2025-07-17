"use client"
import React from "react"
import { BarChart3, BookOpen, MessageCircle, FileText, HelpCircle } from "lucide-react"
import { Card, Cards } from "fumadocs-ui/components/card"
import { Heading } from "fumadocs-ui/components/heading"
import { Separator } from "@/components/ui/separator"
import { QuickActions } from "./dashboard/QuickActions"
import { UsageStats } from "./dashboard/UsageStats"
import { DeveloperResources } from "./dashboard/DeveloperResources"
import { SectionErrorBoundary } from "./ui/error-boundary"

export default function HomePage() {
  return (
    <div className="space-y-12 [&>*:first-child]:mt-0">
      <SectionErrorBoundary name="QuickActions">
        <QuickActions />
      </SectionErrorBoundary>

      {/* API Usage Analytics */}
      <SectionErrorBoundary name="UsageAnalytics">
        <div className="space-y-6">
          <Heading as="h2" className="flex items-center gap-3 text-2xl font-semibold">
            <BarChart3 className="h-6 w-6" />
            API Usage Analytics
          </Heading>
          
          <UsageStats />
        </div>
      </SectionErrorBoundary>

      {/* Developer Resources */}
      <SectionErrorBoundary name="DeveloperResources">
        <div className="space-y-6">
          <Heading as="h2" className="flex items-center gap-3 text-2xl font-semibold">
            <BookOpen className="h-6 w-6" />
            Developer Resources
          </Heading>
          
          <DeveloperResources />
        </div>
      </SectionErrorBoundary>

      <Separator />

      {/* Support Section */}
      <SectionErrorBoundary name="SupportSection">
        <div className="space-y-6">
          <Heading as="h2" className="flex items-center gap-3 text-2xl font-semibold">
            <HelpCircle className="h-6 w-6" />
            Support
          </Heading>
          
          <Cards>
            <Card
              href="https://discord.gg/avalanche"
              icon={<MessageCircle />}
              title="Join our Discord"
              description="Connect with the Avalanche community"
              external
            />
            <Card
              href="https://docs.avax.network"
              icon={<FileText />}
              title="Read our docs"
              description="Comprehensive documentation and guides"
              external
            />
          </Cards>
        </div>
      </SectionErrorBoundary>
    </div>
  )
}
