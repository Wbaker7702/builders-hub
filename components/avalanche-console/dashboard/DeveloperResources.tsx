import { ExternalLink, BookOpen, Code, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { layoutStyles } from "../lib/styles";

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {resources.map((resource, index) => (
        <Card key={index} className="group cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105">
          <a 
            href={resource.href} 
            className="block h-full"
            target={resource.external ? "_blank" : undefined}
            rel={resource.external ? "noopener noreferrer" : undefined}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <resource.icon className="h-5 w-5" />
                </div>
                {resource.external && (
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                )}
              </div>
              <CardTitle className="group-hover:text-foreground transition-colors duration-300">
                {resource.title}
              </CardTitle>
              <CardDescription className="transition-colors duration-300">
                {resource.description}
              </CardDescription>
            </CardHeader>
          </a>
        </Card>
      ))}
    </div>
  );
}