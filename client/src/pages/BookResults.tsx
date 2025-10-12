import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Save, ThumbsUp } from 'lucide-react';
import { useBookContext } from '@/contexts/BookContext';
import { getRecommendations } from '@/lib/api';
import { BookWithGist } from '@/types';
import logger from '@/lib/logger';

export function BookResults() {
  const navigate = useNavigate();
  const { books } = useBookContext();

  const handleGetRecommendations = async () => {
    logger.info(`Getting recommendations for ${books.length} books`);
    try {
      // Transform BookWithGist[] to Book[] for the API call
      const booksForApi = books.map(book => ({
        id: book.id,
        title: book.title,
        description: book.gist, // Use gist as description
        cover: book.cover
      }));
      
      // Get recommendations based on current books
      const response = await getRecommendations(booksForApi);
      // Store recommendations in local storage
      localStorage.setItem('recommendations', JSON.stringify(response.recommendations));
      logger.info(`Received ${response.recommendations.length} recommendations`);
      // Navigate to recommendations page
      navigate('/recommendations');
    } catch (error) {
      logger.error('Error getting recommendations:', error);
      alert('Error getting recommendations. Please try again.');
    }
  };

  // Function to save books to local storage
 const handleSaveBook = (book: BookWithGist) => {
    logger.info(`Saving book: ${book.title}`);
    // Get existing saved books from local storage
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');
    
    // Check if book is already saved
    const isBookSaved = savedBooks.some((savedBook: any) => savedBook.id === book.id);
    
    if (!isBookSaved) {
      // Add book to saved books
      savedBooks.push(book);
      localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
      logger.info(`Book saved successfully: ${book.title}`);
      alert('Book saved successfully!');
    } else {
      logger.warn(`Book already saved: ${book.title}`);
      alert('Book already saved!');
    }
  };

  const handleSaveAllBooks = () => {
    logger.info(`Attempting to save all ${books.length} books`);
    if (books.length > 0) {
      // Get existing saved books from local storage
      const savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');
      
      // Add all current books that aren't already saved
      const newBooks = books.filter(book => 
        !savedBooks.some((savedBook: any) => savedBook.id === book.id)
      );
      
      if (newBooks.length > 0) {
        savedBooks.push(...newBooks);
        localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
        logger.info(`Saved ${newBooks.length} new books`);
        alert('All books saved successfully!');
      } else {
        logger.warn('All books were already saved');
        alert('All books are already saved!');
      }
    } else {
      logger.warn('No books available to save');
      alert('No books to save!');
    }
  };
  return <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-foreground">Scanned Books</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="py-2 px-4 bg-secondary text-secondary-foreground font-medium rounded-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center justify-center sm:justify-start dark:bg-secondary-800 dark:hover:bg-secondary-700" onClick={handleSaveAllBooks}>
            <Save className="h-4 w-4 mr-2" />
            Save All
          </button>
          <button className="py-2 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center sm:justify-start dark:bg-primary-700 dark:hover:bg-primary-600" onClick={handleGetRecommendations}>
            <ThumbsUp className="h-4 w-4 mr-2" />
            Get Recommendations
          </button>
        </div>
      </div>
      {/* Book grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map(book => <div key={book.id} className="bg-card border border-border rounded-lg overflow-hidden flex flex-col">
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
                  <button className="text-xs py-1 px-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 dark:bg-secondary-800 dark:hover:bg-secondary-700" onClick={() => handleSaveBook(book)}>
                    <Save className="h-3 w-3 inline mr-1" />
                    Save
                  </button>
                  <button className="text-xs py-1 px-2 bg-primary-600 text-white rounded hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600">
                    <BookOpen className="h-3 w-3 inline mr-1" />
                    Details
                  </button>
                </div>
              </div>
            </div>)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-muted-foreground">No books scanned yet. Go to the scan page to upload an image.</p>
          </div>
        )}
      </div>
    </div>;
}
