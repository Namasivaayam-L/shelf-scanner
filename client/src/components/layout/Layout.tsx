import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeProvider } from '../../contexts/ThemeContext';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  return <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-dark-primary transition-colors duration-200">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>;
};
export default Layout;