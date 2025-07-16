"use client"
import React from "react"
import { BarChart3, BookOpen, MessageCircle, FileText, HelpCircle } from "lucide-react"
import { Card, Cards } from "fumadocs-ui/components/card"
import { Heading } from "fumadocs-ui/components/heading"
import { QuickActions } from "./dashboard/QuickActions"
import { UsageStats } from "./dashboard/UsageStats"
import { DeveloperResources } from "./dashboard/DeveloperResources"
import { ResponsiveContainer } from "./ui/responsive-container"
import { SectionErrorBoundary } from "./ui/error-boundary"

export default function HomePage() {
  return (
    <ResponsiveContainer className="space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <Heading as="h1" className="text-4xl font-bold">
          Developer Console
        </Heading>
        <p className="text-lg text-muted-foreground">
          Build, test, and deploy on Avalanche with comprehensive developer tools and APIs
        </p>
      </div>

      <SectionErrorBoundary name="QuickActions">
        <QuickActions />
      </SectionErrorBoundary>

      {/* API Usage Analytics */}
      <SectionErrorBoundary name="UsageAnalytics">
        <div className="space-y-6">
          <Heading as="h2" className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6" />
            API Usage Analytics
          </Heading>
          
          <UsageStats />
        </div>
      </SectionErrorBoundary>

      {/* Developer Resources */}
      <SectionErrorBoundary name="DeveloperResources">
        <div className="space-y-6">
          <Heading as="h2" className="flex items-center gap-3">
            <BookOpen className="h-6 w-6" />
            Developer Resources
          </Heading>
          
          <DeveloperResources />
        </div>
      </SectionErrorBoundary>

      {/* Support Section */}
      <SectionErrorBoundary name="SupportSection">
        <div className="mt-12 pt-8 border-t border-border">
          <div className="mb-6">
            <Heading as="h2" className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6" />
              Support
            </Heading>
          </div>
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
    </ResponsiveContainer>
  )
}
