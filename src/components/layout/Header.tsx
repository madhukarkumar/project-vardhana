import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, User, Moon, Sun, Menu, LogOut } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-border-card-light dark:border-border-card-dark bg-background-secondary-light dark:bg-background-secondary-dark px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-background-card-light dark:hover:bg-background-card-dark rounded-lg lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative max-w-md flex-1 hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search agents, playbooks..."
            className="h-10 w-full rounded-lg border border-border-card-light dark:border-border-card-dark bg-background-card-light dark:bg-background-card-dark pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-background-card-light dark:hover:bg-background-card-dark transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        <button 
          className="relative rounded-full p-2 hover:bg-background-card-light dark:hover:bg-background-card-dark"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
        
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 hover:bg-background-card-light dark:hover:bg-background-card-dark rounded-lg p-2"
          >
            <span className="text-sm font-medium hidden sm:block">John Doe</span>
            <div className="h-8 w-8 rounded-full bg-background-card-light dark:bg-background-card-dark p-1">
              <User className="h-full w-full text-gray-600 dark:text-gray-400" />
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-background-card-light dark:bg-background-card-dark shadow-card dark:shadow-card-dark border border-border-card-light dark:border-border-card-dark py-1">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-background-secondary-light dark:hover:bg-background-secondary-dark"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}