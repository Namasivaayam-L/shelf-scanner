import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trash2, ThumbsUp } from 'lucide-react';
import { getRecommendations } from '../lib/api';
import { BookWithGist } from '../types';

export function SavedBooks() {
  const navigate = useNavigate();
  const [savedBooks, setSavedBooks] = useState<BookWithGist[]>([]);

  // Load saved books from local storage when component mounts
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');
    setSavedBooks(storedBooks);
  }, []);

  const handleGetRecommendations = async () => {
    try {
      // Transform BookWithGist[] to Book[] for the API call
      const booksForApi = savedBooks.map(book => ({
        id: book.id,
        title: book.title,
        description: book.gist, // Use gist as description
        cover: book.cover
      }));
      
      // Get recommendations based on saved books
      const response = await getRecommendations(booksForApi);
      // Store recommendations in local storage
      localStorage.setItem('recommendations', JSON.stringify(response.recommendations));
      // Navigate to recommendations page
      navigate('/recommendations');
    } catch (error) {
      console.error('Error getting recommendations:', error);
      alert('Error getting recommendations. Please try again.');
    }
  };

  const handleRemoveBook = (bookId: number) => {
    // Remove book from saved books
    const updatedBooks = savedBooks.filter(book => book.id !== bookId);
    setSavedBooks(updatedBooks);
    localStorage.setItem('savedBooks', JSON.stringify(updatedBooks));
    alert('Book removed successfully!');
  };
  return <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-foreground">Saved Books</h1>
        <button className="py-2 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-700 dark:hover:bg-primary-600 flex items-center justify-center sm:justify-start" onClick={handleGetRecommendations}>
          <ThumbsUp className="h-4 w-4 mr-2" />
          Get Recommendations
        </button>
      </div>
      {savedBooks.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedBooks.map(book => <div key={book.id} className="bg-card border border-border rounded-lg overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform hover:scale-105" />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-foreground">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground flex-1">
                  {book.gist}
                </p>
                <div className="flex justify-between mt-4">
                  <button className="text-xs py-1 px-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 dark:bg-secondary-800 dark:hover:bg-secondary-700" onClick={() => handleRemoveBook(book.id)}>
                    <Trash2 className="h-3 w-3 inline mr-1" />
                    Remove
                  </button>
                  <button className="text-xs py-1 px-2 bg-primary-600 text-white rounded hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600">
                    <BookOpen className="h-3 w-3 inline mr-1" />
                    Details
                  </button>
                </div>
              </div>
            </div>)}
        </div> : <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">
            You haven't saved any books yet.
          </p>
          <button className="py-2 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700" onClick={() => navigate('/scan')}>
            Scan your bookshelf to get started
          </button>
        </div>}
    </div>;
}
