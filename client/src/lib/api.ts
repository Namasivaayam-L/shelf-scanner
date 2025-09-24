import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // FastAPI server

// Logging utility
const log = (...args: any[]) => {
  if (typeof window !== 'undefined') {
    console.log('[API]', ...args);
  }
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    log('Request:', config.method?.toUpperCase(), config.url);
    log('Headers:', config.headers);
    if (config.data instanceof FormData) {
      log('FormData keys:', Array.from((config.data as FormData).keys()));
    }
    return config;
  },
  (error) => {
    log('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
apiClient.interceptors.response.use(
  (response) => {
    log('Response:', response.status, response.config.url);
    log('Response data:', response.data);
    return response;
  },
  (error) => {
    log('Response error:', error.response?.status, error.response?.data);
    log('Error config:', error.config);
    return Promise.reject(error);
  }
);

// Process image with the backend
export async function processImage(imageFile: File, query: string = '') {
  log('processImage called with:', { 
    fileName: imageFile.name, 
    fileSize: imageFile.size, 
    fileType: imageFile.type,
    query 
  });
  
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    log('Appended image to formData');
    
    // Only append query if it's provided
    if (query) {
      formData.append('query', query);
      log('Appended query to formData');
    }

    log('Making POST request to /process-image');
    const response = await apiClient.post('/process-image', formData);
    log('Received response from /process-image:', {
      status: response.status,
      data: response.data
    });
    return response.data;
  } catch (error: any) {
    log('Error in processImage:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config
    });
    console.error('Error processing image:', error);
    throw error;
  }
}

// Get recommendations for a specific book
export async function getBookRecommendations(bookId: number) {
  try {
    const response = await apiClient.get(`/books/${bookId}/recommendations`);
    return response.data;
  } catch (error) {
    console.error(`Error getting recommendations for book ${bookId}:`, error);
    throw error;
  }
}

// Save a book to the user's library
export async function saveBookToLibrary(bookId: number) {
  try {
    const response = await apiClient.post(`/books/${bookId}/save`);
    return response.data;
  } catch (error) {
    console.error(`Error saving book ${bookId} to library:`, error);
    throw error;
  }
}

// Save all books to the user's library
export async function saveAllBooks() {
  try {
    const response = await apiClient.post('/books/save-all');
    return response.data;
  } catch (error) {
    console.error('Error saving all books to library:', error);
    throw error;
  }
}

// Get recommendations for all books
export async function getAllRecommendations() {
  try {
    const response = await apiClient.get('/books/recommendations');
    return response.data;
  } catch (error) {
    console.error('Error getting all recommendations:', error);
    throw error;
  }
}

// Type definitions for API responses
export interface Book {
  id: number;
  title: string;
  description: string;
  cover: string;
}

export interface Recommendation {
  id: number;
  title: string;
  description: string;
  cover: string;
}

export interface ProcessedImageResponse {
  books: Book[];
}

export interface BookRecommendationsResponse {
  book_id: number;
  recommendations: Recommendation[];
}

export interface SaveBookResponse {
  status: string;
  message: string;
}

export interface AllRecommendationsResponse {
  recommendations: Recommendation[];
}

export default {
  processImage,
  getBookRecommendations,
  saveBookToLibrary,
  saveAllBooks,
  getAllRecommendations,
};
