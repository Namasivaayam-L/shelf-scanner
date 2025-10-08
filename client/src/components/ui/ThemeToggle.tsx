import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
const ThemeToggle: React.FC = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <button onClick={toggleTheme} className="p-2 rounded-md text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 focus:outline-none" aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
    </button>;
};
export default ThemeToggle;