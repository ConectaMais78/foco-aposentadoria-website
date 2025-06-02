
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/contexts/AdminContext';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Eye,
  TrendingUp,
  Calendar,
  Clock,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { blogPosts, messages, teamMembers, analyticsData } = useAdmin();

  const stats = [
    {
      title: 'Visitantes do Mês',
      value: analyticsData.pageViews?.thisMonth?.toLocaleString() || '2,847',
      change: `+${analyticsData.pageViews?.growth || 12.5}%`,
      icon: Eye,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Posts do Blog',
      value: blogPosts.length.toString(),
      change: '+3',
      icon: FileText,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Mensagens',
      value: messages.length.toString(),
      change: `+${messages.filter(m => m.status === 'unread').length}`,
      icon: MessageSquare,
      color: 'from-orange to-orangeLight'
    },
    {
      title: 'Membros da Equipe',
      value: teamMembers.length.toString(),
      change: '+1',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const recentActivities = [
    {
      title: 'Nova mensagem de contato recebida',
      time: '2 min atrás',
      type: 'message'
    },
    {
      title: 'Post "Planejamento de Aposentadoria" publicado',
      time: '1 hora atrás',
      type: 'blog'
    },
    {
      title: 'Página "Sobre" atualizada',
      time: '3 horas atrás',
      type: 'page'
    },
    {
      title: 'Novo membro da equipe adicionado',
      time: '5 horas atrás',
      type: 'user'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy/80 to-darkNavy/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white font-playfair">
              Bem-vindo, {user?.name}!
            </h1>
            <p className="text-gray-300 mt-1">
              Aqui está um resumo do seu painel administrativo
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Último acesso</p>
              <p className="text-white">
                {user?.lastLogin ? new Date(user.lastLogin).toLocaleString('pt-BR') : 'Primeiro acesso'}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange to-orangeLight rounded-full flex items-center justify-center animate-glow">
              <Activity className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-navy/80 to-darkNavy/80 backdrop-blur-sm border-white/10 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <span className="text-green-400 text-sm font-medium flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center animate-glow`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="bg-gradient-to-br from-navy/80 to-darkNavy/80 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-orange" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-orange rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.title}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-navy/80 to-darkNavy/80 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-orange" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full text-left p-4 rounded-lg bg-gradient-to-r from-orange/20 to-orangeLight/20 border border-orange/30 hover:from-orange/30 hover:to-orangeLight/30 transition-all duration-300 hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Criar Nova Postagem</p>
                  <p className="text-gray-400 text-sm">Adicionar conteúdo ao blog</p>
                </div>
                <FileText className="h-5 w-5 text-orange" />
              </div>
            </button>
            
            <button className="w-full text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Ver Mensagens</p>
                  <p className="text-gray-400 text-sm">Responder contatos</p>
                </div>
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
            </button>
            
            <button className="w-full text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Gerenciar Equipe</p>
                  <p className="text-gray-400 text-sm">Editar membros da equipe</p>
                </div>
                <Users className="h-5 w-5 text-gray-400" />
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
