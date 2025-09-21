"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, BookOpen, Heart, Settings, Home, Bookmark, Wrench } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function WelcomePage() {
  const router = useRouter();

  const handleScanBookshelf = () => {
    router.push('/camera');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark justify-between overflow-x-hidden">
      <div className="flex flex-col">
        {/* Header */}
        <header className="flex items-center p-4 pb-2 justify-between">
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12 text-[#1b130d] dark:text-white">
            Shelf Scanner
          </h2>
          <div className="flex w-12 items-center justify-end">
            <Button 
              variant="ghost" 
              size="icon"
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#1b130d] dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
            >
              <Settings className="text-[#1b130d] dark:text-white" size={24} />
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex flex-col gap-4">
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
                    onClick={handleScanBookshelf}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]"
                  >
                    <span className="truncate">Scan Bookshelf</span>
                  </Button>
                  <Button 
                    variant="secondary"
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-background-light/90 dark:bg-background-dark/90 text-[#1b130d] dark:text-white text-base font-bold leading-normal tracking-[0.015em]"
                  >
                    <span className="truncate">Explore Recommendations</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* How It Works Section */}
          <div className="px-4">
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-[#1b130d] dark:text-white">How It Works</h2>
            <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-2">
              <Card className="flex flex-1 gap-3 rounded-lg border border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark p-4 items-center">
                <div className="text-primary" data-icon="Camera" data-size="24px" data-weight="regular">
                  <Camera size={24} />
                </div>
                <h3 className="text-base font-bold leading-tight text-[#1b130d] dark:text-white">Scan Your Bookshelf</h3>
              </Card>
              <Card className="flex flex-1 gap-3 rounded-lg border border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark p-4 items-center">
                <div className="text-primary" data-icon="BookOpen" data-size="24px" data-weight="regular">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-base font-bold leading-tight text-[#1b130d] dark:text-white">Get Personalized Recommendations</h3>
              </Card>
              <Card className="flex flex-1 gap-3 rounded-lg border border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark p-4 items-center">
                <div className="text-primary" data-icon="Heart" data-size="24px" data-weight="regular">
                  <Heart size={24} />
                </div>
                <h3 className="text-base font-bold leading-tight text-[#1b130d] dark:text-white">Discover New Favorites</h3>
              </Card>
            </div>
          </div>
        </main>
      </div>
      
      {/* Footer Navigation */}
      <footer className="sticky bottom-0">
        <div className="flex gap-2 border-t border-primary/10 dark:border-primary/20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm px-4 pt-2 pb-5">
          <Link className="flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-primary" href="/welcome">
            <div className="text-primary flex h-8 items-center justify-center" data-icon="House" data-size="24px" data-weight="fill">
              <Home size={24} fill="#ec6d13" />
            </div>
            <p className="text-primary text-xs font-medium leading-normal tracking-[0.015em]">Home</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-primary/70 dark:text-primary/80" href="/camera">
            <div className="text-primary/70 dark:text-primary/80 flex h-8 items-center justify-center" data-icon="Image" data-size="24px" data-weight="regular">
              <Camera size={24} />
            </div>
            <p className="text-primary/70 dark:text-primary/80 text-xs font-medium leading-normal tracking-[0.015em]">Image Input</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-primary/70 dark:text-primary/80" href="/results">
            <div className="text-primary/70 dark:text-primary/80 flex h-8 items-center justify-center" data-icon="BookOpen" data-size="24px" data-weight="regular">
              <BookOpen size={24} />
            </div>
            <p className="text-primary/70 dark:text-primary/80 text-xs font-medium leading-normal tracking-[0.015em]">Book Results</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-primary/70 dark:text-primary/80" href="#">
            <div className="text-primary/70 dark:text-primary/80 flex h-8 items-center justify-center" data-icon="Bookmark" data-size="24px" data-weight="regular">
              <Bookmark size={24} />
            </div>
            <p className="text-primary/70 dark:text-primary/80 text-xs font-medium leading-normal tracking-[0.015em]">Recommendations</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-primary/70 dark:text-primary/80" href="/settings">
            <div className="text-primary/70 dark:text-primary/80 flex h-8 items-center justify-center" data-icon="Gear" data-size="24px" data-weight="regular">
              <Wrench size={24} />
            </div>
            <p className="text-primary/70 dark:text-primary/80 text-xs font-medium leading-normal tracking-[0.015em]">Settings</p>
          </Link>
        </div>
      </footer>
    </div>
  );
}
