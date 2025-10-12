import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trash2, ThumbsUp } from 'lucide-react';
export function SavedBooks() {
  const navigate = useNavigate();
  // Mock data for demonstration
  const savedBooks = [{
    id: 1,
    title: 'The Great Gatsby',
    gist: 'A tale of wealth, love, and the American Dream in the Jazz Age',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200'
  }, {
    id: 2,
    title: 'To Kill a Mockingbird',
    gist: 'A powerful examination of racial injustice and moral growth in the American South',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=200'
  }, {
    id: 3,
    title: '1984',
    gist: 'A dystopian novel about totalitarianism, surveillance, and thought control',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=200'
  }];
  const handleGetRecommendations = () => {
    navigate('/recommendations');
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
                  <button className="text-xs py-1 px-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 dark:bg-secondary-800 dark:hover:bg-secondary-700">
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