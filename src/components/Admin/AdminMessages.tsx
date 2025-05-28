
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, MessageSquare, Archive, Clock, User, Mail, Phone } from "lucide-react";
import { ContactMessage } from "@/types/admin";

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  
  useEffect(() => {
    // Carregar mensagens do localStorage
    const storedMessages = localStorage.getItem('contactMessages');
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages);
      // Converter formato antigo para novo se necessário
      const formattedMessages = parsedMessages.map((msg: any) => ({
        ...msg,
        status: msg.status || 'unread'
      }));
      setMessages(formattedMessages);
    }
  }, []);
  
  const handleStatusChange = (id: string, status: ContactMessage['status']) => {
    const updatedMessages = messages.map(message => 
      message.id === id ? { ...message, status } : message
    );
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, status });
    }
  };
  
  const handleDelete = (id: string) => {
    const updatedMessages = messages.filter(message => message.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true;
    return message.status === filter;
  });

  const getStatusBadge = (status: ContactMessage['status']) => {
    switch (status) {
      case 'unread':
        return <Badge variant="destructive">Não lida</Badge>;
      case 'read':
        return <Badge variant="secondary">Lida</Badge>;
      case 'archived':
        return <Badge variant="outline">Arquivada</Badge>;
      default:
        return <Badge variant="secondary">Lida</Badge>;
    }
  };

  const unreadCount = messages.filter(m => m.status === 'unread').length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mensagens de Contato</h1>
          <p className="text-gray-600 mt-1">
            {messages.length} mensagens totais • {unreadCount} não lidas
          </p>
        </div>
        
        <div className="flex space-x-2">
          {(['all', 'unread', 'read', 'archived'] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="capitalize"
            >
              {filterType === 'all' ? 'Todas' : 
               filterType === 'unread' ? 'Não lidas' :
               filterType === 'read' ? 'Lidas' : 'Arquivadas'}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de mensagens */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-orange-500" />
              Mensagens ({filteredMessages.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  {filter === 'all' ? 'Nenhuma mensagem encontrada' : `Nenhuma mensagem ${filter === 'unread' ? 'não lida' : filter === 'read' ? 'lida' : 'arquivada'}`}
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedMessage && selectedMessage.id === message.id 
                          ? 'bg-orange-50 border-r-2 border-orange-500' 
                          : ''
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{message.name}</h4>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(message.status)}
                          {message.status === 'unread' && (
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 font-medium mb-1">{message.subject}</p>
                      <p className="text-xs text-gray-500 mb-2">{message.email}</p>
                      <p className="text-xs text-gray-400">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {new Date(message.date).toLocaleDateString('pt-BR')} às{' '}
                        {new Date(message.date).toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Detalhes da mensagem */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedMessage ? 'Detalhes da Mensagem' : 'Selecione uma Mensagem'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-6">
                {/* Cabeçalho da mensagem */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {selectedMessage.subject}
                      </h3>
                      {getStatusBadge(selectedMessage.status)}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(selectedMessage.id, 
                          selectedMessage.status === 'read' ? 'unread' : 'read'
                        )}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        {selectedMessage.status === 'read' ? 'Marcar não lida' : 'Marcar como lida'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(selectedMessage.id, 'archived')}
                      >
                        <Archive className="h-4 w-4 mr-1" />
                        Arquivar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(selectedMessage.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Nome:</span>
                      <span className="ml-1">{selectedMessage.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Email:</span>
                      <span className="ml-1">{selectedMessage.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Telefone:</span>
                      <span className="ml-1">{selectedMessage.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Conteúdo da mensagem */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-3">Mensagem:</h4>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
                
                {/* Ações */}
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Responder por Email
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = `tel:${selectedMessage.phone}`}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center py-12">
                <div className="max-w-md">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Nenhuma mensagem selecionada
                  </h3>
                  <p className="text-gray-500">
                    Selecione uma mensagem da lista ao lado para visualizar os detalhes e interagir com ela.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMessages;
