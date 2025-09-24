"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, RotateCcw, Sparkles, Camera as CameraIcon, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { useRouter } from 'next/navigation';
import { processImage } from '@/lib/api';

// Logging utility
const log = (...args: any[]) => {
  if (typeof window !== 'undefined') {
    console.log('[CameraPage]', ...args);
  }
};

export default function CameraPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    log('handleFileUpload called');
    const file = e.target.files?.[0];
    log('File selected:', file ? {
      name: file.name,
      size: file.size,
      type: file.type
    } : 'No file selected');
    
    if (file) {
      setSelectedFile(file);
      log('File stored in state');
      
      const reader = new FileReader();
      reader.onloadstart = () => {
        log('FileReader onloadstart event fired');
      };
      reader.onload = (e) => {
        log('FileReader onload event fired');
        setImagePreview(e.target?.result as string);
        log('Image preview set');
      };
      reader.onerror = (e) => {
        log('FileReader error:', e);
      };
      reader.onabort = (e) => {
        log('FileReader aborted:', e);
      };
      reader.readAsDataURL(file);
      log('FileReader.readAsDataURL initiated');
    } else {
      log('No file selected in handleFileUpload');
      setSelectedFile(null);
    }
  };

  // Process the captured/uploaded image
  const handleProcessImage = async () => {
    log('handleProcessImage called');
    if (!imagePreview || !selectedFile) {
      log('Missing image preview or selected file');
      log('imagePreview:', !!imagePreview);
      log('selectedFile:', !!selectedFile);
      return;
    }

    setIsLoading(true);
    setError(null);
    log('Setting loading state to true');

    try {
      // Use the stored file
      const imageFile = selectedFile;
      log('Using stored file:', {
        name: imageFile.name,
        size: imageFile.size,
        type: imageFile.type
      });
      
      // Call the backend API to process the image
      log('Calling processImage API...');
      const response = await processImage(imageFile);
      log('API response received:', response);
      
      // Store result in localStorage and navigate to results page
      localStorage.setItem('bookResults', JSON.stringify(response));
      log('Stored response in localStorage, navigating to results page');
      router.push('/results');
    } catch (err) {
      log('Error processing image:', err);
      console.error('Error processing image:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      log('Setting loading state to false');
      setIsLoading(false);
    }
  };

  // Retake photo
  const handleRetake = () => {
    setImagePreview(null);
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
            className="rounded-full p-2 text-slate-800 dark:text-slate-200"
          >
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </Button>
          <h1 className="flex-1 text-center text-lg font-bold text-[#1b130d] dark:text-white">
            Shelf Scanner
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {imagePreview ? (
          // Preview mode
          <div className="flex-1 flex flex-col">
            <div className="relative flex-1 bg-black">
              <img 
                src={imagePreview} 
                alt="Captured preview" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="p-4 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
              <div className="flex gap-4">
                <Button 
                  onClick={handleRetake}
                  variant="outline"
                  className="flex-1 py-3"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake
                </Button>
                <Button 
                  onClick={handleProcessImage}
                  disabled={isLoading}
                  className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white"
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Process
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Upload mode
          <>
            {/* Tab Navigation */}
            <div className="border-b border-slate-200 dark:border-slate-800">
              <nav aria-label="Tabs" className="-mb-px flex space-x-4 px-4">
                <a className="border-primary shrink-0 whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium text-primary" href="#">
                  <CameraIcon className="inline mr-2 h-4 w-4" />
                  Camera
                </a>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-transparent shrink-0 whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium text-slate-500 hover:border-slate-300 dark:text-slate-400 dark:hover:border-slate-700"
                >
                  <ImageIcon className="inline mr-2 h-4 w-4" />
                  Upload
                </button>
                <button className="border-transparent shrink-0 whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium text-slate-500 hover:border-slate-300 dark:text-slate-400 dark:hover:border-slate-700">
                  <LinkIcon className="inline mr-2 h-4 w-4" />
                  URL
                </button>
              </nav>
            </div>

            {/* Upload Interface */}
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <Upload className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-[#1b130d] dark:text-white mb-4">
                  Upload Bookshelf Photo
                </h2>
                <p className="text-[#1b130d]/80 dark:text-white/80 mb-8">
                  Take a clear photo of your bookshelf or upload an existing image to identify books and get personalized recommendations.
                </p>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full py-6 mb-4 border-2 border-dashed border-primary/30 hover:border-primary/50"
                >
                  <div className="flex flex-col items-center">
                    <Upload className="mb-2 h-6 w-6 text-primary" />
                    <span className="font-medium text-primary">Choose Image</span>
                    <span className="text-sm text-[#1b130d]/60 dark:text-white/60 mt-1">
                      JPG, PNG, or WebP (max 10MB)
                    </span>
                  </div>
                </Button>
                
                <p className="text-sm text-[#1b130d]/60 dark:text-white/60">
                  Or use your device's camera to capture a new photo
                </p>
              </div>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </>
        )}

        {error && (
          <div className="p-4">
            <Card className="border-red-500/50 bg-red-500/10 dark:bg-red-500/20">
              <CardContent className="p-4 text-red-700 dark:text-red-300">
                {error}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
