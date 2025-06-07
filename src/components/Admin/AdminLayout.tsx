
import React, { useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';
import { AdminSpotlightNav } from '@/components/ui/spotlight-button';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active index based on current route
  const getActiveIndex = () => {
    if (location.pathname === '/admin/blog') return 0;
    if (location.pathname === '/admin/messages') return 1;
    return 0;
  };

  const [activeIndex, setActiveIndex] = useState(getActiveIndex());

  const handleNavigation = (index: number) => {
    setActiveIndex(index);
    switch (index) {
      case 0:
        navigate('/admin/blog');
        break;
      case 1:
        navigate('/admin/messages');
        break;
      case 2:
        logout();
        break;
      default:
        break;
    }
  };

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="flex w-full min-h-screen">
        <div className="flex-1">
          <header className="sticky top-0 z-40 border-b border-gray-700 bg-gray-900/90 backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between gap-4 px-6">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold text-white font-playfair">
                  Painel Administrativo
                </h1>
              </div>
              
              {/* Spotlight Navigation */}
              <div className="flex items-center gap-4">
                <AdminSpotlightNav 
                  activeIndex={activeIndex} 
                  onNavigate={handleNavigation} 
                />
                <div className="px-3 py-1 bg-orange/20 text-orange text-xs font-medium rounded-full">
                  {user.role === 'admin' ? 'Administrador' : 'Editor'}
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
