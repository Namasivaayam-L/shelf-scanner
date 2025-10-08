import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Link as LinkIcon, Loader2 } from 'lucide-react';
import { processImage } from '../lib/api';
import { useBookContext } from '../contexts/BookContext';
import { BookWithGist } from '../types';

type ImageProcessingProps = {
  setShowResults?: (show: boolean) => void;
};

export function ImageProcessing({
  setShowResults
}: ImageProcessingProps) {
  const [activeTab, setActiveTab] = useState('camera');
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setBooks, setLoading } = useBookContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
 };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProcessImage = async () => {
    if (activeTab === 'upload' && !selectedFile) {
      alert('Please select an image file to upload');
      return;
    }

    if (activeTab === 'url' && !imageUrl) {
      alert('Please enter an image URL');
      return;
    }

    setIsProcessing(true);
    setLoading(true);

    try {
      let response;
      
      if (activeTab === 'upload' && selectedFile) {
        // Process uploaded file
        response = await processImage(selectedFile);
      } else if (activeTab === 'url' && imageUrl) {
        // For URL processing, we'll need to download the image first
        // For now, we'll just pass the URL as a file blob
        const imageResponse = await fetch(imageUrl);
        const imageBlob = await imageResponse.blob();
        const imageFile = new File([imageBlob], 'image.jpg', { type: imageBlob.type });
        response = await processImage(imageFile);
      } else {
        // For camera tab, we would need to implement actual camera capture
        // For now, just show an alert
        alert('Camera functionality would be implemented in a real application');
        setIsProcessing(false);
        setLoading(false);
        return;
      }

      // Transform the response to match what BookResults expects
      // Backend returns 'description' but BookResults expects 'gist'
      const transformedBooks: BookWithGist[] = response.books.map(book => ({
        ...book,
        gist: book.description
      }));

      setBooks(transformedBooks);
      
      if (setShowResults) {
        setShowResults(true);
      }
      navigate('/results');
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
      setLoading(false);
    }
  };
  return <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-6">
        Scan Your Bookshelf
      </h1>
      {/* Tabs */}
      <div className="border-b border-border mb-6">
        <div className="flex -mb-px">
          <button className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'camera' ? 'border-primary-600 text-primary-700 dark:border-primary-400 dark:text-primary-300' : 'border-transparent text-foreground hover:text-foreground hover:border-border'}`} onClick={() => setActiveTab('camera')}>
            <Camera className="w-5 h-5 inline mr-2" />
            Camera
          </button>
          <button className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'upload' ? 'border-primary-600 text-primary-700 dark:border-primary-400 dark:text-primary-300' : 'border-transparent text-foreground hover:text-foreground hover:border-border'}`} onClick={() => setActiveTab('upload')}>
            <Upload className="w-5 h-5 inline mr-2" />
            Upload
          </button>
          <button className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'url' ? 'border-primary-600 text-primary-700 dark:border-primary-400 dark:text-primary-300' : 'border-transparent text-foreground hover:text-foreground hover:border-border'}`} onClick={() => setActiveTab('url')}>
            <LinkIcon className="w-5 h-5 inline mr-2" />
            URL
          </button>
        </div>
      </div>
      {/* Tab content */}
      <div className="mb-8">
        {activeTab === 'camera' && <div className="bg-card border border-border rounded-lg p-6">
            <div className="aspect-video bg-black/10 dark:bg-white/5 rounded-lg flex items-center justify-center mb-4">
              <Camera className="h-12 w-12 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">
                Camera preview will appear here
              </span>
            </div>
            <button className="w-full py-2 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-700 dark:hover:bg-primary-600" onClick={handleProcessImage}>
              Capture Image
            </button>
          </div>}
        {activeTab === 'upload' && <div className="bg-card border border-border rounded-lg p-6">
            <div className="aspect-video bg-black/10 dark:bg-white/5 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center mb-4">
              <Upload className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Drag and drop an image here or click to browse
              </p>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <button 
                className="mt-4 py-2 px-4 bg-secondary text-secondary-foreground font-medium rounded-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={handleFileUpload}
              >
                Browse Files
              </button>
              {selectedFile && (
                <p className="mt-2 text-sm text-muted-foreground truncate max-w-xs text-center">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
            <button className="w-full py-2 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-700 dark:hover:bg-primary-600" onClick={handleProcessImage}>
              Process Image
            </button>
          </div>}
        {activeTab === 'url' && <div className="bg-card border border-border rounded-lg p-6">
            <div className="mb-4">
              <label htmlFor="image-url" className="block text-sm font-medium text-foreground mb-2">
                Image URL
              </label>
              <input type="text" id="image-url" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-background text-foreground" placeholder="https://example.com/bookshelf.jpg" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </div>
            <button className="w-full py-2 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-700 dark:hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleProcessImage} disabled={!imageUrl}>
              Process URL
            </button>
          </div>}
      </div>
      {/* Processing overlay */}
      {isProcessing && <div className="fixed inset-0 bg-background/80 dark:bg-background/90 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-primary-600 dark:text-primary-400 animate-spin mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Processing Your Bookshelf
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Our AI is analyzing your bookshelf image and identifying
                books...
              </p>
              <div className="w-full bg-secondary rounded-full h-2 mb-2">
                <div className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full w-3/4"></div>
              </div>
              <p className="text-xs text-muted-foreground">
                Identifying titles and extracting information...
              </p>
            </div>
          </div>
        </div>}
    </div>;
}
