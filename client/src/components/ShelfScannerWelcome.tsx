"use client";

import { ShelfScannerHeader } from "@/components/ShelfScannerHeader";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FooterNavigation } from "@/components/FooterNavigation";

export function ShelfScannerWelcome() {
  const handleScanBookshelf = () => {
    console.log("Scan Bookshelf clicked");
    // TODO: Implement scan bookshelf functionality
  };

  const handleExploreRecommendations = () => {
    console.log("Explore Recommendations clicked");
    // TODO: Implement explore recommendations functionality
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark justify-between group/design-root overflow-x-hidden">
      <div className="flex flex-col">
        <ShelfScannerHeader />
        <main className="flex flex-col gap-4">
          <HeroSection 
            onScanBookshelf={handleScanBookshelf}
            onExploreRecommendations={handleExploreRecommendations}
          />
          <FeaturesSection />
        </main>
      </div>
      <FooterNavigation />
    </div>
  );
}
