import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, MenuIcon, XIcon } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <nav className="bg-white dark:bg-dark-card shadow-sm dark:shadow-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Shelf Scanner
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              Home
            </Link>
            <Link to="/scan" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              Scan Books
            </Link>
            <Link to="/recommendations" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              Recommendations
            </Link>
            <Link to="/settings" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              Settings
            </Link>
            <ThemeToggle />
            <Link to="/admin" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600">
              Admin
            </Link>
          </div>
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none">
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-dark-card">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/scan" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
              Scan Books
            </Link>
            <Link to="/recommendations" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
              Recommendations
            </Link>
            <Link to="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
              Settings
            </Link>
            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600" onClick={() => setIsMenuOpen(false)}>
              Admin
            </Link>
          </div>
        </div>}
    </nav>;
};
export default Navbar;