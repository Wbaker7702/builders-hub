import { cn } from "./utils";

// Use standard Tailwind/Fumadocs spacing and layout patterns
export const layoutStyles = {
  // Standard spacing using Tailwind's space-y utilities
  sectionSpacing: "space-y-8",
  cardSpacing: "space-y-4", 
  fieldSpacing: "space-y-4",
  inputSpacing: "space-y-2",
  pageContainer: "p-4",
  pageHeader: "flex items-center justify-between mb-4",
  
  // Use Fumadocs' standard grid patterns
  quickActionsGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  statsGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
  dashboardGrid: "grid grid-cols-1 lg:grid-cols-3 gap-6",
  
  // Remove custom styles - use Fumadocs components instead
} as const;

// Helper function for consistent spacing
export function withSpacing(className?: string, spacing: keyof typeof layoutStyles = 'sectionSpacing') {
  return cn(layoutStyles[spacing], className);
} 