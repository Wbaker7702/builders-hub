import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "text" | "button"
}

export function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  const variants = {
    default: "bg-muted",
    card: "bg-muted rounded-lg",
    text: "bg-muted h-4 rounded",
    button: "bg-muted h-10 rounded-md"
  }

  return (
    <div
      className={cn(
        "animate-pulse",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="space-y-3">
      <Skeleton variant="card" className="h-32" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        <Skeleton className="h-10 w-10" />
        <Skeleton variant="text" className="flex-1" />
        <Skeleton variant="text" className="w-20" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-10 w-10" />
        <Skeleton variant="text" className="flex-1" />
        <Skeleton variant="text" className="w-20" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-10 w-10" />
        <Skeleton variant="text" className="flex-1" />
        <Skeleton variant="text" className="w-20" />
      </div>
    </div>
  )
} 