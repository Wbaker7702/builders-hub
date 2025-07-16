import { ArrowRight, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { quickActions } from "../constants/dashboard";
import { layoutStyles } from "../lib/styles";
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="space-y-6">
      <h2 className={`${layoutStyles.sectionTitle} flex items-center gap-3`}>
        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <Zap className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </div>
        Quick Actions
      </h2>
      <div className={layoutStyles.quickActionsGrid}>
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card 
              key={index} 
              className="group cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105"
            >
              <Link href={action.href} className="block h-full">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                    <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-background" />
                  </div>
                  <CardTitle className="group-hover:text-foreground transition-colors duration-300">
                    {action.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 transition-colors duration-300">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-foreground transition-all duration-300 font-medium group-hover:text-primary group-hover:translate-x-1">
                    <span className="transition-all duration-300 group-hover:font-semibold">Get started</span>
                    <ArrowRight className="h-4 w-4 ml-1 transition-all duration-300 group-hover:scale-105 group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}