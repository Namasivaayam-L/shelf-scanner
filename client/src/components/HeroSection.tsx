"use client";

import { Button } from "@/components/ui/button";
import { Camera, BookOpen, Heart } from "lucide-react";

interface HeroSectionProps {
  onScanBookshelf?: () => void;
  onExploreRecommendations?: () => void;
}

export function HeroSection({ 
  onScanBookshelf,
  onExploreRecommendations
}: HeroSectionProps) {
  return (
    <div className="@container">
      <div className="@[480px]:p-4 p-4">
        <div 
          className="flex min-h-[480px] flex-col gap-6 rounded-lg bg-cover bg-center bg-no-repeat @[480px]:gap-8 items-center justify-center p-4"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7_5ONUB3j0FVGJzObrLDuPTdofrAno1QllOXNy_Egg31aqDtcchEdXSYyfLOh5HZaxIeFajTpi-e0YQnvdq-F11Kr6vZC6dRDYc218huk2u4vUo8D_9LlJYxvOq-IcHK6Be6MheG8hSppJvqc8DIIvAS9zXhwBNJ0f9yzqAt5_EaoXWTl4bvT8VA-inMy3ZiLDfukiLKUkjRkExwKFUMBsxdvXoVEv_08aObRjpCjXnQ-eLzfCgUSrxcIgeqsZARjFOgWB3UXhfg")'
          }}
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
              Unlock Your Next Great Read
            </h1>
            <p className="text-white text-base font-normal leading-normal @[480px]:text-lg">
              Scan your bookshelf and discover personalized book recommendations tailored to your collection.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              onClick={onScanBookshelf}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#ec6d13] text-white text-base font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Scan Bookshelf</span>
            </Button>
            <Button 
              onClick={onExploreRecommendations}
              variant="secondary"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-background-light/90 dark:bg-background-dark/90 text-[#1b130d] dark:text-white text-base font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Explore Recommendations</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
