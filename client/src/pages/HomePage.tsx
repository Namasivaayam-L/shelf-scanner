import React from 'react';
import { Link } from 'react-router-dom';
import { CameraIcon, UploadIcon, LinkIcon, BookOpenIcon, BookIcon, BrainIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
const HomePage = () => {
  const features = [{
    icon: <CameraIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
    title: 'Scan Your Bookshelf',
    description: 'Take a photo of your bookshelf or upload an existing image to get started.'
  }, {
    icon: <BookIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
    title: 'Identify Books',
    description: 'Our AI analyzes your bookshelf and identifies the books you already own.'
  }, {
    icon: <BrainIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
    title: 'Get Smart Recommendations',
    description: 'Receive personalized book recommendations based on your reading preferences and collection.'
  }];
  return <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Discover Your Next Favorite Book
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                Shelf Scanner uses AI to analyze your bookshelf and recommend
                books you'll love based on what you already own and enjoy.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/scan">
                  <Button size="lg" icon={<CameraIcon className="h-5 w-5" />}>
                    Scan Your Bookshelf
                  </Button>
                </Link>
                <Link to="/recommendations">
                  <Button size="lg" variant="outline" icon={<BookOpenIcon className="h-5 w-5" />}>
                    View Recommendations
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-5 aspect-h-4">
                <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Bookshelf" className="rounded-lg shadow-xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Input Methods Section */}
      <section className="py-16 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Multiple Ways to Scan Your Books
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the method that works best for you to start discovering new
              book recommendations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow">
              <CardContent className="text-center p-6">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CameraIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Camera Capture
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Open your device camera to take a photo of your bookshelf
                  directly.
                </p>
                <Link to="/scan">
                  <Button fullWidth>Use Camera</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow">
              <CardContent className="text-center p-6">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <UploadIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  File Upload
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Upload an image from your device or drag and drop directly.
                </p>
                <Link to="/scan">
                  <Button fullWidth>Upload Image</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow">
              <CardContent className="text-center p-6">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <LinkIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  URL Input
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Paste a URL to an image of your bookshelf from the web.
                </p>
                <Link to="/scan">
                  <Button fullWidth>Enter URL</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Shelf Scanner uses advanced AI to analyze your bookshelf and
              provide personalized recommendations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-white dark:bg-dark-card p-4 rounded-full shadow-md dark:shadow-gray-900/30 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-primary-600 dark:bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Discover Your Next Read?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Start by scanning your bookshelf and get personalized
            recommendations in minutes.
          </p>
          <Link to="/scan">
            <Button size="lg" variant="secondary" icon={<CameraIcon className="h-5 w-5" />} className="bg-white text-primary-600 hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200">
              Scan Your Bookshelf Now
            </Button>
          </Link>
        </div>
      </section>
    </div>;
};
export default HomePage;