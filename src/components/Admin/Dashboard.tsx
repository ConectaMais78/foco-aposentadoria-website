
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Eye, 
  TrendingUp,
  Calendar,
  Clock,
  BarChart3,
  Globe,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  // Dados mockados - em produção viria de uma API
  const stats = {
    totalVisits: 15420,
    monthlyVisits: 2850,
    blogPosts: 24,
    messages: 12,
    teamMembers: 6,
    publishedPages: 8
  };

  const recentPosts = [
    {
      id: '1',
      title: 'Como requerer aposentadoria por idade',
      author: 'Dr. João Silva',
      date: '2024-01-15',
      status: 'published',
      views: 1250
    },
    {
      id: '2',
      title: 'Revisão de benefícios: quando solicitar?',
      author: 'Dra. Maria Santos',
      date: '2024-01-12',
      status: 'draft',
      views: 0
    }
  ];

  const recentMessages = [
    {
      id: '1',
      name: 'Ana Costa',
      subject: 'Dúvida sobre aposentadoria especial',
      date: '2024-01-16',
      status: 'unread'
    },
    {
      id: '2',
      name: 'Carlos Silva',
      subject: 'Consultoria para revisão',
      date: '2024-01-15',
      status: 'read'
    }
  ];

  const visitTrend = [
    { month: 'Nov', visits: 12400 },
    { month: 'Dez', visits: 14200 },
    { month: 'Jan', visits: 15420 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white font-playfair">Dashboard</h1>
          <p className="text-gray-300 mt-2">Bem-vindo ao painel administrativo</p>
        </div>
        <div className="flex items-center text-sm text-gray-400 bg-navy/50 px-4 py-2 rounded-lg border border-white/10">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 hover-lift backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-200">
              Visitas Totais
            </CardTitle>
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Eye className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalVisits.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-400 mt-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% este mês
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30 hover-lift backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-200">
              Posts do Blog
            </CardTitle>
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.blogPosts}</div>
            <div className="text-xs text-gray-400 mt-2">
              {recentPosts.filter(p => p.status === 'published').length} publicados
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30 hover-lift backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-200">
              Mensagens
            </CardTitle>
            <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center animate-pulse">
              <MessageSquare className="h-4 w-4 text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.messages}</div>
            <div className="text-xs text-orange-400 mt-2">
              {recentMessages.filter(m => m.status === 'unread').length} não lidas
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 hover-lift backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-200">
              Equipe
            </CardTitle>
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.teamMembers}</div>
            <div className="text-xs text-gray-400 mt-2">
              membros ativos
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Postagens recentes */}
        <Card className="bg-gradient-to-br from-navy/50 to-darkNavy/50 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                <FileText className="h-5 w-5 text-green-400" />
              </div>
              Postagens Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="p-4 bg-darkNavy/30 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300 hover-lift">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm mb-1">{post.title}</h4>
                      <div className="flex items-center text-xs text-gray-400 space-x-4">
                        <span>Por {post.author}</span>
                        <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                        {post.views > 0 && (
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {post.views} visualizações
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full border ${
                      post.status === 'published' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }`}>
                      {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mensagens recentes */}
        <Card className="bg-gradient-to-br from-navy/50 to-darkNavy/50 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mr-3">
                <MessageSquare className="h-5 w-5 text-orange-400" />
              </div>
              Mensagens Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="p-4 bg-darkNavy/30 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300 hover-lift">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h4 className="font-medium text-white text-sm">{message.name}</h4>
                        {message.status === 'unread' && (
                          <div className="ml-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-300 mb-1">{message.subject}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(message.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de visitas (simulado) */}
      <Card className="bg-gradient-to-br from-navy/50 to-darkNavy/50 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
              <BarChart3 className="h-5 w-5 text-blue-400" />
            </div>
            Tendência de Visitas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-32 space-x-4">
            {visitTrend.map((item, index) => (
              <div key={item.month} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out"
                  style={{ 
                    height: `${(item.visits / Math.max(...visitTrend.map(v => v.visits))) * 100}%`,
                    animationDelay: `${index * 200}ms`
                  }}
                ></div>
                <div className="text-xs text-gray-400 mt-2">{item.month}</div>
                <div className="text-xs text-white font-medium">{item.visits.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
