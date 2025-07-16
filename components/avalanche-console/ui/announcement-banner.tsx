import { Info } from "lucide-react";

export function AnnouncementBanner() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-blue-900 mb-1">
            Welcome to Avalanche Developer Console
          </h3>
          <p className="text-sm text-blue-700">
            Access powerful APIs, get testnet funds, and manage your development workflow all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}