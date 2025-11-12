import { Book } from '@/types';
import logger from '@/lib/logger';

export interface ProcessedImageResponse {
  books: Book[];
}

export interface RecommendationsRequest {
  books: Book[];
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
  logger.info(`Processing image: ${imageFile.name} (${imageFile.size} bytes)`);
  
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch(`/api/process-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`HTTP error processing image: ${response.status || response.status}, message: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    logger.info(`Successfully processed image, received ${data.books?.length || 0} books`);
    return data;
  } catch (error) {
    logger.error('Error processing image:', error);
    throw error;
 }
};

/**
 * Get recommendations based on provided books
 */
export const getRecommendations = async (books: Book[]): Promise<RecommendationsResponse> => {
  logger.info(`Getting recommendations for ${books.length} books`);
  
  try {
    const response = await fetch(`/api/books/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ books }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`HTTP error getting recommendations: ${response.status || response.status}, message: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    logger.info(`Successfully received ${data.recommendations?.length || 0} recommendations`);
    return data;
 } catch (error) {
    logger.error('Error fetching recommendations:', error);
    throw error;
  }
};
