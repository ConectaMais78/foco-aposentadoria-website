
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, MessageSquare } from "lucide-react";

const AdminMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  
  useEffect(() => {
    // In a real app, this would fetch messages from a database
    // Here we'll load messages from localStorage if they exist
    const storedMessages = localStorage.getItem('contactMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);
  
  const handleDelete = (id: number) => {
    const updatedMessages = messages.filter(message => message.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-navy/30 rounded-lg border border-white/10 p-4 h-[calc(100vh-240px)] overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-orange" />
          Mensagens Recebidas
        </h3>
        
        {messages.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            Nenhuma mensagem recebida
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 rounded-lg cursor-pointer border transition-all ${
                  selectedMessage && selectedMessage.id === message.id 
                    ? 'bg-navy/80 border-orange' 
                    : 'bg-navy/50 border-white/5 hover:border-white/20'
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-white">{message.name}</h4>
                  <span className="text-xs text-gray-400">{message.date || 'Data não disponível'}</span>
                </div>
                <p className="text-gray-300 text-sm truncate">{message.subject}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-400">{message.email}</span>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost" 
                      size="sm"
                      className="h-7 w-7 p-0 text-gray-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMessage(message);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost" 
                      size="sm"
                      className="h-7 w-7 p-0 text-gray-400 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="lg:col-span-2 bg-navy/30 rounded-lg border border-white/10 p-6 h-[calc(100vh-240px)] overflow-y-auto">
        {selectedMessage ? (
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedMessage.subject}</h3>
                <p className="text-orange">De: {selectedMessage.name} ({selectedMessage.email})</p>
                <p className="text-gray-400">Telefone: {selectedMessage.phone}</p>
                {selectedMessage.date && <p className="text-gray-400">Data: {selectedMessage.date}</p>}
              </div>
              <Button
                variant="ghost" 
                size="sm"
                className="h-9 w-9 p-0 text-gray-400 hover:text-red-500"
                onClick={() => handleDelete(selectedMessage.id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-6 bg-navy/50 rounded-lg border border-white/10">
              <h4 className="font-medium text-white mb-2">Mensagem:</h4>
              <p className="text-gray-300 whitespace-pre-line">{selectedMessage.message}</p>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                className="border-orange text-orange hover:bg-orange/10"
                onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
              >
                Responder por Email
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center">
            <div className="max-w-md">
              <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Nenhuma mensagem selecionada</h3>
              <p className="text-gray-400">
                Selecione uma mensagem da lista para visualizar os detalhes aqui.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
