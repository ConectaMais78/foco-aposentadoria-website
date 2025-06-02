
import React from 'react';
import { Navigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deepNavy via-navy to-darkNavy">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AdminSidebar />
          <SidebarInset className="flex-1">
            <header className="sticky top-0 z-40 border-b border-white/10 bg-deepNavy/80 backdrop-blur-sm">
              <div className="flex h-16 items-center gap-4 px-6">
                <SidebarTrigger className="text-white hover:bg-white/10" />
                <div className="flex-1">
                  <h1 className="text-xl font-semibold text-white font-playfair">
                    Painel Administrativo
                  </h1>
                </div>
                <div className="flex items-center space-x-2">
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
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
