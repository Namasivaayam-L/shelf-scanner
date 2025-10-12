import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book, BookWithGist } from '../types';

interface BookContextType {
  books: BookWithGist[];
  setBooks: React.Dispatch<React.SetStateAction<BookWithGist[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<BookWithGist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <BookContext.Provider value={{ books, setBooks, loading, setLoading }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = (): BookContextType => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
 return context;
};
