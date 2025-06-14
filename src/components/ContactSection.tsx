
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Instagram, MessageCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a message object with a unique ID
    const message = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).replace('.', '')
    };
    
    // Get existing messages from localStorage or initialize empty array
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    // Add new message to the array
    const updatedMessages = [message, ...existingMessages];
    
    // Save back to localStorage
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    
    // Show success message
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5583991034305?text=Olá%2C%20tudo%20bem%3F', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/foconaaposentadoria', '_blank');
  };

  return (
    <section id="contato" className="section-padding bg-darkNavy">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Entre em Contato
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange/50 to-orange mx-auto"></div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Estamos prontos para ajudar você a conquistar seus direitos.
            Entre em contato para uma consulta gratuita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="card-gradient p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6">
              Envie uma mensagem
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-gray-200 font-medium">
                    Nome completo
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-navy/50 border-gray-700 focus:border-orange focus:ring-orange text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-gray-200 font-medium">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Seu e-mail"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-navy/50 border-gray-700 focus:border-orange focus:ring-orange text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-gray-200 font-medium">
                  Telefone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-navy/50 border-gray-700 focus:border-orange focus:ring-orange text-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-gray-200 font-medium">
                  Assunto
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Assunto da mensagem"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-navy/50 border-gray-700 focus:border-orange focus:ring-orange text-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-gray-200 font-medium">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  placeholder="Descreva sua situação..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-navy/50 border-gray-700 focus:border-orange focus:ring-orange text-white resize-none"
                />
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-orange to-orangeLight hover:from-orangeLight hover:to-orange text-white font-medium text-lg w-full transition-all duration-300"
                >
                  Enviar mensagem
                </Button>
                
                <Button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-medium text-lg w-full transition-all duration-300 shadow-lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Fale Conosco no WhatsApp
                </Button>

                <Button
                  type="button"
                  onClick={handleInstagramClick}
                  className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 text-white font-medium text-lg w-full transition-all duration-300 shadow-lg"
                >
                  <Instagram className="mr-2 h-5 w-5" />
                  Siga-nos no Instagram
                </Button>
              </div>
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Informações de contato
            </h3>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-orange" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Telefone</h4>
                  <p className="text-gray-300">+55 83 99103-4305</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-orange" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">E-mail</h4>
                  <p className="text-gray-300">foconaaposentadoria@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-orange" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Endereço</h4>
                  <p className="text-gray-300">
                    Avenida Marechal Floriano Peixoto, 1636
                    <br />
                    Santo Antônio, Campina Grande - PB
                    <br />
                    CEP: 58402-000, Brasil
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-orange" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Horário de atendimento</h4>
                  <p className="text-gray-300">
                    Segunda a Quinta: 8:00 às 18:00
                    <br />
                    Sexta-feira: 8:00 às 12:00
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 h-64 md:h-80 bg-navy/30 rounded-lg overflow-hidden border border-white/10">
              <iframe
                title="Mapa do escritório"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.7235982890945!2d-35.88149352595876!3d-7.165034070423729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ac78b275b6e0ad%3A0x1234567890abcdef!2sAv.%20Mal.%20Floriano%20Peixoto%2C%201636%20-%20Santo%20Ant%C3%B4nio%2C%20Campina%20Grande%20-%20PB%2C%2058402-000!5e0!3m2!1spt-BR!2sbr!4v1735004400000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
