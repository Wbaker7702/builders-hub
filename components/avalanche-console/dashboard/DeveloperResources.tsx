import { Card, Cards } from "fumadocs-ui/components/card";
import { BookOpen, Code, Zap } from "lucide-react";

const resources = [
  {
    title: "API Documentation",
    description: "Comprehensive guides for all Avalanche APIs",
    icon: BookOpen,
    href: "https://docs.avax.network/",
    external: true,
  },
  {
    title: "Code Examples",
    description: "Sample code and tutorials for common use cases",
    icon: Code,
    href: "/docs",
    external: false,
  },
  {
    title: "Developer Tools",
    description: "Essential tools for Avalanche development",
    icon: Zap,
    href: "/tools",
    external: false,
  },
];

export function DeveloperResources() {
  return (
    <Cards>
      {resources.map((resource, index) => {
        const Icon = resource.icon;
        return (
          <Card
            key={index}
            href={resource.href}
            icon={<Icon />}
            title={resource.title}
            description={resource.description}
            external={resource.external}
          />
        );
      })}
    </Cards>
  );
}