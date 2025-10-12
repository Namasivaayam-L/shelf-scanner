import { Book } from '../types';

export interface ProcessedImageResponse {
  books: Book[];
}

export interface BookRecommendationsResponse {
  book_id: number;
 recommendations: Book[];
}

export interface RecommendationsResponse {
  recommendations: Book[];
}

export interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
}

/**
 * Process an image to extract book information
 */
export const processImage = async (imageFile: File): Promise<ProcessedImageResponse> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch('http://localhost:8000/process-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
 }
};

/**
 * Get recommendations for a specific book
 */
export const getBookRecommendations = async (bookId: number): Promise<BookRecommendationsResponse> => {
  try {
    const response = await fetch(`http://localhost:8000/books/${bookId}/recommendations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
 } catch (error) {
      console.error('Error fetching book recommendations:', error);
      throw error;
  }
};

/**
 * Get all recommendations
 */
export const getAllRecommendations = async (): Promise<RecommendationsResponse> => {
  try {
    const response = await fetch('http://localhost:8000/books/recommendations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
 } catch (error) {
      console.error('Error fetching all recommendations:', error);
      throw error;
  }
};

/**
 * Save a book to the user's library
 */
export const saveBook = async (bookId: number): Promise<ApiResponse<void>> => {
  try {
    const response = await fetch(`http://localhost:8000/books/${bookId}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
 } catch (error) {
      console.error('Error saving book:', error);
      throw error;
  }
};

/**
 * Save all books to the user's library
 */
export const saveAllBooks = async (): Promise<ApiResponse<void>> => {
 try {
    const response = await fetch('http://localhost:8000/books/save-all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
 } catch (error) {
      console.error('Error saving all books:', error);
      throw error;
  }
};
