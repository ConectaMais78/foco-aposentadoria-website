import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  PenTool,
  UserCircle,
  Shield,
  Bell,
  Search
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout, hasPermission } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/admin/dashboard',
      permission: 'dashboard:read'
    },
    { 
      icon: FileText, 
      label: 'Páginas', 
      path: '/admin/pages',
      permission: 'pages:read'
    },
    { 
      icon: PenTool, 
      label: 'Blog', 
      path: '/admin/blog',
      permission: 'blog:read'
    },
    { 
      icon: Users, 
      label: 'Equipe', 
      path: '/admin/team',
      permission: 'team:read'
    },
    { 
      icon: MessageSquare, 
      label: 'Mensagens', 
      path: '/admin/messages',
      permission: 'messages:read'
    },
    { 
      icon: Image, 
      label: 'Mídia', 
      path: '/admin/media',
      permission: 'media:read'
    },
    { 
      icon: UserCircle, 
      label: 'Usuários', 
      path: '/admin/users',
      permission: 'users:read'
    },
    { 
      icon: Settings, 
      label: 'Configurações', 
      path: '/admin/settings',
      permission: 'settings:read'
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    user.role === 'admin' || hasPermission(item.permission)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-deepNavy via-navy to-darkNavy flex relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-orange/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-orange/3 rounded-full blur-xl animate-pulse"></div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-navy/95 to-deepNavy/95 backdrop-blur-sm border-r border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-orange to-orangeLight rounded-full flex items-center justify-center mr-3 animate-glow">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white font-playfair">Painel Admin</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-gray-400 hover:text-white hover:bg-white/10"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {filteredMenuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 hover-lift ${
                    isActive
                      ? 'bg-gradient-to-r from-orange/20 to-orangeLight/20 text-orange border border-orange/30 shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 transition-colors ${
                    isActive ? 'text-orange' : 'text-gray-400 group-hover:text-white'
                  }`} />
                  {item.label}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-orange rounded-full animate-pulse"></div>
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-gradient-to-t from-deepNavy/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-orange to-orangeLight rounded-full flex items-center justify-center animate-glow">
                <span className="text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user.role}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Conteúdo principal */}
      <div className="flex-1 lg:ml-0 relative z-10">
        {/* Header */}
        <header className="bg-gradient-to-r from-navy/80 to-darkNavy/80 backdrop-blur-sm border-b border-white/10 shadow-lg">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2 text-gray-400 hover:text-white hover:bg-white/10"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold text-white font-playfair">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Painel Administrativo'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange rounded-full animate-pulse"></span>
              </Button>
            </div>
          </div>
        </header>

        {/* Conteúdo da página */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
