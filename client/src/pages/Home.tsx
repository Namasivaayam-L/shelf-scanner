import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload, Link as LinkIcon, BookOpen } from 'lucide-react';
export function Home() {
  return <div className="w-full">
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-primary-900 to-primary-700 py-16 sm:py-24 lg:py-32 rounded-lg overflow-hidden dark:from-primary-950 dark:to-primary-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover Your Next Favorite Book
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/90 max-w-2xl mx-auto">
            Shelf Scanner uses AI to analyze your bookshelf and recommend new
            books based on your reading preferences. Simply scan your bookshelf
            and get personalized recommendations in seconds.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/scan" className="rounded-md bg-white px-5 py-3 text-base font-semibold text-primary-700 shadow-sm hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Start Scanning
            </Link>
            <a href="#features" className="text-base font-semibold leading-7 text-white hover:text-white/90 flex items-center gap-x-2 px-5 py-3">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      {/* Features section */}
      <div id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">
              Smart Recommendations
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How Shelf Scanner Works
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our AI-powered book recommendation system analyzes your bookshelf
              and suggests new books tailored to your reading preferences.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 dark:bg-primary-700">
                    <Camera className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Multiple Input Methods
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Capture a photo with your camera, upload an image file, or
                  paste a URL to an image of your bookshelf.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 dark:bg-primary-700">
                    <BookOpen className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Smart Analysis
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Our AI identifies book titles from your shelf and creates
                  brief descriptions for each book.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 dark:bg-primary-700">
                    <Upload className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Personalized Recommendations
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Get book recommendations based on your reading history, genre
                  preferences, and popular titles.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 dark:bg-primary-700">
                    <LinkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Advanced Configuration
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Switch between AI model providers and customize your
                  experience with advanced settings.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      {/* CTA section */}
      <div className="bg-card border border-border rounded-lg">
        <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="block">Ready to explore new books?</span>
            <span className="block text-primary-600 dark:text-primary-400">
              Start scanning your bookshelf today.
            </span>
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/scan" className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-5 py-3 text-base font-medium text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600">
                Get started
              </Link>
            </div>
            <div className="inline-flex rounded-md shadow">
              <a href="#features" className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-primary-700 hover:bg-gray-50 dark:bg-secondary-800 dark:text-primary-300 dark:hover:bg-secondary-700">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>;
}