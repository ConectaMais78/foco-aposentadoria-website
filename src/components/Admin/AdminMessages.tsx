
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Trash2, Mail, Phone, Clock, User, Send } from "lucide-react";
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
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  
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
    toast.success("Resposta enviada com sucesso!");
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true;
    return message.status === filter;
  });

  const unreadCount = messages.filter(m => m.status === 'unread').length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mensagens</h1>
          <p className="text-gray-600">
            {messages.length} total • {unreadCount} não lidas
          </p>
        </div>
        
        <div className="flex space-x-2">
          {(['all', 'unread', 'read'] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterType)}
            >
              {filterType === 'all' ? 'Todas' : 
               filterType === 'unread' ? 'Não lidas' : 'Lidas'}
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
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${
                        selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => {
                        setSelectedMessage(message);
                        if (message.status === 'unread') {
                          handleStatusChange(message.id, 'read');
                        }
                      }}
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
                      <p className="text-sm font-medium mb-1">{message.subject}</p>
                      <p className="text-xs text-gray-500 mb-2">{message.email}</p>
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
            <CardTitle>
              {selectedMessage ? 'Detalhes da Mensagem' : 'Selecione uma Mensagem'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-4">
                {/* Cabeçalho */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">{selectedMessage.subject}</h3>
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
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Mensagem:</h4>
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedMessage.message}
                  </p>
                </div>
                
                {/* Resposta */}
                {selectedMessage.status !== 'replied' && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Responder:</h4>
                    <Textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Digite sua resposta..."
                      rows={4}
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
                        onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Abrir Email
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Ações */}
                <div className="flex justify-end space-x-2 pt-4 border-t">
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="text-red-600 hover:text-red-700"
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
                  Selecione uma mensagem da lista para visualizar os detalhes.
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
