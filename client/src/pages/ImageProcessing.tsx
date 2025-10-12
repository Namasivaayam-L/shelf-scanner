import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Link as LinkIcon, Loader2 } from 'lucide-react';
import { processImage } from '@/lib/api';
import { useBookContext } from '@/contexts/BookContext';
import { BookWithGist } from '@/types';
import logger from '@/lib/logger';

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
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
 const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const { setBooks, setLoading } = useBookContext();

  // Function to start the camera
  const startCamera = async () => {
    logger.info('Starting camera for image capture');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      logger.debug('Camera stream started successfully');
    } catch (err) {
      logger.error('Error accessing camera:', err);
      alert('Could not access the camera. Please ensure you have granted permission.');
    }
  };

  // Function to stop the camera
  const stopCamera = () => {
    logger.info('Stopping camera');
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    logger.debug('Camera stream stopped');
  };

  // Function to capture image from camera
  const captureImage = () => {
    logger.info('Capturing image from camera');
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
        
        // Convert data URL to File object
        fetch(imageDataUrl)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            setSelectedFile(file);
            logger.debug('Image captured and converted to file');
          });
      }
    }
  };

  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      logger.info(`File selected: ${file.name} (${file.size} bytes, type: ${file.type})`);
    }
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProcessImage = async () => {
    logger.info(`Starting image processing for tab: ${activeTab}`);
    
    if (activeTab === 'upload' && !selectedFile) {
      logger.warn('No file selected for upload');
      alert('Please select an image file to upload');
      return;
    }

    if (activeTab === 'url' && !imageUrl) {
      logger.warn('No URL entered');
      alert('Please enter an image URL');
      return;
    }

    // Validate image URL format if in URL tab
    if (activeTab === 'url' && imageUrl) {
      try {
        new URL(imageUrl);
      } catch (err) {
        logger.warn('Invalid URL entered');
        alert('Please enter a valid image URL');
        return;
      }
    }

    // Validate file type if in upload or camera tab
    if ((activeTab === 'upload' || activeTab === 'camera') && selectedFile) {
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!validImageTypes.includes(selectedFile.type)) {
        logger.warn(`Invalid file type: ${selectedFile.type}`);
        alert('Please select a valid image file (JPEG, PNG, WebP, GIF)');
        return;
      }

      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (selectedFile.size > maxSize) {
        logger.warn(`File size exceeds limit: ${selectedFile.size} bytes`);
        alert('File size exceeds 10MB limit. Please select a smaller image.');
        return;
      }
    }

    logger.debug('Starting image processing with validation passed');
    setIsProcessing(true);
    setLoading(true);

    try {
      let response;
      
      if (activeTab === 'upload' && selectedFile) {
        // Process uploaded file
        logger.info('Processing uploaded file');
        response = await processImage(selectedFile);
      } else if (activeTab === 'url' && imageUrl) {
        // For URL processing, we'll need to download the image first
        // For now, we'll just pass the URL as a file blob
        logger.info('Processing image from URL');
        const imageResponse = await fetch(imageUrl);
        const imageBlob = await imageResponse.blob();
        const imageFile = new File([imageBlob], 'image.jpg', { type: imageBlob.type });
        response = await processImage(imageFile);
      } else if (activeTab === 'camera') {
        // For camera tab, use the captured image
        if (!selectedFile) {
          logger.warn('No captured image available');
          alert('Please capture an image first');
          setIsProcessing(false);
          setLoading(false);
          return;
        }
        logger.info('Processing captured camera image');
        response = await processImage(selectedFile);
      } else {
        logger.warn('Invalid tab selection');
        alert('Please select an image file to upload');
        setIsProcessing(false);
        setLoading(false);
        return;
      }

      // Check if response is valid
      if (!response || !response.books) {
        logger.error('Invalid response format from server');
        throw new Error('Invalid response format from server');
      }

      // Transform the response to match what BookResults expects
      // Backend returns 'description' but BookResults expects 'gist'
      const transformedBooks: BookWithGist[] = response.books.map(book => ({
        ...book,
        gist: book.description
      }));

      logger.info(`Received ${transformedBooks.length} books from server`);
      setBooks(transformedBooks);
      
      if (setShowResults) {
        setShowResults(true);
      }
      logger.info('Navigating to results page');
      navigate('/results');
    } catch (error: any) {
      logger.error('Error processing image:', error);
      let errorMessage = 'Error processing image. Please try again.';
      
      // Provide more specific error messages based on error type
      if (error.message?.includes('Failed to fetch')) {
        errorMessage = 'Could not connect to the server. Please check your connection and try again.';
      } else if (error.message?.includes('Invalid response format')) {
        errorMessage = 'Invalid response from server. Please try again.';
      } else if (error.message?.includes('422') || error.message?.includes('400')) {
        errorMessage = 'Invalid image format or request. Please try a different image.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error processing image. Please try again later.';
      }
      
      alert(errorMessage);
    } finally {
      logger.debug('Image processing completed, updating UI state');
      setIsProcessing(false);
      setLoading(false);
    }
  };
  return <div className="w-full max-w-4xl mx-auto px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
        Scan Your Bookshelf
      </h1>
      {/* Tabs */}
      <div className="border-b border-border mb-6 overflow-x-auto">
        <div className="flex -mb-px min-w-max">
          <button className={`py-2 px-3 sm:px-4 text-center border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'camera' ? 'border-primary-600 text-primary-700 dark:border-primary-400 dark:text-primary-300' : 'border-transparent text-foreground hover:text-foreground hover:border-border'}`} onClick={() => setActiveTab('camera')}>
            <div className="flex flex-col items-center">
              <Camera className="w-5 h-5 mb-1" />
              <span>Camera</span>
            </div>
          </button>
          <button className={`py-2 px-3 sm:px-4 text-center border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'upload' ? 'border-primary-600 text-primary-700 dark:border-primary-400 dark:text-primary-300' : 'border-transparent text-foreground hover:text-foreground hover:border-border'}`} onClick={() => setActiveTab('upload')}>
            <div className="flex flex-col items-center">
              <Upload className="w-5 h-5 mb-1" />
              <span>Upload</span>
            </div>
          </button>
          <button className={`py-2 px-3 sm:px-4 text-center border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'url' ? 'border-primary-600 text-primary-700 dark:border-primary-400 dark:text-primary-300' : 'border-transparent text-foreground hover:text-foreground hover:border-border'}`} onClick={() => setActiveTab('url')}>
            <div className="flex flex-col items-center">
              <LinkIcon className="w-5 h-5 mb-1" />
              <span>URL</span>
            </div>
          </button>
        </div>
      </div>
      {/* Tab content */}
      <div className="mb-8">
        {activeTab === 'camera' && <div className="bg-card border border-border rounded-lg p-6">
            <div className="aspect-video bg-black/10 dark:bg-white/5 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
              {!cameraStream ? (
                <>
                  <Camera className="h-12 w-12 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Camera preview will appear here
                  </span>
                </>
              ) : (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted
                  className="w-full h-full object-cover"
                />
              )}
              {capturedImage && (
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="w-full h-full object-cover"
                />
              )}
              {/* Hidden canvas for image capture */}
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex gap-3">
              {!cameraStream ? (
                <button 
                  className="flex-1 py-2 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-700 dark:hover:bg-primary-600" 
                  onClick={startCamera}
                >
                  Start Camera
                </button>
              ) : (
                <>
                  <button 
                    className="flex-1 py-2 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-700 dark:hover:bg-primary-600" 
                    onClick={captureImage}
                  >
                    Capture Image
                  </button>
                  <button 
                    className="py-2 px-4 bg-destructive text-destructive-foreground font-medium rounded-md hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-destructive/50 focus:ring-offset-2" 
                    onClick={stopCamera}
                  >
                    Stop Camera
                  </button>
                </>
              )}
            </div>
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
