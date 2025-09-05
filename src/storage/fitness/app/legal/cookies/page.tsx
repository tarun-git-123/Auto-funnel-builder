import { Metadata } from "next";
import config from "../../../config.json";
import LegalContent from "../LegalContent";

export const metadata: Metadata = {
  title: `Cookie Policy | ${config.company.name}`,
  description: `Learn about how ${config.company.name} uses cookies on our website and how you can manage your preferences.`,
  robots: "noindex, nofollow",
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-gradient-to-b from-book-blue-950 to-book-blue-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <LegalContent type="cookies" />
        </div>
      </div>
    </main>
  );
} 