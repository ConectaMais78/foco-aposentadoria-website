
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  PenTool,
  MessageSquare,
  Users,
  FileImage,
  Settings,
  BarChart3,
  Globe,
  Shield,
  LogOut,
  UserCog
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: LayoutDashboard,
    description: 'Visão geral do sistema'
  },
  {
    title: 'Blog',
    url: '/admin/blog',
    icon: PenTool,
    description: 'Gerenciar artigos'
  },
  {
    title: 'Mensagens',
    url: '/admin/messages',
    icon: MessageSquare,
    description: 'Contatos e suporte'
  },
  {
    title: 'Equipe',
    url: '/admin/team',
    icon: Users,
    description: 'Gerenciar membros'
  },
  {
    title: 'Mídia',
    url: '/admin/media',
    icon: FileImage,
    description: 'Arquivos e imagens'
  },
  {
    title: 'Analytics',
    url: '/admin/analytics',
    icon: BarChart3,
    description: 'Relatórios e métricas'
  },
  {
    title: 'Site',
    url: '/admin/site-settings',
    icon: Globe,
    description: 'Configurações gerais'
  }
];

const adminItems = [
  {
    title: 'Usuários',
    url: '/admin/users',
    icon: UserCog,
    description: 'Gerenciar acesso'
  },
  {
    title: 'Segurança',
    url: '/admin/security',
    icon: Shield,
    description: 'Logs e auditoria'
  },
  {
    title: 'Configurações',
    url: '/admin/settings',
    icon: Settings,
    description: 'Sistema e preferências'
  }
];

export function AdminSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="border-r border-white/10">
      <SidebarHeader className="border-b border-white/10 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange to-orangeLight rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-playfair">
              Admin Panel
            </h2>
            <p className="text-xs text-gray-400">Foco na Aposentadoria</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 font-medium px-2 py-1">
            Gestão de Conteúdo
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={`
                      group w-full justify-start px-3 py-2.5 text-sm transition-all duration-200
                      ${isActive(item.url) 
                        ? 'bg-gradient-to-r from-orange/20 to-orangeLight/20 text-white border-l-2 border-orange' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <Link to={item.url} className="flex items-center w-full">
                      <item.icon className={`h-4 w-4 mr-3 ${isActive(item.url) ? 'text-orange' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-gray-500 group-hover:text-gray-400">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user?.role === 'admin' && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-400 font-medium px-2 py-1">
              Administração
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      className={`
                        group w-full justify-start px-3 py-2.5 text-sm transition-all duration-200
                        ${isActive(item.url) 
                          ? 'bg-gradient-to-r from-orange/20 to-orangeLight/20 text-white border-l-2 border-orange' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <Link to={item.url} className="flex items-center w-full">
                        <item.icon className={`h-4 w-4 mr-3 ${isActive(item.url) ? 'text-orange' : 'text-gray-400'}`} />
                        <div className="flex-1">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500 group-hover:text-gray-400">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange to-orangeLight rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-gray-400 hover:text-white hover:bg-white/10 p-2"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
