import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './utils/supabaseClient';
import { useAuth } from './hooks/useAuth';
import { Login } from './components/Login';
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
import { Home } from './pages/Home';
import { Toaster } from 'react-hot-toast';
import NewHome from './pages/new-home';
import { AuthCallback } from './pages/AuthCallback';

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <AppContent isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Toaster />
    </SessionContextProvider>
  );
}

function AppContent({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean; toggleSidebar: () => void }) {
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have completed the initial auth check
    supabase.auth.getSession().then(() => {
      console.log("Initial auth check completed");
      setIsLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/new-home', '/login', '/signup', '/auth/callback'];
  const isPublicRoute = (path: string) => publicRoutes.includes(path);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/new-home" element={<NewHome />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route 
        path="/login" 
        element={
          !session ? <Login /> : <Navigate to="/dashboard" replace />
        } 
      />
      <Route 
        path="/signup" 
        element={
          !session ? <Login isSignUp={true} /> : <Navigate to="/dashboard" replace />
        } 
      />
      
      {/* Protected Routes - Only accessible when logged in */}
      {session ? (
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-white dark:bg-background-dark">
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <div 
                className={`flex flex-col min-h-screen transition-all duration-300 ${
                  isSidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
                }`}
              >
                <Header toggleSidebar={toggleSidebar} onLogout={handleLogout} />
                <main className="flex-1 px-4 sm:px-6 lg:px-8">
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="agents" element={<Agents />} />
                    <Route path="agents/:id" element={<AgentDetails />} />
                    <Route path="playbooks" element={<Playbooks />} />
                    <Route path="playbooks/:id" element={<PlaybookDetails />} />
                    <Route path="knowledge" element={<Knowledge />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="lead-generation/:id" element={<LeadGenerationDetails />} />
                    <Route path="*" element={<Navigate to="../dashboard" replace />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </div>
          }
        />
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}