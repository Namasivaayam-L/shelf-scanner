import { Card, CardContent } from "@/components/ui/card";
import { Camera, BookOpen, Heart } from "lucide-react";

export function FeaturesSection() {
  return (
    <div className="px-4">
      <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-[#1b130d] dark:text-white">How It Works</h2>
      <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-2">
        <Card className="flex flex-1 gap-3 rounded-lg border border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark p-4 items-center">
          <div className="text-[#ec6d13]" data-icon="Camera" data-size="24px" data-weight="regular">
            <Camera size={24} />
          </div>
          <h3 className="text-base font-bold leading-tight text-[#1b130d] dark:text-white">Scan Your Bookshelf</h3>
        </Card>
        <Card className="flex flex-1 gap-3 rounded-lg border border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark p-4 items-center">
          <div className="text-[#ec6d13]" data-icon="BookOpen" data-size="24px" data-weight="regular">
            <BookOpen size={24} />
          </div>
          <h3 className="text-base font-bold leading-tight text-[#1b130d] dark:text-white">Get Personalized Recommendations</h3>
        </Card>
        <Card className="flex flex-1 gap-3 rounded-lg border border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark p-4 items-center">
          <div className="text-[#ec6d13]" data-icon="Heart" data-size="24px" data-weight="regular">
            <Heart size={24} />
          </div>
          <h3 className="text-base font-bold leading-tight text-[#1b130d] dark:text-white">Discover New Favorites</h3>
        </Card>
      </div>
    </div>
  );
}
