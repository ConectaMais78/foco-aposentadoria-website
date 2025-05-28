
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
  BarChart3
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
      status: 'published'
    },
    {
      id: '2',
      title: 'Revisão de benefícios: quando solicitar?',
      author: 'Dra. Maria Santos',
      date: '2024-01-12',
      status: 'draft'
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center text-sm text-gray-500">
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
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Visitas Totais
            </CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalVisits.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Posts do Blog
            </CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.blogPosts}</div>
            <p className="text-xs text-gray-500 mt-1">
              {recentPosts.filter(p => p.status === 'published').length} publicados
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Mensagens
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.messages}</div>
            <p className="text-xs text-orange-600 mt-1">
              {recentMessages.filter(m => m.status === 'unread').length} não lidas
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Equipe
            </CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.teamMembers}</div>
            <p className="text-xs text-gray-500 mt-1">
              membros ativos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Postagens recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-green-500" />
              Postagens Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{post.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Por {post.author} • {new Date(post.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mensagens recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-orange-500" />
              Mensagens Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-900 text-sm">{message.name}</h4>
                      {message.status === 'unread' && (
                        <span className="ml-2 w-2 h-2 bg-orange-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{message.subject}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(message.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
