import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Layout, 
  Home, 
  Bot, 
  BookOpen, 
  Database, 
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navigation = [
  { name: 'Command Center', icon: Home, href: '/' },
  { name: 'Knowledge', icon: Database, href: '/knowledge' },
  { name: 'Agents', icon: Bot, href: '/agents' },
  { name: 'Playbooks', icon: BookOpen, href: '/playbooks' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm lg:hidden z-40"
          onClick={toggleSidebar}
        />
      )}
      
      <div 
        className={`flex h-screen flex-col fixed left-0 top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'
        } z-50`}
      >
        <div className="flex h-16 items-center gap-2 px-6 border-b border-gray-200 dark:border-gray-800 justify-between">
          <div className="flex items-center gap-2">
            <Layout className="h-6 w-6 text-indigo-600" />
            <span className={`text-xl font-semibold transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0 hidden'
            }`}>
              GrowthOS
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg hidden lg:block"
          >
            {isOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 group transition-colors ${
                  location.pathname === item.href ? 'bg-gray-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400' : ''
                }`}
                title={!isOpen ? item.name : undefined}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className={`transition-opacity duration-300 ${
                  isOpen ? 'opacity-100' : 'opacity-0 hidden'
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}