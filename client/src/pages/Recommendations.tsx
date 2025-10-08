import React, { useState } from 'react';
import { Check, PlusCircle, ThumbsUp, BookOpen, ArrowRight } from 'lucide-react';
export function Recommendations() {
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [checkedBooks, setCheckedBooks] = useState<number[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const genres = ['Fiction', 'Mystery', 'Science Fiction', 'Fantasy', 'Romance', 'Thriller', 'Historical Fiction', 'Biography', 'Self-Help', 'Business'];
  const popularBooks = [{
    id: 1,
    title: 'The Midnight Library',
    genre: 'Fiction'
  }, {
    id: 2,
    title: 'Project Hail Mary',
    genre: 'Science Fiction'
  }, {
    id: 3,
    title: 'The Silent Patient',
    genre: 'Mystery'
  }, {
    id: 4,
    title: 'Where the Crawdads Sing',
    genre: 'Fiction'
  }, {
    id: 5,
    title: 'The House in the Cerulean Sea',
    genre: 'Fantasy'
  }, {
    id: 6,
    title: 'Verity',
    genre: 'Thriller'
  }, {
    id: 7,
    title: 'Atomic Habits',
    genre: 'Self-Help'
  }, {
    id: 8,
    title: 'The Four Winds',
    genre: 'Historical Fiction'
  }];
  const recommendations = [{
    id: 1,
    title: 'The Invisible Life of Addie LaRue',
    gist: 'A woman makes a Faustian bargain to live forever but is cursed to be forgotten by everyone she meets',
    similarity: 'Similar to The Midnight Library',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200'
  }, {
    id: 2,
    title: 'Klara and the Sun',
    gist: 'An Artificial Friend observes the behavior of humans who come to browse the store while hoping to be chosen',
    similarity: 'Similar to Project Hail Mary',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=200'
  }, {
    id: 3,
    title: 'The Last Thing He Told Me',
    gist: "A woman searches for the truth about her husband's disappearance",
    similarity: 'Similar to The Silent Patient',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=200'
  }];
  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  const handleBookToggle = (bookId: number) => {
    if (checkedBooks.includes(bookId)) {
      setCheckedBooks(checkedBooks.filter(id => id !== bookId));
    } else {
      setCheckedBooks([...checkedBooks, bookId]);
    }
  };
  const handleNext = () => {
    if (step === 1 && selectedGenres.length > 0) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      setShowRecommendations(true);
    }
  };
  return <div className="w-full max-w-4xl mx-auto">
      {!showRecommendations ? <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              Get Personalized Recommendations
            </h1>
            <p className="text-muted-foreground mt-2">
              Help us understand your reading preferences to suggest books
              you'll love.
            </p>
          </div>
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-primary-600 text-white dark:bg-primary-700' : 'bg-secondary text-secondary-foreground dark:bg-secondary-800'}`}>
                1
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-primary-600 dark:bg-primary-700' : 'bg-secondary dark:bg-secondary-800'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-primary-600 text-white dark:bg-primary-700' : 'bg-secondary text-secondary-foreground dark:bg-secondary-800'}`}>
                2
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-primary-600 dark:bg-primary-700' : 'bg-secondary dark:bg-secondary-800'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-primary-600 text-white dark:bg-primary-700' : 'bg-secondary text-secondary-foreground dark:bg-secondary-800'}`}>
                3
              </div>
            </div>
          </div>
          {step === 1 && <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Select your favorite genres
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                {genres.map(genre => <button key={genre} className={`px-3 py-2 rounded-md text-sm font-medium ${selectedGenres.includes(genre) ? 'bg-primary-600 text-white dark:bg-primary-700' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary-800 dark:hover:bg-secondary-700'}`} onClick={() => handleGenreToggle(genre)}>
                    {selectedGenres.includes(genre) && <Check className="w-4 h-4 inline mr-1" />}
                    {genre}
                  </button>)}
              </div>
              <button className={`w-full py-2 px-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${selectedGenres.length > 0 ? 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600' : 'bg-secondary text-secondary-foreground cursor-not-allowed dark:bg-secondary-800'}`} onClick={handleNext} disabled={selectedGenres.length === 0}>
                Next <ArrowRight className="w-4 h-4 inline ml-1" />
              </button>
            </div>}
          {step === 2 && <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Have you read these popular books?
              </h2>
              <p className="text-muted-foreground mb-6">
                Select the books you've already read to help us refine your
                recommendations.
              </p>
              <div className="space-y-3 mb-6">
                {popularBooks.filter(book => selectedGenres.includes(book.genre)).map(book => <div key={book.id} className="flex items-center">
                      <input type="checkbox" id={`book-${book.id}`} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-border rounded dark:bg-secondary-800" checked={checkedBooks.includes(book.id)} onChange={() => handleBookToggle(book.id)} />
                      <label htmlFor={`book-${book.id}`} className="ml-3 text-sm text-foreground">
                        {book.title}
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({book.genre})
                        </span>
                      </label>
                    </div>)}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                <button className="py-2 px-4 bg-secondary text-secondary-foreground font-medium rounded-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-secondary-800 dark:hover:bg-secondary-700 order-2 sm:order-1" onClick={() => setStep(1)}>
                  Back
                </button>
                <button className="py-2 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-700 dark:hover:bg-primary-600 order-1 sm:order-2" onClick={handleNext}>
                  Get Recommendations{' '}
                  <ThumbsUp className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            </div>}
        </div> : <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              Your Personalized Recommendations
            </h1>
            <p className="text-muted-foreground mt-2">
              Based on your reading preferences and bookshelf.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map(book => <div key={book.id} className="bg-card border border-border rounded-lg overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform hover:scale-105" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-foreground">
                    {book.title}
                  </h3>
                  <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                    {book.similarity}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 flex-1">
                    {book.gist}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button className="text-sm py-1 px-3 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 dark:bg-secondary-800 dark:hover:bg-secondary-700">
                      <BookOpen className="h-4 w-4 inline mr-1" />
                      Details
                    </button>
                    <button className="text-sm py-1 px-3 bg-primary-600 text-white rounded hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600">
                      <PlusCircle className="h-4 w-4 inline mr-1" />
                      Add to List
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
          <div className="mt-8 text-center">
            <button className="py-2 px-6 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-700 dark:hover:bg-primary-600">
              Get More Recommendations
            </button>
          </div>
        </div>}
    </div>;
}