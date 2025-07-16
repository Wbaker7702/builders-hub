import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { usageStats } from "../constants/dashboard";

export function UsageStats() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {usageStats.map((stat, index) => (
        <div
          key={index}
          className="rounded-lg border bg-card p-6 transition-all hover:shadow-sm"
        >
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{stat.value}</span>
              <div className="flex items-center gap-1">
                {getTrendIcon(stat.trend)}
                <span className={`text-xs font-medium ${getTrendColor(stat.trend)}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}