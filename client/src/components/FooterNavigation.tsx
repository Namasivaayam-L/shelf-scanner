"use client";

import Link from "next/link";
import { Home, Image, BookOpen, Bookmark, Settings } from "lucide-react";

export function FooterNavigation() {
  return (
    <footer className="sticky bottom-0">
      <div className="flex gap-2 border-t border-primary/10 dark:border-primary/20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm px-4 pt-2 pb-5">
        <Link className="flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#ec6d13]" href="#">
          <div className="text-[#ec6d13] flex h-8 items-center justify-center" data-icon="House" data-size="24px" data-weight="fill">
            <Home size={24} fill="#ec6d13" />
          </div>
          <p className="text-[#ec6d13] text-xs font-medium leading-normal tracking-[0.015em]">Home</p>
        </Link>
        <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-primary/70 dark:text-primary/80" href="#">
          <div className="text-primary/70 dark:text-primary/80 flex h-8 items-center justify-center" data-icon="Image" data-size="24px" data-weight="regular">
            <Image size={24} />
          </div>
          <p className="text-primary/70 dark:text-primary/80 text-xs font-medium leading-normal tracking-[0.015em]">Image Input</p>
        </Link>
        <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-primary/70 dark:text-primary/80" href="#">
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
        <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-primary/70 dark:text-primary/80" href="#">
          <div className="text-primary/70 dark:text-primary/80 flex h-8 items-center justify-center" data-icon="Gear" data-size="24px" data-weight="regular">
            <Settings size={24} />
          </div>
          <p className="text-primary/70 dark:text-primary/80 text-xs font-medium leading-normal tracking-[0.015em]">Settings</p>
        </Link>
      </div>
    </footer>
  );
}
