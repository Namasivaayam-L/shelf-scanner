import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, TwitterIcon, InstagramIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-white dark:bg-dark-card border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
              Shelf Scanner
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Discover your next favorite book with AI-powered recommendations
              based on your bookshelf.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/scan" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Scan Books
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Recommendations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
              Connect
            </h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Shelf Scanner. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;