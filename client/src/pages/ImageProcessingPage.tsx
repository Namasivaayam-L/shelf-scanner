import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraIcon, UploadIcon, LinkIcon, XIcon, CheckIcon, LoaderIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Input from '../components/ui/Input';
const ImageProcessingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'url'>('camera');
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  // Handle camera capture (simulated)
  const handleCapturePhoto = () => {
    // In a real app, this would access the camera API
    // For now, we'll simulate with a placeholder image
    setImageUrl('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80');
  };
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  // Handle URL input
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput) {
      setImageUrl(urlInput);
    }
  };
  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = event => {
        setImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  // Process the image
  const processImage = () => {
    if (!imageUrl) return;
    setIsProcessing(true);
    setProcessingStatus('Analyzing image...');
    setProcessingProgress(0);
    // Simulate processing steps
    const simulateProcessing = () => {
      const steps = [{
        status: 'Analyzing image...',
        progress: 10
      }, {
        status: 'Detecting book spines...',
        progress: 25
      }, {
        status: 'Extracting book titles...',
        progress: 50
      }, {
        status: 'Fetching book information...',
        progress: 75
      }, {
        status: 'Preparing results...',
        progress: 90
      }, {
        status: 'Complete!',
        progress: 100
      }];
      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          setProcessingStatus(steps[currentStep].status);
          setProcessingProgress(steps[currentStep].progress);
          currentStep++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            navigate('/results');
          }, 1000);
        }
      }, 1000);
    };
    simulateProcessing();
  };
  // Reset the form
  const resetForm = () => {
    setImageUrl(null);
    setUrlInput('');
    setIsProcessing(false);
    setProcessingStatus(null);
    setProcessingProgress(0);
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Scan Your Bookshelf
      </h1>
      {!isProcessing ? <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button className={`px-4 py-2 ${activeTab === 'camera' ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400' : 'text-gray-500 dark:text-gray-400'}`} onClick={() => setActiveTab('camera')}>
                  <div className="flex items-center">
                    <CameraIcon className="h-5 w-5 mr-2" />
                    <span>Camera</span>
                  </div>
                </button>
                <button className={`px-4 py-2 ${activeTab === 'upload' ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400' : 'text-gray-500 dark:text-gray-400'}`} onClick={() => setActiveTab('upload')}>
                  <div className="flex items-center">
                    <UploadIcon className="h-5 w-5 mr-2" />
                    <span>Upload</span>
                  </div>
                </button>
                <button className={`px-4 py-2 ${activeTab === 'url' ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400' : 'text-gray-500 dark:text-gray-400'}`} onClick={() => setActiveTab('url')}>
                  <div className="flex items-center">
                    <LinkIcon className="h-5 w-5 mr-2" />
                    <span>URL</span>
                  </div>
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {activeTab === 'camera' && <div className="text-center">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-4 aspect-w-4 aspect-h-3 relative">
                    {imageUrl ? <img src={imageUrl} alt="Captured" className="mx-auto max-h-[300px] object-contain" /> : <div className="flex flex-col items-center justify-center h-full">
                        <CameraIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Camera preview will appear here
                        </p>
                      </div>}
                  </div>
                  {!imageUrl ? <Button onClick={handleCapturePhoto} icon={<CameraIcon className="h-5 w-5" />}>
                      Capture Photo
                    </Button> : <div className="flex justify-center gap-4">
                      <Button variant="outline" onClick={resetForm} icon={<XIcon className="h-5 w-5" />}>
                        Retake
                      </Button>
                      <Button onClick={processImage} icon={<CheckIcon className="h-5 w-5" />}>
                        Use This Photo
                      </Button>
                    </div>}
                </div>}
              {activeTab === 'upload' && <div className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400' : 'border-gray-300 dark:border-gray-600'}`} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}>
                  {imageUrl ? <div className="mb-4">
                      <img src={imageUrl} alt="Uploaded" className="mx-auto max-h-[300px] object-contain" />
                    </div> : <div className="flex flex-col items-center justify-center py-8">
                      <UploadIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Drag and drop an image here, or
                      </p>
                      <label className="cursor-pointer">
                        <span className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white px-4 py-2 rounded-md">
                          Browse Files
                        </span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                      </label>
                    </div>}
                  {imageUrl && <div className="flex justify-center gap-4 mt-4">
                      <Button variant="outline" onClick={resetForm} icon={<XIcon className="h-5 w-5" />}>
                        Remove
                      </Button>
                      <Button onClick={processImage} icon={<CheckIcon className="h-5 w-5" />}>
                        Process Image
                      </Button>
                    </div>}
                </div>}
              {activeTab === 'url' && <div>
                  <form onSubmit={handleUrlSubmit} className="mb-4">
                    <div className="flex gap-2">
                      <Input type="url" placeholder="Enter image URL" value={urlInput} onChange={e => setUrlInput(e.target.value)} className="flex-grow" icon={<LinkIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />} />
                      <Button type="submit" disabled={!urlInput}>
                        Load
                      </Button>
                    </div>
                  </form>
                  {imageUrl && <div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                        <img src={imageUrl} alt="From URL" className="mx-auto max-h-[300px] object-contain" />
                      </div>
                      <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={resetForm} icon={<XIcon className="h-5 w-5" />}>
                          Remove
                        </Button>
                        <Button onClick={processImage} icon={<CheckIcon className="h-5 w-5" />}>
                          Process Image
                        </Button>
                      </div>
                    </div>}
                </div>}
            </CardContent>
          </Card>
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">Tips for best results:</p>
            <ul className="text-sm">
              <li>Ensure good lighting when taking photos</li>
              <li>Make sure book spines are clearly visible</li>
              <li>Try to capture book titles in the frame</li>
            </ul>
          </div>
        </div> : <div className="max-w-xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <LoaderIcon className="h-12 w-12 text-primary-600 dark:text-primary-400 animate-spin mx-auto" />
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                Processing Your Bookshelf
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {processingStatus}
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
                <div className="bg-primary-600 dark:bg-primary-500 h-2.5 rounded-full transition-all duration-300" style={{
              width: `${processingProgress}%`
            }}></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This may take a moment depending on the number of books and
                image quality.
              </p>
            </CardContent>
          </Card>
        </div>}
    </div>;
};
export default ImageProcessingPage;