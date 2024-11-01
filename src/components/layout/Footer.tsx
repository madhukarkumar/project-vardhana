import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-4 px-6`}>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div>
          © {currentYear} GrowthOS. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Terms of Service
          </Link>
          <a 
            href="mailto:support@growthos.ai" 
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}