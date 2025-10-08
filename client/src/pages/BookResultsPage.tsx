import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon, BookmarkIcon, ThumbsUpIcon, MoreHorizontalIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
interface Book {
  id: number;
  title: string;
  gist: string;
  cover: string;
}
const BookResultsPage = () => {
  const navigate = useNavigate();
  // Mock data for detected books
  const [books] = useState<Book[]>([{
    id: 1,
    title: 'The Great Gatsby',
    gist: 'A tale of wealth, love, and the American Dream in the Roaring Twenties',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 2,
    title: 'To Kill a Mockingbird',
    gist: 'A powerful story of racial injustice and moral growth in the American South',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 3,
    title: '1984',
    gist: 'A dystopian vision of totalitarianism, surveillance, and thought control',
    cover: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 4,
    title: 'Pride and Prejudice',
    gist: 'A classic romance examining societal expectations and personal growth',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 5,
    title: 'The Hobbit',
    gist: "An adventure tale of a reluctant hero's journey through a magical world",
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }, {
    id: 6,
    title: 'Sapiens: A Brief History of Humankind',
    gist: 'An exploration of how Homo sapiens came to dominate the Earth',
    cover: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }]);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const toggleBookSelection = (id: number) => {
    if (selectedBooks.includes(id)) {
      setSelectedBooks(selectedBooks.filter(bookId => bookId !== id));
    } else {
      setSelectedBooks([...selectedBooks, id]);
    }
  };
  const selectAll = () => {
    setSelectedBooks(books.map(book => book.id));
  };
  const deselectAll = () => {
    setSelectedBooks([]);
  };
  const getRecommendations = () => {
    navigate('/recommendations');
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Detected Books
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          We found {books.length} books on your bookshelf. Review the list below
          and get recommendations.
        </p>
      </div>
      <div className="mb-8 flex flex-wrap gap-4">
        <Button onClick={getRecommendations} icon={<BookOpenIcon className="h-5 w-5" />}>
          Get Recommendations
        </Button>
        <Button variant="outline" onClick={selectAll}>
          Select All
        </Button>
        {selectedBooks.length > 0 && <Button variant="outline" onClick={deselectAll}>
            Deselect All
          </Button>}
        {selectedBooks.length > 0 && <Button variant="outline" icon={<BookmarkIcon className="h-5 w-5" />}>
            Save Selected to Library
          </Button>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => <Card key={book.id} className={`${selectedBooks.includes(book.id) ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''} hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow`}>
            <CardContent className="p-0">
              <div className="aspect-w-3 aspect-h-2 w-full">
                <img src={book.cover} alt={book.title} className="object-cover w-full h-48" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                  {book.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {book.gist}
                </p>
                <div className="flex justify-between items-center">
                  <Button size="sm" variant={selectedBooks.includes(book.id) ? 'primary' : 'outline'} onClick={() => toggleBookSelection(book.id)} icon={<ThumbsUpIcon className="h-4 w-4" />}>
                    {selectedBooks.includes(book.id) ? 'Selected' : 'Select'}
                  </Button>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400">
                    <MoreHorizontalIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>
      {books.length > 6 && <div className="mt-8 text-center">
          <Button variant="outline">Load More Books</Button>
        </div>}
      <div className="mt-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Ready for Personalized Recommendations?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Get book suggestions based on your reading history and preferences.
        </p>
        <Button onClick={getRecommendations} icon={<BookOpenIcon className="h-5 w-5" />}>
          Get Recommendations
        </Button>
      </div>
    </div>;
};
export default BookResultsPage;