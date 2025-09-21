"use client";

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface ShelfScannerHeaderProps {
  title?: string;
}

export function ShelfScannerHeader({ title = "Shelf Scanner" }: ShelfScannerHeaderProps) {
  return (
    <header className="flex items-center p-4 pb-2 justify-between">
      <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12 text-[#1b130d] dark:text-white">
        {title}
      </h2>
      <div className="flex w-12 items-center justify-end">
        <Button variant="ghost" size="icon" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#1b130d] dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
          <Settings className="text-[#1b130d] dark:text-white" size={24} />
        </Button>
      </div>
    </header>
  );
}
