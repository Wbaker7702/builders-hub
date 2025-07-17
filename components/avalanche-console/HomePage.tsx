import React from "react"
import { BarChart3, BookOpen, MessageCircle, FileText, HelpCircle } from "lucide-react"
import { QuickActions } from "./dashboard/QuickActions"
import { UsageStats } from "./dashboard/UsageStats"
import { DeveloperResources } from "./dashboard/DeveloperResources"
// import { ResponsiveContainer } from "./ui/responsive-container"
import { SectionErrorBoundary } from "./ui/error-boundary"
import { layoutStyles } from "./lib/styles"

// Re-export the home component from home.tsx
export { default } from "./home"