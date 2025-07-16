import { Metadata } from "next";
import HomePage from "@/components/avalanche-console/HomePage";

export const metadata: Metadata = {
  title: "Developer Console",
  description: "Build, test, and deploy on Avalanche with comprehensive developer tools and APIs.",
};

export default function ConsolePage() {
  return <HomePage />;
}