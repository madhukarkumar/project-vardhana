import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { Dashboard } from './pages/Dashboard';
import { Agents } from './pages/Agents';
import { AgentDetails } from './pages/AgentDetails';
import { Playbooks } from './pages/Playbooks';
import { PlaybookDetails } from './pages/PlaybookDetails';
import { Knowledge } from './pages/Knowledge';
import { Settings } from './pages/Settings';
import { LeadGenerationDetails } from './pages/LeadGenerationDetails';
import { Landing } from './pages/Landing';

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/dashboard/*"
        element={
          <div className="min-h-screen bg-white dark:bg-background-dark">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div 
              className={`flex flex-col min-h-screen transition-all duration-300 ${
                isSidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
              }`}
            >
              <Header toggleSidebar={toggleSidebar} />
              <main className="flex-1 p-4 sm:p-6">
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="agents" element={<Agents />} />
                  <Route path="agents/:id" element={<AgentDetails />} />
                  <Route path="playbooks" element={<Playbooks />} />
                  <Route path="playbooks/:id" element={<PlaybookDetails />} />
                  <Route path="knowledge" element={<Knowledge />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="lead-generation" element={<LeadGenerationDetails />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}