"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { BookOpen, Sparkles, Save, Heart, ArrowLeft } from "lucide-react";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load recommendations from localStorage or API
    const storedRecommendations = localStorage.getItem('bookRecommendations');
    if (storedRecommendations) {
      try {
        const parsedRecommendations = JSON.parse(storedRecommendations);
        setRecommendations(parsedRecommendations.recommendations || []);
      } catch (err) {
        console.error('Error parsing recommendations:', err);
        setError('Failed to load recommendations');
      }
    } else {
      // Mock data for demonstration
      setRecommendations([
        {
          id: 1,
          title: "The Midnight Library",
          author: "Matt Haig",
          description: "A novel about a library that contains books with different versions of your life.",
          cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2487&auto=format&fit=crop",
          rating: 4.5
        },
        {
          id: 2,
          title: "The Seven Husbands of Evelyn Hugo",
          author: "Taylor Jenkins Reid",
          description: "A reclusive Hollywood icon finally tells her story to an unknown journalist.",
          cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=2370&auto=format&fit=crop",
          rating: 4.7
        },
        {
          id: 3,
          title: "Project Hail Mary",
          author: "Andy Weir",
          description: "A lone astronaut must save the earth from disaster in this high-stakes sci-fi adventure.",
          cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2398&auto=format&fit=crop",
          rating: 4.8
        }
      ]);
    }
    setLoading(false);
  }, []);

  const handleSaveToLibrary = (bookId: number) => {
    console.log(`Saving book ${bookId} to library`);
    // TODO: Implement save to library logic
  };

  const handleLikeRecommendation = (bookId: number) => {
    console.log(`Liking recommendation ${bookId}`);
    // TODO: Implement like functionality
  };

  const handleSaveAll = () => {
    console.log('Saving all recommendations to library');
    // TODO: Implement save all logic
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
            className="rounded-full p-2 text-slate-800 dark:text-slate-200"
          >
            <ArrowLeft className="text-[#1b130d] dark:text-white" size={24} />
          </Button>
          <h1 className="flex-1 text-center text-lg font-bold text-[#1b130d] dark:text-white">
            Personalized Recommendations
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-32">
        <h2 className="text-2xl font-bold text-[#1b130d] dark:text-white mb-6">Based on Your Collection</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="p-4">
            <Card className="border-red-500/50 bg-red-500/10 dark:bg-red-500/20">
              <CardContent className="p-4 text-red-700 dark:text-red-300">
                {error}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {recommendations.map((book) => (
              <Card key={book.id} className="bg-white/50 dark:bg-black/20 rounded-xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-4 p-4">
                  <div className="flex-shrink-0 w-20 h-28 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    {book.cover ? (
                      <img 
                        src={book.cover} 
                        alt={book.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <BookOpen className="text-gray-400 dark:text-gray-500 text-4xl" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1b130d] dark:text-white">{book.title}</h3>
                    <p className="text-sm text-[#1b130d]/80 dark:text-white/80 mt-1">
                      by {book.author}
                    </p>
                    <p className="text-sm text-[#1b130d]/60 dark:text-white/60 mt-2">
                      {book.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            fill={i < Math.floor(book.rating) ? "currentColor" : "none"}
                            height="16" 
                            viewBox="0 0 256 256" 
                            width="16" 
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="currentColor"
                          >
                            <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0L166,81.17l59.44,5.15A16,16,0,0,1,234.5,114.38Z"></path>
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-[#1b130d]/80 dark:text-white/80">
                        {book.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-black/5 dark:bg-white/5">
                  <Button
                    onClick={() => handleLikeRecommendation(book.id)}
                    variant="ghost"
                    className="w-full bg-background-light dark:bg-background-dark py-3 px-4 text-sm font-semibold text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Like
                  </Button>
                  <Button
                    onClick={() => handleSaveToLibrary(book.id)}
                    variant="ghost"
                    className="w-full bg-background-light dark:bg-background-dark py-3 px-4 text-sm font-semibold text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save to Library
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer Actions */}
      {!loading && !error && recommendations.length > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-t border-black/5 dark:border-white/5">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleSaveAll}
              className="w-full py-3 px-4 rounded-lg bg-primary text-white text-sm font-bold"
            >
              <Save className="mr-2 h-4 w-4" />
              Save All Recommendations
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
}
