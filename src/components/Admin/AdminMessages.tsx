
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Trash2, Mail, Phone, Clock, User, Send, Reply } from "lucide-react";
import { toast } from "sonner";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [isReplying, setIsReplying] = useState(false);
  
  useEffect(() => {
    loadMessages();
  }, []);
  
  const loadMessages = () => {
    const storedMessages = localStorage.getItem('contactMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  };
  
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
    if (confirm('Tem certeza que deseja excluir esta mensagem?')) {
      const updatedMessages = messages.filter(message => message.id !== id);
      setMessages(updatedMessages);
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
      toast.success("Mensagem excluída!");
    }
  };

  const handleReply = () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    // Simula envio de resposta
    handleStatusChange(selectedMessage.id, 'replied');
    setReplyText('');
    setIsReplying(false);
    toast.success("Resposta enviada com sucesso!");
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      handleStatusChange(message.id, 'read');
    }
    setIsReplying(false);
    setReplyText('');
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true;
    return message.status === filter;
  });

  const unreadCount = messages.filter(m => m.status === 'unread').length;
  const readCount = messages.filter(m => m.status === 'read').length;
  const repliedCount = messages.filter(m => m.status === 'replied').length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mensagens</h1>
          <p className="text-gray-600">
            {messages.length} total • {unreadCount} não lidas • {readCount} lidas • {repliedCount} respondidas
          </p>
        </div>
        
        <div className="flex space-x-2">
          {(['all', 'unread', 'read', 'replied'] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterType)}
            >
              {filterType === 'all' ? 'Todas' : 
               filterType === 'unread' ? 'Não lidas' : 
               filterType === 'read' ? 'Lidas' : 'Respondidas'}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lista de mensagens */}
        <Card>
          <CardHeader>
            <CardTitle>Mensagens ({filteredMessages.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma mensagem encontrada
                </div>
              ) : (
                <div className="divide-y">
                  {filteredMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                      onClick={() => handleViewMessage(message)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{message.name}</h4>
                        <div className="flex items-center space-x-2">
                          {message.status === 'unread' && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <Badge 
                            variant={
                              message.status === 'unread' ? 'destructive' : 
                              message.status === 'replied' ? 'default' : 'secondary'
                            }
                          >
                            {message.status === 'unread' ? 'Nova' : 
                             message.status === 'replied' ? 'Respondida' : 'Lida'}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm font-medium mb-1 truncate">{message.subject}</p>
                      <p className="text-xs text-gray-500 mb-2">{message.email}</p>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{message.message}</p>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(message.date).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Detalhes da mensagem */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {selectedMessage ? 'Detalhes da Mensagem' : 'Selecione uma Mensagem'}
              {selectedMessage && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsReplying(!isReplying)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Responder
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-4">
                {/* Cabeçalho */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">{selectedMessage.subject}</h3>
                    <Badge 
                      variant={
                        selectedMessage.status === 'unread' ? 'destructive' : 
                        selectedMessage.status === 'replied' ? 'default' : 'secondary'
                      }
                    >
                      {selectedMessage.status === 'unread' ? 'Nova' : 
                       selectedMessage.status === 'replied' ? 'Respondida' : 'Lida'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-sm">
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
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Data:</span>
                      <span className="ml-1">{new Date(selectedMessage.date).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Mensagem:</h4>
                  <div className="bg-white border-l-4 border-blue-200 pl-4 py-2">
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
                
                {/* Área de resposta */}
                {isReplying && (
                  <div className="space-y-3 border-t pt-4">
                    <h4 className="font-medium text-blue-600">Responder Mensagem:</h4>
                    <Textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Digite sua resposta..."
                      rows={4}
                      className="resize-none"
                    />
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleReply}
                        disabled={!replyText.trim()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Resposta
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}&body=${encodeURIComponent(replyText)}`)}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Abrir no Email
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsReplying(false);
                          setReplyText('');
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Ações */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(selectedMessage.id, 
                        selectedMessage.status === 'read' ? 'unread' : 'read'
                      )}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      {selectedMessage.status === 'read' ? 'Marcar não lida' : 'Marcar lida'}
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma mensagem selecionada
                </h3>
                <p className="text-gray-500">
                  Clique em uma mensagem da lista para visualizar os detalhes e responder.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMessages;
