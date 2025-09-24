"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { BookOpen, Sparkles, Save } from "lucide-react";
import { 
  getBookRecommendations, 
  saveBookToLibrary, 
  saveAllBooks, 
  getAllRecommendations,
  type Book,
  type Recommendation
} from '@/lib/api';

export default function ResultsPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load results from localStorage (from camera page)
    const storedResults = localStorage.getItem('bookResults');
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        setBooks(parsedResults.books || []);
      } catch (err) {
        console.error('Error parsing results:', err);
        setError('Failed to load results');
      }
    } else {
      // If no results in localStorage, show empty state
      setBooks([]);
    }
    setLoading(false);
  }, []);

  const handleGetRecommendations = async (bookId: number) => {
    try {
      const response = await getBookRecommendations(bookId);
      console.log(`Recommendations for book ${bookId}:`, response);
      // TODO: Display recommendations to user
      alert(`Recommendations loaded for book ID ${bookId}`);
    } catch (err) {
      console.error(`Error getting recommendations for book ${bookId}:`, err);
      alert(`Failed to get recommendations for book ID ${bookId}`);
    }
  };

  const handleSaveToLibrary = async (bookId: number) => {
    try {
      const response = await saveBookToLibrary(bookId);
      console.log(`Book ${bookId} saved to library:`, response);
      // TODO: Update UI to show book was saved
      alert(`Book ID ${bookId} saved to library`);
    } catch (err) {
      console.error(`Error saving book ${bookId} to library:`, err);
      alert(`Failed to save book ID ${bookId} to library`);
    }
  };

  const handleSaveAll = async () => {
    try {
      const response = await saveAllBooks();
      console.log('All books saved to library:', response);
      // TODO: Update UI to show all books were saved
      alert('All books saved to library');
    } catch (err) {
      console.error('Error saving all books to library:', err);
      alert('Failed to save all books to library');
    }
  };

  const handleRecommendationsForAll = async () => {
    try {
      const response = await getAllRecommendations();
      console.log('Recommendations for all books:', response);
      // TODO: Display recommendations to user
      alert('Recommendations loaded for all books');
    } catch (err) {
      console.error('Error getting recommendations for all books:', err);
      alert('Failed to get recommendations for all books');
    }
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
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </Button>
          <h1 className="flex-1 text-center text-lg font-bold text-[#1b130d] dark:text-white">
            Shelf Scanner
          </h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-32">
        <h2 className="text-2xl font-bold text-[#1b130d] dark:text-white mb-6">Identified Books</h2>
        
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
            {books.map((book) => (
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
                      {book.description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-black/5 dark:bg-white/5">
                  <Button
                    onClick={() => handleGetRecommendations(book.id)}
                    variant="ghost"
                    className="w-full bg-background-light dark:bg-background-dark py-3 px-4 text-sm font-semibold text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Recommendations
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
      {!loading && !error && books.length > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-t border-black/5 dark:border-white/5">
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleSaveAll}
                variant="outline"
                className="w-full py-3 px-4 rounded-lg bg-primary/20 dark:bg-primary/30 text-primary text-sm font-bold"
              >
                <Save className="mr-2 h-4 w-4" />
                Save All
              </Button>
              <Button
                onClick={handleRecommendationsForAll}
                className="w-full py-3 px-4 rounded-lg bg-primary text-white text-sm font-bold"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Recommendations for All
              </Button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
