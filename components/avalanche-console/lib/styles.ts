import { cn } from "./utils";

// Layout patterns with standard Tailwind classes
export const layoutStyles = {
  // Page layouts
  pageContainer: "w-full min-h-screen flex-1 space-y-8 p-6 lg:p-8",
  pageHeader: "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-8", 
  
  // Spacing patterns
  sectionSpacing: "space-y-8",
  cardSpacing: "space-y-4", 
  fieldSpacing: "space-y-4",
  inputSpacing: "space-y-3",
  
  // Grid layouts - responsive grids
  quickActionsGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6",
  statsGrid: "grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6",
  dashboardGrid: "grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8",
  
  // Common component styles
  cardContent: "p-6 space-y-4",
  tabContent: "p-6 space-y-4",
  formGroup: "space-y-3",
  
  // Typography
  pageTitle: "text-4xl font-bold tracking-tight",
  sectionTitle: "text-2xl font-semibold",
  cardTitle: "text-xl font-semibold",
  bodyText: "text-sm text-muted-foreground",
  captionText: "text-xs text-muted-foreground",
  
  // Interactive elements
  button: "text-sm font-medium transition-all duration-200",
  link: "text-sm text-foreground hover:text-muted-foreground transition-colors",
  
  // Containers
  card: "bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200",
  panel: "bg-muted/50 border border-border rounded-lg p-6",
} as const;

// Helper function to get layout class with optional custom className
export const getLayoutClass = (
  key: keyof typeof layoutStyles, 
  customClass?: string
): string => {
  return cn(layoutStyles[key], customClass);
}; 