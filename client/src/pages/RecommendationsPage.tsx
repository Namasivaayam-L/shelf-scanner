import React, { useState } from 'react';
import { BookIcon, CheckIcon, ChevronRightIcon, PlusIcon, BookmarkIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
interface Genre {
  id: string;
  name: string;
}
interface PopularBook {
  id: string;
  title: string;
  author: string;
}
interface Recommendation {
  id: string;
  title: string;
  author: string;
  gist: string;
  cover: string;
  similarTo?: string;
  matchPercentage: number;
}
const RecommendationsPage = () => {
  // Questionnaire state
  const [step, setStep] = useState<'genres' | 'popular' | 'recommendations'>('genres');
  // Genre selection state
  const [genres] = useState<Genre[]>([{
    id: 'fiction',
    name: 'Fiction'
  }, {
    id: 'mystery',
    name: 'Mystery & Thriller'
  }, {
    id: 'scifi',
    name: 'Science Fiction'
  }, {
    id: 'fantasy',
    name: 'Fantasy'
  }, {
    id: 'romance',
    name: 'Romance'
  }, {
    id: 'nonfiction',
    name: 'Non-Fiction'
  }, {
    id: 'biography',
    name: 'Biography & Memoir'
  }, {
    id: 'history',
    name: 'History'
  }, {
    id: 'science',
    name: 'Science & Technology'
  }, {
    id: 'selfhelp',
    name: 'Self-Help & Personal Development'
  }]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  // Popular books state
  const [popularBooks] = useState<PopularBook[]>([{
    id: 'p1',
    title: 'The Silent Patient',
    author: 'Alex Michaelides'
  }, {
    id: 'p2',
    title: 'Educated',
    author: 'Tara Westover'
  }, {
    id: 'p3',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens'
  }, {
    id: 'p4',
    title: 'Atomic Habits',
    author: 'James Clear'
  }, {
    id: 'p5',
    title: 'The Midnight Library',
    author: 'Matt Haig'
  }, {
    id: 'p6',
    title: 'Project Hail Mary',
    author: 'Andy Weir'
  }, {
    id: 'p7',
    title: 'The Four Winds',
    author: 'Kristin Hannah'
  }, {
    id: 'p8',
    title: 'The Vanishing Half',
    author: 'Brit Bennett'
  }]);
  const [readBooks, setReadBooks] = useState<string[]>([]);
  // Recommendations state
  const [recommendations] = useState<Recommendation[]>([{
    id: 'r1',
    title: 'Cloud Cuckoo Land',
    author: 'Anthony Doerr',
    gist: 'A beautiful and ambitious novel about children on the cusp of adulthood in worlds in peril',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    similarTo: 'The Great Gatsby',
    matchPercentage: 95
  }, {
    id: 'r2',
    title: 'The Lincoln Highway',
    author: 'Amor Towles',
    gist: 'A captivating journey through 1950s America following four boys on an unexpected adventure',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 88
  }, {
    id: 'r3',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    gist: 'A thought-provoking tale of an artificial friend observing human behavior and connection',
    cover: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    similarTo: '1984',
    matchPercentage: 92
  }, {
    id: 'r4',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    gist: 'A moving retelling of the story of Achilles and the Trojan War through the eyes of his companion',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 85
  }, {
    id: 'r5',
    title: 'Circe',
    author: 'Madeline Miller',
    gist: 'The story of the goddess Circe, who transforms from an awkward nymph to a formidable witch',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    similarTo: 'The Hobbit',
    matchPercentage: 89
  }, {
    id: 'r6',
    title: 'Homo Deus',
    author: 'Yuval Noah Harari',
    gist: "An exploration of humanity's future and the quest to upgrade humans into gods",
    cover: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    similarTo: 'Sapiens: A Brief History of Humankind',
    matchPercentage: 97
  }]);
  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  // Handle genre selection
  const toggleGenre = (id: string) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter(genreId => genreId !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };
  // Handle read book selection
  const toggleReadBook = (id: string) => {
    if (readBooks.includes(id)) {
      setReadBooks(readBooks.filter(bookId => bookId !== id));
    } else {
      setReadBooks([...readBooks, id]);
    }
  };
  // Handle saving a book to reading list
  const toggleSaveBook = (id: string) => {
    if (savedBooks.includes(id)) {
      setSavedBooks(savedBooks.filter(bookId => bookId !== id));
    } else {
      setSavedBooks([...savedBooks, id]);
    }
  };
  // Proceed to next step
  const nextStep = () => {
    if (step === 'genres') {
      setStep('popular');
    } else if (step === 'popular') {
      setStep('recommendations');
    }
  };
  // Go back to previous step
  const prevStep = () => {
    if (step === 'popular') {
      setStep('genres');
    } else if (step === 'recommendations') {
      setStep('popular');
    }
  };
  // Reset the process
  const resetProcess = () => {
    setStep('genres');
    setSelectedGenres([]);
    setReadBooks([]);
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Book Recommendations
      </h1>
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step === 'genres' ? 'bg-primary-600 text-white' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'}`}>
              1
            </div>
            <div className="text-sm ml-2 text-gray-700 dark:text-gray-300">
              Genres
            </div>
          </div>
          <div className={`h-1 w-16 ${step === 'genres' ? 'bg-gray-300 dark:bg-gray-700' : 'bg-primary-600 dark:bg-primary-500'}`}></div>
          <div className="flex items-center">
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step === 'popular' ? 'bg-primary-600 text-white' : step === 'recommendations' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
              2
            </div>
            <div className="text-sm ml-2 text-gray-700 dark:text-gray-300">
              Reading History
            </div>
          </div>
          <div className={`h-1 w-16 ${step === 'recommendations' ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
          <div className="flex items-center">
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step === 'recommendations' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
              3
            </div>
            <div className="text-sm ml-2 text-gray-700 dark:text-gray-300">
              Recommendations
            </div>
          </div>
        </div>
      </div>
      {/* Genre Selection */}
      {step === 'genres' && <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              Select Your Favorite Genres
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose one or more genres to help us find books you'll love.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {genres.map(genre => <button key={genre.id} onClick={() => toggleGenre(genre.id)} className={`p-4 rounded-lg border ${selectedGenres.includes(genre.id) ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 dark:border-primary-400' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'} flex items-center justify-between text-gray-900 dark:text-white transition-colors`}>
                <span>{genre.name}</span>
                {selectedGenres.includes(genre.id) && <CheckIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />}
              </button>)}
          </div>
          <div className="flex justify-center">
            <Button onClick={nextStep} disabled={selectedGenres.length === 0} icon={<ChevronRightIcon className="h-5 w-5" />}>
              Continue
            </Button>
          </div>
        </div>}
      {/* Popular Books */}
      {step === 'popular' && <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              Books You've Already Read
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Check any books you've already read to help us make better
              recommendations.
            </p>
          </div>
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md dark:shadow-gray-900/30 p-6 mb-8">
            <div className="space-y-4">
              {popularBooks.filter(book => selectedGenres.some(genre =>
          // This is a simplified logic - in a real app, you'd have genre associations
          genre === 'fiction' && ['p1', 'p3', 'p5', 'p7', 'p8'].includes(book.id) || genre === 'nonfiction' && ['p2', 'p4'].includes(book.id) || genre === 'scifi' && ['p6'].includes(book.id))).map(book => <div key={book.id} className={`p-4 rounded-lg border ${readBooks.includes(book.id) ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 dark:border-primary-400' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'} flex items-center justify-between cursor-pointer transition-colors`} onClick={() => toggleReadBook(book.id)}>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        by {book.author}
                      </p>
                    </div>
                    <div className={`w-6 h-6 rounded border flex items-center justify-center ${readBooks.includes(book.id) ? 'bg-primary-600 dark:bg-primary-500 border-primary-600 dark:border-primary-500' : 'border-gray-300 dark:border-gray-600'}`}>
                      {readBooks.includes(book.id) && <CheckIcon className="h-4 w-4 text-white" />}
                    </div>
                  </div>)}
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep} icon={<ChevronRightIcon className="h-5 w-5" />}>
              Get Recommendations
            </Button>
          </div>
        </div>}
      {/* Recommendations */}
      {step === 'recommendations' && <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              Your Personalized Recommendations
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Based on your preferences, we think you'll love these books.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recommendations.map(book => <Card key={book.id} className="h-full hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="aspect-w-3 aspect-h-2 w-full">
                    <img src={book.cover} alt={book.title} className="object-cover w-full h-48" />
                    <div className="absolute top-2 right-2 bg-primary-600 dark:bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {book.matchPercentage}% Match
                    </div>
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                      {book.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                      by {book.author}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {book.gist}
                    </p>
                    {book.similarTo && <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        Similar to:{' '}
                        <span className="font-medium">{book.similarTo}</span>
                      </div>}
                  </div>
                  <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    <Button fullWidth variant={savedBooks.includes(book.id) ? 'outline' : 'primary'} icon={savedBooks.includes(book.id) ? <CheckIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />} onClick={() => toggleSaveBook(book.id)}>
                      {savedBooks.includes(book.id) ? 'Saved to Reading List' : 'Add to Reading List'}
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={prevStep}>
              Back to Questionnaire
            </Button>
            <Button variant="outline" onClick={resetProcess} icon={<div className="h-5 w-5" />}>
              Start Over
            </Button>
            {savedBooks.length > 0 && <Button icon={<BookmarkIcon className="h-5 w-5" />}>
                View Reading List ({savedBooks.length})
              </Button>}
          </div>
        </div>}
    </div>;
};
export default RecommendationsPage;