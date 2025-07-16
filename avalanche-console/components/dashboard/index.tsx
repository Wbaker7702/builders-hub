import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load dashboard components for better performance
export const QuickActions = dynamic(
  () => import('./QuickActions').then(mod => ({ default: mod.QuickActions })),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    ),
    ssr: true
  }
);

export const UsageStats = dynamic(
  () => import('./UsageStats').then(mod => ({ default: mod.UsageStats })),
  {
    loading: () => <Skeleton className="h-64" />,
    ssr: true
  }
);

export const DeveloperResources = dynamic(
  () => import('./DeveloperResources').then(mod => ({ default: mod.DeveloperResources })),
  {
    loading: () => <Skeleton className="h-48" />,
    ssr: true
  }
);

export const SystemStatus = dynamic(
  () => import('./SystemStatus').then(mod => ({ default: mod.SystemStatus })),
  {
    loading: () => <Skeleton className="h-32" />,
    ssr: false // Client-side only for real-time status
  }
); 