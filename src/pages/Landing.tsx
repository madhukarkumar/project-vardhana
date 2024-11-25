import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Zap, Brain, Workflow, Moon, Sun } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useTheme } from '../hooks/useTheme';

export function Landing() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">COCMO</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            <Link
              to="/dashboard"
              className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Login
            </Link>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors">
              Sign Up
            </button>
          </div>
        </nav>

        <div className="py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
            Meet your CMO Co-Agent
          </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          A powerful growth operating system with three simple constructs to drive revenue growth.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors font-medium"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="px-8 py-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <Card.Body>
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                    <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI Agents</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Intelligent agents that automate your marketing tasks and workflows.
                  </p>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-4">
                    <Workflow className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Playbooks</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create and manage automated marketing workflows with ease.
                  </p>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                    <Zap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Real-time Analytics</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Monitor and optimize your marketing performance in real-time.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}