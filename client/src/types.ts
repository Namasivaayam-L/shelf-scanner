export interface Book {
  id: number;
  title: string;
  description: string; // Backend returns 'description', but BookResults expects 'gist'
  cover: string;
}

// For compatibility with BookResults component which expects 'gist' instead of 'description'
export interface BookWithGist extends Omit<Book, 'description'> {
  gist: string;
}
