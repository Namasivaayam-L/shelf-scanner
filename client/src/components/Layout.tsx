import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Camera, Settings, BarChart3, Home as HomeIcon, Bookmark } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
export function Layout({
  children,
  showResults = false
}: {
  children: React.ReactNode;
  showResults?: boolean;
}) {
  const location = useLocation();
  const navigation = [{
    name: 'Home',
    href: '/',
    icon: HomeIcon
  }, {
    name: 'Scan Books',
    href: '/scan',
    icon: Camera
  }, {
    name: 'Saved Books',
    href: '/saved',
    icon: Bookmark
  }, {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  }, {
    name: 'Admin',
    href: '/admin',
    icon: BarChart3
  }];
  // Conditionally add Book Results to navigation if showResults is true
  if (showResults) {
    navigation.splice(2, 0, {
      name: 'Book Results',
      href: '/results',
      icon: BookOpen
    });
  }
  return <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow border-r border-border bg-card pt-5">
            <div className="flex items-center justify-between flex-shrink-0 px-4">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                Shelf Scanner
              </span>
              <ThemeToggle />
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map(item => {
                const isActive = location.pathname === item.href;
                return <Link key={item.name} to={item.href} className={`${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-foreground hover:bg-accent hover:text-accent-foreground'} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
                      <item.icon className={`${isActive ? 'text-primary-700 dark:text-primary-300' : 'text-foreground group-hover:text-accent-foreground'} mr-3 flex-shrink-0 h-5 w-5`} aria-hidden="true" />
                      {item.name}
                    </Link>;
              })}
              </nav>
            </div>
          </div>
        </div>
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between w-full h-16 px-4 border-b border-border bg-card">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
            Shelf Scanner
          </span>
          <div className="flex items-center space-x-1">
            <ThemeToggle />
            <div className="flex space-x-1">
              {navigation.map(item => {
              const isActive = location.pathname === item.href;
              return <Link key={item.name} to={item.href} className={`${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-foreground hover:bg-accent hover:text-accent-foreground'} p-2 rounded-md`} aria-label={item.name}>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </Link>;
            })}
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <main className="relative flex-1 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="px-4 sm:px-6 md:px-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>;
}