import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-card-light dark:border-border-card-dark bg-background-secondary-light dark:bg-background-secondary-dark py-4 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="text-center sm:text-left">
          © {currentYear} Robynn. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
          <Link to="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Terms of Service
          </Link>
          <a 
            href="mailto:support@growthos.ai" 
            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}