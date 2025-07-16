import { ReactNode } from "react";

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveContainer({ children, className = "" }: ResponsiveContainerProps) {
  return (
    <div className={`container mx-auto px-4 pt-16 pb-6 lg:px-8 lg:pt-20 lg:pb-8 ${className}`}>
      {children}
    </div>
  );
}