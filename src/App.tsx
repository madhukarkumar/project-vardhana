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
import { CommandCenter } from './pages/CommandCenter';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-20'}`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/agents/:id" element={<AgentDetails />} />
            <Route path="/playbooks" element={<Playbooks />} />
            <Route path="/playbooks/:id" element={<PlaybookDetails />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/command" element={<CommandCenter />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;