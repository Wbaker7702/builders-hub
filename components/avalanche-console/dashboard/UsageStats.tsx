import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { usageStats } from "../constants/dashboard";
import { layoutStyles } from "../lib/styles";

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
    <div className={layoutStyles.statsGrid}>
      {usageStats.map((stat, index) => (
        <Card key={index} className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              {getTrendIcon(stat.trend)}
            </div>
            <div className={`text-xs font-medium ${getTrendColor(stat.trend)}`}>
              {stat.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}