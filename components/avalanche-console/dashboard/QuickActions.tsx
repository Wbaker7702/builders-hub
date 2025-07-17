import { Zap } from "lucide-react";
import { Card, Cards } from "fumadocs-ui/components/card";
import { Heading } from "fumadocs-ui/components/heading";
import { quickActions } from "../constants/dashboard";

export function QuickActions() {
  return (
    <div className="space-y-6">
      <Heading as="h2" className="flex items-center gap-3 text-2xl font-semibold">
        <Zap className="h-6 w-6" />
        Quick Actions
      </Heading>
      <Cards>
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card
              key={index}
              href={action.href}
              icon={<Icon />}
              title={action.title}
              description={action.description}
            />
          );
        })}
      </Cards>
    </div>
  );
}