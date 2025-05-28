
import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
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
  UserCircle
} from 'lucide-react';

const AdminLayout = () => {
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Painel Admin</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {filteredMenuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-orange-100 text-orange-900 border-r-2 border-orange-500'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Conteúdo principal */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold text-gray-900">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Painel Administrativo'}
              </h2>
            </div>
          </div>
        </header>

        {/* Conteúdo da página */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
